const text = await Deno.readTextFile("input_a.txt");
const lines = text.split("\n");

let sum = 0;

for (const line of lines) {
    const numbersString = line.substring(line.indexOf(":") + 1, line.length);

    const winningNumbers: number[] = [];
    const picks = [];

    let pipeSeen = false;

    for (const number of numbersString.split(" ")) {
        if (number === "") continue;

        if (number === "|") {
            pipeSeen = true;
            continue;
        }

        if (!pipeSeen) {
            winningNumbers.push(parseInt(number));
        } else {
            picks.push(parseInt(number));
        }
    }


    const countOfMatches = picks.filter((x) => winningNumbers.includes(x)).length;

    const points = countOfMatches === 0 ? 0 : 2 ** (countOfMatches - 1);

    console.log(winningNumbers, picks, points);

    sum += points;
}

console.log(sum);