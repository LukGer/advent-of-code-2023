const text = await Deno.readTextFile("input_b.txt");
const lines = text.split("\n");

let flag = 0;

//#region Calculating

const found: boolean[][] = [];

for (let y = 0; y < lines.length; y++) {
    if ([...lines[y]].every((x, _, arr) => x === arr[0])) continue;

    let wasNeighorInside = false;

    for (let x = 0; x < lines[y].length; x++) {
        const char = lines[y][x];

        if (char !== ".") {
            wasNeighorInside = false;
            continue;
        };

        if (wasNeighorInside && char === ".") continue;


        let pipeCrossesBefore_X = 0;
        let pipeCrossesAfter_X = 0;

        for (let i = 0; i < lines[y].length; i++) {
            if (i === x) continue;

            const char = lines[y][i];

            let passingCurve = undefined;

            if (i < x) {
                if (char == "|") {
                    pipeCrossesBefore_X++;
                } else if (passingCurve === undefined && (char === "F" || char === "L")) {
                    passingCurve = char;
                } else if (char === "-") {
                    continue;
                } else if (passingCurve && char === (passingCurve === "F" ? "J" : "7")) {
                    pipeCrossesBefore_X++;
                    passingCurve = undefined;
                }
            } else {
                if (char == "|") {
                    pipeCrossesAfter_X++;
                } else if (passingCurve === undefined && (char === "F" || char === "L")) {
                    passingCurve = char;
                } else if (passingCurve && char === "-") {
                    continue;
                } else if (passingCurve && (char === (passingCurve === "F" ? "J" : "7"))) {
                    pipeCrossesAfter_X++;
                    passingCurve = undefined;
                }
            }
        }

        if (pipeCrossesBefore_X === 0 || pipeCrossesBefore_X % 2 === 0 || pipeCrossesAfter_X === 0 || pipeCrossesAfter_X % 2 === 0) {
            continue;
        }

        let pipesBeforeInY = 0;
        let pipesAfterInY = 0;

        for (let i = 0; i < lines.length; i++) {
            if (i === y) continue;

            const char = lines[i][x];
            let passingCurve = undefined;

            if (i < y) {
                if (char == "|") {
                    pipesBeforeInY++;
                } else if (passingCurve === undefined && (char === "F" || char === "7")) {
                    passingCurve = char;
                } else if (passingCurve && char === "-") {
                    continue;
                } else if (passingCurve && char === (passingCurve === "F" ? "J" : "L")) {
                    pipesBeforeInY++;
                    passingCurve = undefined;
                }
            } else {
                if (char == "|") {
                    pipesAfterInY++;
                } else if (passingCurve === undefined && (char === "F" || char === "7")) {
                    passingCurve = char;
                } else if (passingCurve && char === "-") {
                    continue;
                } else if (passingCurve && (char === (passingCurve === "F" ? "J" : "L"))) {
                    pipesAfterInY++;
                    passingCurve = undefined;
                }
            }
        }

        if (pipesBeforeInY > 0 && pipesBeforeInY % 2 !== 0 && pipesAfterInY > 0 && pipesAfterInY % 2 !== 0) {
            found:
            flag++;
            found[y] ??= [];
            found[y][x] = true;
            wasNeighorInside = true;
        } else {
            wasNeighorInside = false;
        }
    }
}

let debugFile = "";

for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
        if (lines[y][x] !== ".") {
            debugFile += lines[y][x];
        } else if (found[y]?.[x]) {
            debugFile += "X";
        } else {
            debugFile += "O";
        }
    }

    debugFile += "\n";
}

await Deno.writeTextFile("debug.txt", debugFile);

//#endregion

console.log(flag);