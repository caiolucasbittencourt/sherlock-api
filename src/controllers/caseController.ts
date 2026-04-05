import { Request, Response, NextFunction } from "express";
import { CaseFilterSchema, ApiResponse, Case } from "../models";
import { ICaseRepository } from "../repositories";

export class CaseController {
  constructor(private caseRepository: ICaseRepository) {}

  /*
   * GET /api/v1/cases
   * List all cases with optional filters by type
   */
  getCases = async (
    req: Request,
    res: Response<ApiResponse<Case[]>>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validation = CaseFilterSchema.safeParse(req.query);

      if (!validation.success) {
        res.status(400).json({
          success: false,
          data: [],
          meta: {
            timestamp: new Date().toISOString(),
            version: "1.0.0",
          },
        } as ApiResponse<Case[]>);
        return;
      }

      const cases = await this.caseRepository.findByFilter(validation.data);

      res.json({
        success: true,
        data: cases,
        meta: {
          timestamp: new Date().toISOString(),
          version: "1.0.0",
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
