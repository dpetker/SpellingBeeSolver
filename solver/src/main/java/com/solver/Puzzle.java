package com.solver;

import java.util.ArrayList;
import java.util.Set;

/**
 * Puzzle.java - Class encapsulating logic for a single puzzle.
 */
public class Puzzle {
  private char requiredChar;
  private ArrayList<Character> optionalChars;

  public Puzzle(char requiredChar, ArrayList<Character> optionalChars) {
    this.requiredChar = requiredChar;
    this.optionalChars = optionalChars;
  }

  public char getRequiredChar() {
    return this.requiredChar;
  }

  public Set<Character> getUniqueChars() {
    Set<Character> characters = Set.of(this.requiredChar);
    characters.addAll(this.optionalChars);
    return characters;
  }
}
