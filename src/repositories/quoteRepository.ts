import { Quote, SearchResult } from "../models";
import { IQuoteRepository } from "./interfaces";
import data from "../data/data.json";

export class JsonQuoteRepository implements IQuoteRepository {
  private quotes: Quote[];

  constructor() {
    this.quotes = data.quotes as Quote[];
  }

  async findAll(): Promise<Quote[]> {
    return this.quotes;
  }

  async findById(id: string): Promise<Quote | null> {
    return this.quotes.find((quote) => quote.id === id) ?? null;
  }

  async findRandom(): Promise<Quote> {
    const randomIndex = Math.floor(Math.random() * this.quotes.length);
    const quote = this.quotes[randomIndex];
    if (!quote) {
      throw new Error("No quotes available");
    }
    return quote;
  }

  async search(query: string): Promise<SearchResult> {
    const normalizedQuery = query.toLowerCase().trim();

    const matchingQuotes = this.quotes.filter(
      (quote) =>
        quote.text.toLowerCase().includes(normalizedQuery) ||
        quote.character.toLowerCase().includes(normalizedQuery) ||
        quote.book.toLowerCase().includes(normalizedQuery),
    );

    return {
      quotes: matchingQuotes,
      totalResults: matchingQuotes.length,
      query,
    };
  }
}
