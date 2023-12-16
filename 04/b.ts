const text = await Deno.readTextFile("input_a.txt");
const lines = text.split("\n");

let countOfGames = 0;

for (let i = 0; i < lines.length; i++) {
    validateGame(lines, i);
}

function validateGame(lines: string[], index: number) {
    const countOfMatches = getCountOfMatches(lines[index]);

    countOfGames++;

    for (let y = 0; y < countOfMatches; y++) {
        validateGame(lines, index + 1 + y)
    }

}

console.log(countOfGames);

function getCountOfMatches(line: string) {
    const game = line.substring(line.indexOf(":") + 1, line.length);

    const winningNumbers: number[] = [];
    const picks = [];

    let pipeSeen = false;

    for (const number of game.split(" ")) {
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

    return picks.filter((x) => winningNumbers.includes(x)).length;
}
