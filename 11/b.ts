const text = await Deno.readTextFile("input.txt");
const lines = text.split("\n");

let flag = 0;

//#region Expanding the universe

const galaxies: { id: number, x: number, y: number }[] = [];

for (let y = 0; y < lines.length; y++) {
    const line = lines[y];

    for (let x = 0; x < line.length; x++) {
        const char = line[x];

        if (char === '#') {
            galaxies.push({ id: galaxies.length, x, y });
        }
    }
}

//#endregion

//#region Calculating

for (let i = 0; i < galaxies.length; i++) {
    const galaxy = galaxies[i];

    for (let j = i + 1; j < galaxies.length; j++) {
        const otherGalaxy = galaxies[j];

        if (galaxy.id === otherGalaxy.id) {
            continue;
        }

        let deltaX = 0;

        for (let k = Math.min(galaxy.x, otherGalaxy.x); k < Math.max(galaxy.x, otherGalaxy.x); k++) {
            let hasOnlyDots = true;

            for (let l = 0; l < lines.length - 1; l++) {
                if (lines[l][k] !== '.') {
                    hasOnlyDots = false;
                    break;
                }
            }

            if (hasOnlyDots) {
                deltaX += 1_000_000;
            }
            else {
                deltaX++;
            }
        }

        let deltaY = 0;

        for (let k = Math.min(galaxy.y, otherGalaxy.y); k < Math.max(galaxy.y, otherGalaxy.y); k++) {
            let hasOnlyDots = true;

            for (let l = 0; l < lines.length - 1; l++) {
                if (lines[k][l] !== '.') {
                    hasOnlyDots = false;
                    break;
                }
            }

            if (hasOnlyDots) {
                deltaY += 1_000_000;
            }
            else {
                deltaY++;
            }
        }


        const distance = deltaX + deltaY;

        flag += distance;
    }
}


//#endregion

console.log(flag);