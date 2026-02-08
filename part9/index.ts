import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';
import { isNumberArray } from './validation';

const app = express();
const PORT = 3003;

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query as { height?: string, weight?: string };

    if (!height || !weight) {
        res.status(400).json({ error: "Missing parameters height and/or weight" });
        return;
    }

    const parsedHeight = Number(height);
    const parsedWeight = Number(weight);

    if (isNaN(parsedHeight) || isNaN(parsedWeight)) {
        res.status(400).json({ error: "Malformatted parameters - should be number" });
        return;
    }
    if (parsedHeight <= 0 || parsedWeight <= 0) {
        res.status(400).json({ error: "Height and weight must be positive non-zero numbers" });
        return;
    }

    const bmiResult = calculateBmi(parsedHeight, parsedWeight);

    res.send(bmiResult);
});

app.post('/exercises', (req, res) => {
    console.log(req.body);
    const body = req.body as Record<string, unknown>;
    const exercises = body['daily_exercises'];
    if (exercises === undefined) {
        res.status(400).json({ error: "Missing parameter daily_exercises" });
        return;
    }
    if (!isNumberArray(exercises)) {
        res.status(400).json({ error: "Malformatted parameters - daily_exercises should be array of numbers"});
        return;
    }
    if (exercises.length === 0) {
        res.status(400).json({ error: "Invalid parameter daily_exercises - must include at least one day"});
        return;
    }

    const target = body['target'];
    if (target === undefined) {
        res.status(400).json({ error: "Missing parameter target" });
        return;
    }
    const parsedTarget = Number(target);
    if (isNaN(parsedTarget)) {
        res.status(400).json({ error: "Malformatted parameters - target should be a number"});
        return;
    }

    const result = calculateExercise(exercises, parsedTarget);
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});