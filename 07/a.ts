const text = await Deno.readTextFile("input.txt");
const lines = text.split("\n");

let flag = 0;

//#region Parsing

const parsedHands: { hand: string, value: number, bid: number }[] = [];

for (const line of lines) {
    const [hand, bid] = line.split(" ");

    const handValue = getHandValue(hand);

    parsedHands.push({
        hand: hand,
        value: handValue.value,
        bid: parseInt(bid)
    });
}

function getHandValue(hand: string) {
    const cards = hand.split("");

    const seenCardCounts: { card: string, count: number }[] = [];

    for (const card of cards) {
        const seenCard = seenCardCounts.find((x) => x.card === card);

        if (seenCard) {
            seenCard.count++;
        } else {
            seenCardCounts.push({
                card,
                count: 1
            });
        }
    }

    if (seenCardCounts.every((x) => x.count === 5)) {
        return { hand, value: 7 };
    }

    if (seenCardCounts.some((x) => x.count === 4)) {
        return { hand, value: 6 };
    }

    if (seenCardCounts.some((x) => x.count === 3) && seenCardCounts.some((x) => x.count === 2)) {
        return { hand, value: 5 };
    }

    if (seenCardCounts.some((x) => x.count === 3)) {
        return { hand, value: 4 };
    }

    if (seenCardCounts.filter((x) => x.count === 2).length === 2) {
        return { hand, value: 3 };
    }

    if (seenCardCounts.some((x) => x.count === 2)) {
        return { hand, value: 2 };
    }

    return { hand, value: 1 };
}

function getCardValue(card: string) {
    switch (card) {
        case "A":
            return 14;
        case "K":
            return 13;
        case "Q":
            return 12;
        case "J":
            return 11;
        case "T":
            return 10;
        default:
            return parseInt(card);
    }

}


//#endregion

//#region Calculating

const sortedHands = parsedHands.sort((a, b) => {
    if (a.value === b.value) {
        for (let i = 0; i < a.hand.length; i++) {
            const aCard = a.hand[i];
            const bCard = b.hand[i];

            if (aCard !== bCard) {
                return getCardValue(aCard) - getCardValue(bCard);
            }
        }
    }

    return a.value - b.value;
});

for (let i = 0; i < sortedHands.length - 1; i++) {
    const currentHand = sortedHands[i];

    const valuation = currentHand.bid * (i + 1);

    flag += valuation;
}

//#endregion

console.log(flag);