import { Router } from "express";
import {
  QuoteController,
  CaseController,
  CharacterController,
  HealthController,
} from "../controllers";
import {
  JsonQuoteRepository,
  JsonCaseRepository,
  JsonCharacterRepository,
} from "../repositories";

const router = Router();

// ============================================
// REPOSITORY INSTANCES
// ============================================
const quoteRepository = new JsonQuoteRepository();
const caseRepository = new JsonCaseRepository();
const characterRepository = new JsonCharacterRepository();

// ============================================
// CONTROLLER INSTANCES
// ============================================
const quoteController = new QuoteController(quoteRepository);
const caseController = new CaseController(caseRepository);
const characterController = new CharacterController(characterRepository);
const healthController = new HealthController();

// ============================================
// ROUTES
// ============================================

// Health check
router.get("/health", healthController.getHealth);

// Random quote
router.get("/quotes/random", quoteController.getRandomQuote);

// List cases (optional type filter)
router.get("/cases", caseController.getCases);

// List characters
router.get("/characters", characterController.getCharacters);

// Search quotes
router.get("/search", quoteController.searchQuotes);

export default router;
