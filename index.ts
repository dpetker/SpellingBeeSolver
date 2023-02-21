/*
index.ts - Entry point for the solver app.
*/
import { argv } from 'node:process';
import { Puzzle, findMatches } from './server/solver';

console.log('Hello, Solver!');

const puzzle: Puzzle = new Puzzle();

argv.slice(2).forEach(val => {
  if (val.startsWith('-r')) {
    puzzle.requiredChar = val.split('=')[1].toLocaleLowerCase();
  } else if (val.startsWith('-o')) {
    puzzle.optionalChars = val.split('=')[1].toLocaleLowerCase().split('');
  } else {
    console.log(`Unrecognized option: ${val}`);
  }
});

console.log(`Attempting to solve the following Puzzle: ${puzzle}`);
findMatches(puzzle).then(results => results.forEach(match => console.log(match)));
