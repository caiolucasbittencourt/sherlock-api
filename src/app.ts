import express, { Application } from "express";
import path from "path";
import { v1Routes } from "./routes";
import {
  createRateLimiter,
  errorHandler,
  notFoundHandler,
} from "./middlewares";

export function createApp(): Application {
  const app = express();

  // ============================================
  // GLOBAL MIDDLEWARES
  // ============================================

  // Parse JSON
  app.use(express.json());

  // Parse URL-encoded
  app.use(express.urlencoded({ extended: true }));

  // Rate Limiting (100 requests per minute)
  app.use(
    createRateLimiter({
      windowMs: 60 * 1000,
      maxRequests: 100,
    }),
  );

  // CORS Headers
  app.use((_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    next();
  });

  // Serve static files
  app.use(express.static(path.join(__dirname, "..", "public")));

  // ============================================
  // ROUTES
  // ============================================

  // Landing Page
  app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
  });

  // API info
  app.get("/api", (_req, res) => {
    res.json({
      name: "Sherlock Holmes API",
      version: "1.0.0",
      description:
        "REST API based on the works of Arthur Conan Doyle (Public Domain)",
      endpoints: {
        health: "GET /api/v1/health",
        randomQuote: "GET /api/v1/quotes/random",
        cases: "GET /api/v1/cases",
        characters: "GET /api/v1/characters",
        search: "GET /api/v1/search?q=termo",
      },
    });
  });

  // API v1
  app.use("/api/v1", v1Routes);

  // ============================================
  // ERROR HANDLING
  // ============================================

  // 404 handler
  app.use(notFoundHandler);

  // Global error handler
  app.use(errorHandler);

  return app;
}
