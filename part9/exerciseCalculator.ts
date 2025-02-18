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

const exercise = [3, 2.3, 2, 4.5, 0, 3, 1];
const target = 1.5;

console.log(calculateExercise(exercise, target));