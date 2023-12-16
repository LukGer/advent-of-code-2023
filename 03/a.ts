const text = await Deno.readTextFile('input_a.txt');
const lines = text.split('\n');

let sum = 0;
let match;

const regexp = /([^\d.\n])/gm;

const len = lines[0].length;

while ((match = regexp.exec(text)) != null) {

    const index = match.index;
    const symbol = match[1];

    const found_x = index % len;
    const found_y = Math.floor(index / len);


}

console.log(sum);
