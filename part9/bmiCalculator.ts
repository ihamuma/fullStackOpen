interface BmiResult {
    height: number,
    weight: number,
    bmi: number,
    range: string,
}

export const calculateBmi = (height: number, weight: number): BmiResult => {
    const bmi = weight / ((height / 100) ** 2);
    const range = getBmiRange(bmi);
    const roundedBmi = bmi.toFixed(2);
    return {
        height,
        weight,
        bmi: Number(roundedBmi),
        range
    };
};

const getBmiRange = (bmi: number): string => {
    switch (true) {
        case bmi < 18.5:
            return "Underweight";
        case bmi >= 18.5 && bmi < 25:
            return "Normal";
        case bmi >= 25 && bmi < 30:
            return "Overweight";
        case bmi >= 30:
            return "Obese";
        default:
            return "Unknown";
    }
};

if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.length !== 2) {
        console.error("Usage: npm run calculateBmi <height> <weight>");
        process.exit(1);
    }

    const height = Number(args[0]);
    const weight = Number(args[1]);

    if (isNaN(height) || isNaN(weight)) {
        console.error("Invalid arguments");
        process.exit(1);
    }

    if (height <= 0 || weight <= 0) {
        console.error("Height and weight must be positive non-zero numbers");
        process.exit(1);
    }

    try {
        console.log(calculateBmi(height, weight));
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error calculating BMI", error.message);
            process.exit(1);
        } else {
            console.error("Unknown error calculating BMI");
            process.exit(1);
        }
    }
}