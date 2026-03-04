import { Quote, Case, Character, CaseFilter, SearchResult } from "../models";

/**
 * Base interface for repositories
 * Makes it easy to swap implementations (JSON → Database)
 */
export interface IBaseRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
}

/**
 * Quote repository interface
 */
export interface IQuoteRepository extends IBaseRepository<Quote> {
  findRandom(): Promise<Quote>;
  search(query: string): Promise<SearchResult>;
}

/**
 * Case repository interface
 */
export interface ICaseRepository extends IBaseRepository<Case> {
  findByFilter(filter: CaseFilter): Promise<Case[]>;
}

/**
 * Character repository interface
 */
export interface ICharacterRepository extends IBaseRepository<Character> {}
