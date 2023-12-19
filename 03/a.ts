const text = await Deno.readTextFile('input_a.txt');
const lines = text.split('\n');

let sum = 0;

for (let y = 0; y < lines.length; y++) {
    const line = lines[y];

    let digit = "";

    for (let x = 0; x < line.length; x++) {
        const char = line[x];

        if (isDigit(char)) {
            digit += char;
        } else {
            if (digit !== "") {
                for (let x_offset = -1 * digit.length; x_offset <= 1; x_offset++) {
                    for (const y_offset of [-1, 0, 1]) {
                        const newX = x + x_offset;
                        const newY = y + y_offset;

                        if (newX < 0 || newX >= lines.length || newY < 0 || newY >= line.length) {
                            continue;
                        }

                        const neighbour = lines[newY]?.[newX];

                        console.log("Checking neighbors of ", digit, " at ", newX + 1, newY + 1, " -> ", neighbour, x_offset, y_offset, x, y)

                        if (isSymbol(neighbour)) {
                            console.log("Found symbol ", neighbour, " at ", newX, newY);
                            sum += parseInt(digit);

                            x_offset = digit.length;
                            break;
                        }
                    }
                }
            }

            digit = "";

        }
    }
}

console.log(sum);

function isSymbol(char: string): boolean {
    return char !== "." && !isDigit(char);
}

function isDigit(char: string): boolean {
    return char === "0" || char === "1" || char === "2" || char === "3" || char === "4" || char === "5" || char === "6" || char === "7" || char === "8" || char === "9";
}

console.log(sum);
