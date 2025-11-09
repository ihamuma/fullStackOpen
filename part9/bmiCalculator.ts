interface BmiResult {
    height: number;
    weight: number;
    bmi: number;
    range: string;
}

export const calculateBmi = (height: number, weight: number): BmiResult => {
    const bmi = weight / ((height / 100) ** 2);
    const range = getBmiRange(bmi);
    const rounded_bmi = bmi.toFixed(2);
    return {
        height,
        weight,
        bmi: Number(rounded_bmi),
        range
    };
};

const getBmiRange = (bmi: number): string => {
    let range: string;

    switch (true) {
        case bmi < 18.5:
            range = "Underweight";
            break;
        case bmi >= 18.5 && bmi < 24.9:
            range = "Normal";
            break;
        case bmi >= 25 && bmi < 29.9:
            range = "Overweight";
            break;
        case bmi >= 30:
            range = "Obese";
            break;
        default:
            range = "Unknown";
    }

    return range;
};

if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.length !== 2) {
        throw new Error("Usage: npm run calculateBmi <height> <weight>");
        process.exit(1);
    }

    const height = Number(args[0]);
    const weight = Number(args[1]);

    if (isNaN(height) || isNaN(weight)) {
        throw new Error("Invalid arguments");
        process.exit(1);
    }

    if (height <= 0 || weight <= 0) {
        throw new Error("Height and weight must be positive non-zero numbers");
        process.exit(1);
    }

    try {
        console.log(calculateBmi(height, weight));
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error calculating BMI", error.message);
        } else {
            console.log("Unknown error calculating BMI");
        }
    }
}