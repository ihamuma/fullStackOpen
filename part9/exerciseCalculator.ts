interface ExerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercise = (exercise: number[], target: number): ExerciseResult => {
    const periodLength = exercise.length;
    const trainingDays = exercise.filter(day => day > 0).length;
    const average = exercise.reduce((a, b) => a + b, 0) / periodLength;
    const success = average >= target;
    const rating = average < target ? 1 : average === target ? 2 : 3;
    const ratingDescription = rating === 1 ? "You didn't reach your target" : rating === 2 ? "You reached your target" : "You exceeded your target";

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

const process_args = process.argv.slice(2);
if (process_args.length < 2) {
    throw new Error("Usage: npm run calculateExercise <target> <exercise1> <exercise2> ... <exerciseN>");
    process.exit(1);
}

const target = Number(process_args[0]);
const exercise = process_args.slice(1).map(day => {
    const num = Number(day);
    if (isNaN(num)) {
        throw new Error(`Invalid input: ${day} is not a number`);
        process.exit(1);
    }
    return num;
});

try {
    console.log(calculateExercise(exercise, target));
} catch (error) {
    if (error instanceof Error) {
    console.log("Error calculating exercise", error.message);
    } else {    
        console.log("Unknown error calculating exercise");
    }
}