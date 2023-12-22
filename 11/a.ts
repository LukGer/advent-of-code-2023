const text = await Deno.readTextFile("input.txt");
const lines = text.split("\n");

let flag = 0;

let verticalExpansion = "";

//#region Expanding the universe

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if ([...line].every((i) => i === ".")) {
        verticalExpansion += line + "\n";
    }

    verticalExpansion += line + "\n";
}

let verticalExpansionLines = verticalExpansion.split("\n")
let numColumns = verticalExpansionLines[0].length;

for (let columnIndex = 0; columnIndex < numColumns; columnIndex++) {
    verticalExpansionLines = verticalExpansionLines.filter(Boolean);

    if (verticalExpansionLines.every(line => line[columnIndex] === '.')) {
        for (let lineIndex = 0; lineIndex < verticalExpansionLines.length; lineIndex++) {
            const line = verticalExpansionLines[lineIndex];
            verticalExpansionLines[lineIndex] = line.slice(0, columnIndex + 1) + '.' + line.slice(columnIndex + 1);
        }
        columnIndex++; // Increment columnIndex to skip the newly added column
        numColumns++; // Increment numColumns as the total number of columns has increased
    }
}

const expanedUniverse = verticalExpansionLines.join("\n");
const expandedUniverseLines = expanedUniverse.split("\n");

const galaxies: { id: number, x: number, y: number }[] = [];

for (let y = 0; y < expandedUniverseLines.length; y++) {
    const line = expandedUniverseLines[y];

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

        const distance = Math.abs(galaxy.x - otherGalaxy.x) + Math.abs(galaxy.y - otherGalaxy.y);

        flag += distance;
    }
}


//#endregion

console.log(flag);