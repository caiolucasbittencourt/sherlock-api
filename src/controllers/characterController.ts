import { Request, Response, NextFunction } from "express";
import { ApiResponse, Character } from "../models";
import { ICharacterRepository } from "../repositories";

export class CharacterController {
  constructor(private characterRepository: ICharacterRepository) {}

  /*
   * GET /api/v1/characters
   * List all characters
   */
  getCharacters = async (
    _req: Request,
    res: Response<ApiResponse<Character[]>>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const characters = await this.characterRepository.findAll();

      res.json({
        success: true,
        data: characters,
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
