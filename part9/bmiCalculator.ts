const calculateBmiRange = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) ** 2)
    const range = getBmiRange(bmi);
    return `BMI: ${bmi} \nRange: ${range}`
}

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
            range = "Obesity";
            break;
        default:
            range = "Unknown";
    }

    return range
}

console.log(calculateBmiRange(180, 74))