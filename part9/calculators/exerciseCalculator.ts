interface Values {
    hoursLog: number[];
    targetDailyHours: number;
}

const parseValues = (args: Array<string>): Values => {
    if (args.length < 4) throw new Error('Not enough arguments');

    if (!isNaN(Number(args[3]))) {
        const hoursLogArgs = args.slice(2, args.length -1).map((ar) => Number(ar));

        if (hoursLogArgs.some(isNaN)) {
            throw new Error('Hours Log arguments are not numbers!');
        }

        return {
            hoursLog: hoursLogArgs,
            targetDailyHours: Number(args[args.length -1])
        };
    } else {
        throw new Error('Daily Hours argument is not a number!');
    }
};

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number 
}

export function calculateExercises (hoursLog: number[], targetDailyHours: number): Result {
    const periodLength = hoursLog.length;
    const trainingDays = hoursLog.filter(day => day > 0).length;
    const target = targetDailyHours;
    const average = hoursLog.reduce((a, b) => a + b) / hoursLog.length;

    let rating = 3;
    let ratingDescription = '';
    let success = true;

    if (average >= target) {
        ratingDescription = 'Smashed it!';
    } else if (average  >=  target - (target * 0.25) ) {
        rating = 2;
        ratingDescription = 'Not too bad but could be better.';
        success = false;
    } else {
        rating = 1;
        ratingDescription = 'Far from the target, still a way to go.';
        success = false;
    }

    return {
       periodLength,
       trainingDays,
       success,
       rating,
       ratingDescription,
       target,
       average
    };
}

try {
    const { hoursLog, targetDailyHours } = parseValues(process.argv);
    console.log(calculateExercises(hoursLog, targetDailyHours));
  } catch (error) {
    if (error instanceof Error) {
        console.log(`Error, something bad happened, message: ${error.message}`);
    }
  }