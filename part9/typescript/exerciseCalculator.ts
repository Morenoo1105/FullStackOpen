interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Values {
  target: number;
  exercises: number[];
}

const parseArguments = (args: string[]): Values => {
  if (args.length < 2) throw new Error("Not enough arguments");
  if (args.length > 12) throw new Error("Too many arguments");

  if (args.slice(2).every((ar) => !isNaN(Number(ar)))) {
    return {
      target: Number(args[2]),
      exercises: args.map((ar) => Number(ar)).slice(3),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateExercises = (target: number, exercises: number[]): Result => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter((e) => e > 0).length;
  const average = exercises.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = average < target ? 1 : average === target ? 2 : 3;
  const ratingDescription =
    rating === 1
      ? "You didn't reach your target!"
      : rating === 2
      ? "You reached your target!"
      : "You exceeded your target!";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, exercises } = parseArguments(process.argv);
  console.log(calculateExercises(target, exercises));
} catch (error) {
  console.log("Error, something bad happened, message: ", error.message);
}

export {};
