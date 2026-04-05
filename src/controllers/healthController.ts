import { Request, Response } from "express";
import { HealthResponse } from "../models";

const startTime = Date.now();

export class HealthController {
  /*
   * GET /api/v1/health
   * API health monitoring endpoint
   */
  getHealth = (_req: Request, res: Response<HealthResponse>): void => {
    const uptime = Math.floor((Date.now() - startTime) / 1000);

    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      uptime,
    });
  };
}
