/*
solver.ts - Module containing functions for solving puzzles.
*/
import { createReadStream, ReadStream } from "node:fs";
import { createInterface, Interface } from "node:readline";

/*
Contents of the file-based dictionary.
*/
const dictFileStream: ReadStream = createReadStream('./dict/words.txt');
const rl: Interface = createInterface({ input: dictFileStream });
const fileDictContents: string[] = [];

/**
 * Puzzle - class encapsulating logic for a single puzzle.
 */
export class Puzzle {
  requiredChar: string = '';
  optionalChars: string[] = [];
  _uniqueChars: Set<string> = new Set();

  public toString(): string {
    return `Required: ${this.requiredChar} || Optional: ${this.optionalChars}`;
  }

  get uniqueChars(): Set<string> {
    if (this._uniqueChars.size === 0) {
      this._uniqueChars.add(this.requiredChar);
      this.optionalChars.forEach(char => this._uniqueChars.add(char));
    }
    return this._uniqueChars;
  }
}

/**
 * `findMatches` - Given the required "middle" character and the other optional
 * characters, finds potential word matches.
 *
 * @param puzzle - a `Puzzle` object that this function will try to solve
 * @returns - returns a list of potential word matches
 */
export async function findMatches(puzzle: Puzzle): Promise<string[]> {
  return findMatchesFromFileDictionary(puzzle);
}

/**
 * findMatchesFromFileDictionary - Uses the file-based dictionary to look for
 * potential matches.
 *
 * @param puzzle - a `Puzzle` object that this function will try to solve
 * @returns - returns a list of potential word matches
 */
async function findMatchesFromFileDictionary(puzzle: Puzzle): Promise<string[]> {
  if (fileDictContents.length === 0) {
    // load the dictionary if we haven't already.
    for await (const line of rl) {
      // Rules of the game stipulate only entries of 4 or more letters "count".
      if (line.length > 3) {
        fileDictContents.push(line.toLocaleLowerCase());
      }
    }
    console.log(`Loaded dictionary with ${fileDictContents.length} entries.`);
  }

  const filteredResults: string[] = fileDictContents.filter(word => {
    return word.includes(puzzle.requiredChar);
  });

  console.log(`${filteredResults.length} entries contain '${puzzle.requiredChar}'`);

  return filteredResults.filter(word => {
    for (const char of word) {
      if (!puzzle.uniqueChars.has(char)) {
        return false;
      }
    }

    return true;
  });
}
