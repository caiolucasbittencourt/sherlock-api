import { Request, Response, NextFunction } from "express";
import { SearchQuerySchema, ApiResponse, Quote, SearchResult } from "../models";
import { IQuoteRepository } from "../repositories";

export class QuoteController {
  constructor(private quoteRepository: IQuoteRepository) {}

  /*
   * GET /api/v1/quotes/random
   * Returns a random quote
   */
  getRandomQuote = async (
    _req: Request,
    res: Response<ApiResponse<Quote>>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const quote = await this.quoteRepository.findRandom();

      res.json({
        success: true,
        data: quote,
        meta: {
          timestamp: new Date().toISOString(),
          version: "1.0.0",
        },
      });
    } catch (error) {
      next(error);
    }
  };

  /*
   * GET /api/v1/search?q=term
   * Search by keywords in all quotes
   */
  searchQuotes = async (
    req: Request,
    res: Response<ApiResponse<SearchResult>>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validation = SearchQuerySchema.safeParse(req.query);

      if (!validation.success) {
        res.status(400).json({
          success: false,
          data: {
            quotes: [],
            totalResults: 0,
            query: "",
          },
          meta: {
            timestamp: new Date().toISOString(),
            version: "1.0.0",
          },
        } as ApiResponse<SearchResult>);
        return;
      }

      const result = await this.quoteRepository.search(validation.data.q);

      res.json({
        success: true,
        data: result,
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
