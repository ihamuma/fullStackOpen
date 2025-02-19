import express from 'express';
import { calculateBmiRange } from './bmiCalculator';

const app = express();
const PORT = 3003;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  res.send(calculateBmiRange(height, weight));
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});