/**
 * api.ts - Entrypoint for the express-based REST API.
 */

import express from 'express';

console.log('Starting API...');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Solver!');
});

app.get('/solve', (req, res) => {
  res.send(`Required: ${req.query.req} | Optional: ${req.query.opt}`);
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
