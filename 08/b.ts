const text = await Deno.readTextFile("input.txt");
const lines = text.split("\n");

let flag = 0;

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

//#endregion

//#region Calculating

const nextNodeIds = [...nodes.keys()].filter(key => key.endsWith("A"));

const counts = [];

for (const nextNodeId of nextNodeIds) {
    const count = getCount(nodes, nextNodeId);

    if (count) {
        counts.push(count);
    }
}

function getCount(nodes: Map<string, { L: string, R: string }>, nextNodeId: string) {
    let count = 0;

    for (let i = 0; i <= operations.length; i++) {
        if (i === operations.length) {
            i = -1;
            continue;
        }


        if (nextNodeId.endsWith("Z")) return count;

        const operation = operations[i];

        const currentNode = nodes.get(nextNodeId);

        nextNodeId = currentNode![operation];

        count++;
    }
}

function leastCommonMultiple(numbers: number[]) {
    function gcd(a: number, b: number): number {
        return !b ? a : gcd(b, a % b);
    }

    function lcm(a: number, b: number): number {
        return (a * b) / gcd(a, b);
    }

    let multiple = numbers[0];

    numbers.forEach((n) => {
        multiple = lcm(multiple, n);
    });

    return multiple;
}

flag = leastCommonMultiple(counts);

//#endregion

console.log(flag);