import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);

  res.json({ weight, height, bmi });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { exercises, target } = req.body;

  if (!exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
  }

  if (isNaN(Number(target))) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  // eslint-disable-next-line
  if (!Array.isArray(exercises) || exercises.some((e) => isNaN(Number(e)))) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  // eslint-disable-next-line
  const exercisesArray = exercises.map((e: number) => Number(e));

  // eslint-disable-next-line 
  const result = calculateExercises(target, exercisesArray);

  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
