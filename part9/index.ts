import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();
const PORT = 3003;

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query as { height?: string, weight?: string };

    if (!height || !weight) {
        res.status(400).json({ error: "Missing parameters height and/or weight" });
    }

    const parsedHeight = Number(height);
    const parsedWeight = Number(weight);

    if (isNaN(parsedHeight) || isNaN(parsedWeight)) {
        res.status(400).json({ error: "Malformatted parameters - should be number" });
    }
    if (parsedHeight <= 0 || parsedWeight <= 0) {
        res.status(400).json({ error: "Height and weight must be positive non-zero numbers" });
    }

    const bmiResult = calculateBmi(parsedHeight, parsedWeight);

    res.send(bmiResult);
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});