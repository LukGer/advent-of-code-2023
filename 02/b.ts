const lines = await Bun.file('input_a.txt').text();

let sum = 0;

for (const match of lines.matchAll(/Game (\d+): (.+)/gm)) {

    if (!match) continue;

    const id = match[1];

    const rounds = match[2];

    let redCount = 0, greenCount = 0, blueCount = 0;

    for (const round of rounds.matchAll(/(\d+) (\w*)/gm)) {
        if (!round) continue;

        const count = Number(round[1]);
        const color = round[2];

        if (color === 'red' && count > redCount) {
            redCount = count;
        } else if (color === 'green' && count > greenCount) {
            greenCount = count;
        } else if (color === 'blue' && count > blueCount) {
            blueCount = count;
        }
    }

    const power = redCount * greenCount * blueCount;

    sum += power;
}


console.log(sum);
