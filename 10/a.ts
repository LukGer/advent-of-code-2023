const text = await Deno.readTextFile("input.txt");
const lines = text.split("\n");

let flag = 1;

//#region Calculating
type Direction = "up" | "down" | "left" | "right";

let currentY = 83, currentX = 25;
let currentChar = "S";
let currentEntryDirection: Direction = "left";

console.log(lines[currentY][currentX]);

do {
    const currentExitDirection = getExitDirection(currentEntryDirection, currentChar);

    console.log(currentEntryDirection, " -> ", `${currentChar} (${currentX}, ${currentY})`, " -> ", currentExitDirection);

    if (!currentExitDirection) throw new Error("Invalid exit direction");

    switch (currentExitDirection) {
        case "up":
            currentY--;
            break;
        case "down":
            currentY++;
            break;
        case "left":
            currentX--;
            break;
        case "right":
            currentX++;
            break;
    }

    currentChar = lines[currentY][currentX];

    currentEntryDirection = switchDirection(currentExitDirection);

    flag++;
} while (currentChar !== "S")

function getExitDirection(currentEntryDirection: Direction, currentChar: string) {
    switch (currentChar) {
        case "S": return "down";
        case "|":
            return currentEntryDirection === "up" ? "down" : "up";
        case "-":
            return currentEntryDirection === "left" ? "right" : "left";
        case "L":
            return currentEntryDirection === "right" ? "up" : "right";
        case "J":
            return currentEntryDirection === "left" ? "up" : "left";
        case "7":
            return currentEntryDirection === "left" ? "down" : "left";
        case "F":
            return currentEntryDirection === "right" ? "down" : "right";
    }
}

function switchDirection(direction: Direction) {
    switch (direction) {
        case "up":
            return "down";
        case "down":
            return "up";
        case "left":
            return "right";
        case "right":
            return "left";
    }
}

//#endregion

console.log(flag, flag / 2);