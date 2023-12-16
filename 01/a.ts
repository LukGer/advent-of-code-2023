const lines = await Bun.file('input_a.txt').text()

let sum = 0;

for(const line of lines.split('\n')){
    const matches = line.match(/\d/g);

    if(!matches) continue;

    console.log(matches)

    const firstDigit = matches[0];
    const lastDigit = matches[matches.length - 1];

    const correctDigit = Number(firstDigit + lastDigit);

    console.log(firstDigit, lastDigit, correctDigit)

    sum += correctDigit;
}

console.log(sum);
