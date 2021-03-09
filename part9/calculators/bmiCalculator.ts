interface MultiplyValues {
    height: number;
    weight: number;
  }

const parseArguments = (args: Array<string>): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export function calculateBmi(height: number, weight: number) {
    const bmi = weight / (height / 100 * height / 100);
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi <= 24.9) {
        return "Normal (healthy weight)";
    } else if (bmi <= 29.9) {
        return "Overweight";
    } else {
        return "Obese";
    }
}

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error) {
    if (error instanceof Error) {
        console.log(`Error, something bad happened, message: ${error.message}`);
    }
  }