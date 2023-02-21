package com.solver;

/**
 * App.java - Entry point for the solver app.
 *
 */
public class App {
  public static void main(String[] args) {
    if (args.length < 2) {
      System.out.println("The Solver app requires an -r and -o option.");
      System.exit(1);
    }

    for (String arg : args) {
      if (arg.startsWith("-r")) {

      } else if (arg.startsWith("-o")) {

      } else {
        System.out.println(String.format("Unrecognized argument: %s", arg));
      }
    }
  }
}
