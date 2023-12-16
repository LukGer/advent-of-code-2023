const text = await Deno.readTextFile("input_b.txt");
const lines = text.split("\n");

let flag = 0;

const races: { duration: number, currentRecord: number }[] = [];

//#region Parsing

const durations = lines[0].substring(lines[0].indexOf(":") + 1, lines[0].length).split(" ").filter((x) => x !== "").map((x) => parseInt(x));
const currentRecords = lines[1].substring(lines[1].indexOf(":") + 1, lines[1].length).split(" ").filter((x) => x !== "").map((x) => parseInt(x));

races.push(...durations.map((duration, index) => {
    return {
        duration,
        currentRecord: currentRecords[index]
    }
}));

//#endregion

//#region Calculating

for (const race of races) {
    let countOfWins = 0;

    console.log(race);

    for (let i = 1; i < race.duration; i++) {
        const length = (race.duration - i) * i;

        if (length > race.currentRecord) {
            countOfWins++;
        }
    }

    flag = countOfWins;
}

//#endregion

console.log(flag);