const text = await Deno.readTextFile("input.txt");
const lines = text.split("\n");

//#region Parsing

const operations: Array<"L" | "R"> = [];

const nodes = new Map<string, { L: string, R: string }>();

operations.push(...lines[0].split("") as Array<"L" | "R">);

const nodeRegex = /\w{3}/gm;

for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    const matches = line.match(nodeRegex);
    if (matches) {
        nodes.set(matches[0], {
            L: matches[1],
            R: matches[2]
        })
    }
}

let nextNodeId = "AAA";

const count = getCount();

function getCount() {
    let count = 0;

    for (let i = 0; i <= operations.length; i++) {
        if (i === operations.length) {
            i = -1;
            continue;
        }


        if (nextNodeId === "ZZZ") return count;

        const operation = operations[i];

        const currentNode = nodes.get(nextNodeId);

        console.log(count, nextNodeId, currentNode, operation);

        nextNodeId = currentNode![operation];

        count++;
    }
}

//#endregion

//#region Calculating

//#endregion

console.log(count);