import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ApiError } from "../models";

/*
 * Global error handler middleware
 */
export function errorHandler(
  error: Error,
  _req: Request,
  res: Response<ApiError>,
  _next: NextFunction,
): void {
  console.error("[Error]", error);

  // Zod validation errors
  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid request data",
        details: error.errors,
      },
    });
    return;
  }

  // Generic error
  res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
    },
  });
}

/**
 * Middleware para rotas não encontradas
 */
export function notFoundHandler(req: Request, res: Response<ApiError>): void {
  res.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: `Route ${req.method} ${req.path} not found`,
    },
  });
}
