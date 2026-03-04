import { Case, CaseFilter } from "../models";
import { ICaseRepository } from "./interfaces";
import data from "../data/data.json";

/**
 * Case repository implementation using JSON file
 * To switch to a database, create a new class implementing ICaseRepository
 */
export class JsonCaseRepository implements ICaseRepository {
  private cases: Case[];

  constructor() {
    this.cases = data.cases as Case[];
  }

  async findAll(): Promise<Case[]> {
    return this.cases;
  }

  async findById(id: string): Promise<Case | null> {
    return this.cases.find((c) => c.id === id) ?? null;
  }

  async findByFilter(filter: CaseFilter): Promise<Case[]> {
    if (!filter.type) {
      return this.cases;
    }

    return this.cases.filter((c) => c.type === filter.type);
  }
}
