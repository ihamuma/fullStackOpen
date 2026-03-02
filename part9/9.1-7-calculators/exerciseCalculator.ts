interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercise = (exercises: number[], target: number): ExerciseResult => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter((day) => day > 0).length;
  const average = exercises.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = average < target ? 1 : average === target ? 2 : 3;
  const ratingDescription =
    rating === 1
      ? "You didn't reach your target"
      : rating === 2
        ? "You reached your target"
        : "You exceeded your target";
  const roundedAverage = average.toFixed(2);
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average: Number(roundedAverage),
  };
};

if (require.main === module) {
  const process_args = process.argv.slice(2);
  if (process_args.length < 2) {
    console.error(
      "Usage: npm run calculateExercise <target> <exercise1> <exercise2> ... <exerciseN>",
    );
    process.exit(1);
  }

  const target = Number(process_args[0]);
  const exercise = process_args.slice(1).map((day) => {
    const num = Number(day);
    if (isNaN(num)) {
      console.error(`Invalid input: ${day} is not a number`);
      process.exit(1);
    }
    return num;
  });

  try {
    console.log(calculateExercise(exercise, target));
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error calculating exercise", error.message);
      process.exit(1);
    } else {
      console.error("Unknown error calculating exercise");
      process.exit(1);
    }
  }
}
