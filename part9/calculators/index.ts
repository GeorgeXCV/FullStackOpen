import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

    if (!req.query.height) {
        return res.status(400).send({
            error: 'Height query required.'
        });
    }

    if (!req.query.weight) {
        return res.status(400).send({
            error: 'Weight query required.'
        });
    }

    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        return res.status(400).send({
            error: 'malformatted parameters'
        });
    }

    return res.json({
        weight: weight,
        height: height,
        bmi: calculateBmi(height, weight)
    });
});

app.post('/exercises', (req, res) => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */

    const request = req.body;

    if (!request.daily_exercises || !request.target) {
        return res.status(400).send({
            error: 'parameters missing'
        });
    }

    const targetDailyHours = Number(request.target);
    const hoursLog =  request.daily_exercises;
    if (isNaN(targetDailyHours) || hoursLog.some(isNaN)) {
        return res.status(400).send({
            error: 'malformatted parameters'
        });
    }
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
    return res.json(calculateExercises(hoursLog, targetDailyHours));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});