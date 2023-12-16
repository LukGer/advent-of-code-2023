// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green

const lines = await Bun.file('input_a.txt').text();

let sum = 0;

for (const match of lines.matchAll(/Game (\d+): (.+)/gm)) {

    if (!match) continue;

    const id = match[1];

    const rounds = match[2];

    let gameValid = true;

    console.log("Checking game ", id);

    for (const round of rounds.matchAll(/(\d+) (\w*)/gm)) {
        if (!round) continue;

        const count = Number(round[1]);
        const color = round[2];

        if (color === 'red' && count > 12) {
            gameValid = false;
            console.log("Game invalid because of red", count);
            break;
        } else if (color === 'green' && count > 13) {
            gameValid = false;
            console.log("Game invalid because of green", count);
            break;
        } else if (color === 'blue' && count > 14) {
            gameValid = false;
            console.log("Game invalid because of blue", count);
            break;
        }
    }


    if (gameValid) {
        console.log("Game valid!")
        sum += Number(id);
    }
}


console.log(sum);
