import { Character } from "../models";
import { ICharacterRepository } from "./interfaces";
import data from "../data/data.json";

export class JsonCharacterRepository implements ICharacterRepository {
  private characters: Character[];

  constructor() {
    this.characters = data.characters as Character[];
  }

  async findAll(): Promise<Character[]> {
    return this.characters;
  }

  async findById(id: string): Promise<Character | null> {
    return this.characters.find((character) => character.id === id) ?? null;
  }
}
