/**
 * api.ts - Entrypoint for the express-based REST API.
 */

import express from 'express';
import { findMatches, Puzzle } from './solver';

console.log('Starting API...');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Solver!');
});

app.get('/solve', (req, res) => {
  const puzz = new Puzzle();

  if (!req.query.req) {
    res.status(400).send('Missing "req" query string parameter.');
    return;
  } else {
    puzz.requiredChar = req.query.req.toString().toLocaleLowerCase();
  }

  if (!req.query.opt) {
    res.status(400).send('Missing "opt" query string parameter.');
    return;
  } else {
    puzz.optionalChars = req.query.opt.toString().toLocaleLowerCase().split('');
  }

  console.log(`Finding results for puzzle: ${puzz}`);
  findMatches(puzz).then(matches => {
    console.log(`Found matches: ${matches}`);
    res.send(matches);
  });
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
