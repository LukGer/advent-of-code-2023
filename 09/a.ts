const text = await Deno.readTextFile("input.txt");
const lines = text.split("\n");

let flag = 0;

//#region Parsing & Calculation

for (const line of lines) {
    const numbers = line.split(" ").map(Number);

    const nextNumber = numbers[numbers.length - 1] + getNextNumber(numbers);

    flag += nextNumber;
}

function getNextNumber(numbers: number[]): number {

    if (numbers.every((n) => n === 0)) {
        return 0;
    }

    const newNumbers = [];

    for (let i = 0; i < numbers.length - 1; i++) {
        const newN = numbers[i + 1] - numbers[i];

        newNumbers.push(newN);
    }

    return newNumbers[newNumbers.length - 1] + getNextNumber(newNumbers);
}

//#endregion

console.log(flag);