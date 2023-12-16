const lines = await Bun.file('input_b.txt').text()

let sum = 0;

for(const line of lines.split('\n')){
    const matches = line.match(/(\d|one|two|three|four|five|six|seven|eight|nine)/g);

    if(!matches) continue;

    console.log(matches)

    const firstDigitAsText = matches[0];

    const firstDigit = getDigitFromText(firstDigitAsText);

    const lastDigitAsText = matches[matches.length - 1];

    const lastDigit = getDigitFromText(lastDigitAsText);

    const correctDigit = Number(firstDigit + lastDigit);

    console.log(firstDigitAsText, lastDigit, correctDigit)

    sum += correctDigit;
}

console.log(sum);
function getDigitFromText(firstDigitAsText: string) {
    switch (firstDigitAsText) {
        case 'one':
            return "1";
        case 'two':
            return "2";
        case 'three':
            return "3";
        case 'four':
            return "4";
        case 'five':
            return "5";
        case 'six':
            return "6";
        case 'seven':
            return "7";
        case 'eight':
            return "8";
        case 'nine':
            return "9";
        default:
            return firstDigitAsText;
    }
}

