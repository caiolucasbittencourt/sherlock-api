import { Request, Response, NextFunction } from "express";

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
}

export function createRateLimiter(options: RateLimitOptions) {
  const { windowMs, maxRequests } = options;
  const store: RateLimitStore = {};

  setInterval(() => {
    const now = Date.now();
    for (const key of Object.keys(store)) {
      const entry = store[key];
      if (entry && entry.resetTime < now) {
        delete store[key];
      }
    }
  }, windowMs);

  return (req: Request, res: Response, next: NextFunction): void => {
    const key = req.ip ?? req.socket.remoteAddress ?? "unknown";
    const now = Date.now();

    let entry = store[key];

    if (!entry || entry.resetTime < now) {
      entry = {
        count: 1,
        resetTime: now + windowMs,
      };
      store[key] = entry;
    } else {
      entry.count++;
    }

    // Headers de rate limit
    res.setHeader("X-RateLimit-Limit", maxRequests);
    res.setHeader(
      "X-RateLimit-Remaining",
      Math.max(0, maxRequests - entry.count),
    );
    res.setHeader("X-RateLimit-Reset", entry.resetTime);

    // Check if limit exceeded
    if (entry.count > maxRequests) {
      res.status(429).json({
        success: false,
        error: {
          code: "RATE_LIMIT_EXCEEDED",
          message: "Too many requests. Please try again later.",
          retryAfter: Math.ceil((entry.resetTime - now) / 1000),
        },
      });
      return;
    }

    next();
  };
}
