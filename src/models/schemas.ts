import { z } from "zod";

// ============================================
// QUOTE SCHEMAS
// ============================================

export const QuoteSchema = z.object({
  id: z.string(),
  text: z.string(),
  character: z.string(),
  book: z.string(),
  year: z.number().int().min(1887).max(1927),
});

export type Quote = z.infer<typeof QuoteSchema>;

// ============================================
// CASE SCHEMAS
// ============================================

export const CaseTypeSchema = z.enum(["Novel", "Short Story"]);

export type CaseType = z.infer<typeof CaseTypeSchema>;

export const CaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: CaseTypeSchema,
  year: z.number().int().min(1887).max(1927),
  description: z.string(),
});

export type Case = z.infer<typeof CaseSchema>;

export const CaseFilterSchema = z.object({
  type: CaseTypeSchema.optional(),
});

export type CaseFilter = z.infer<typeof CaseFilterSchema>;

// ============================================
// CHARACTER SCHEMAS
// ============================================

export const CharacterSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  description: z.string(),
});

export type Character = z.infer<typeof CharacterSchema>;

// ============================================
// SEARCH SCHEMAS
// ============================================

export const SearchQuerySchema = z.object({
  q: z.string().min(1, "Search query is required"),
});

export type SearchQuery = z.infer<typeof SearchQuerySchema>;

export interface SearchResult {
  quotes: Quote[];
  totalResults: number;
  query: string;
}

// ============================================
// API RESPONSE SCHEMAS
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    timestamp: string;
    version: string;
  };
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface HealthResponse {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  version: string;
  uptime: number;
}

// ============================================
// PAGINATION SCHEMAS
// ============================================

export const PaginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type Pagination = z.infer<typeof PaginationSchema>;

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
