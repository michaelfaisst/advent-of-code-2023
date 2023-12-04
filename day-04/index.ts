import { getLines } from "../utils";

interface Card {
    winningNumbers: number[];
    numbers: number[];
}

const stringToNumberArray = (str: string) => {
    return str
        .split(" ")
        .filter((x) => x !== "")
        .map((n) => parseInt(n));
};

const parseCards = (lines: string[]): Card[] => {
    return lines.map((line) => {
        const [winningNumbers, numbers] = line.split(":")[1].split("|");

        return {
            winningNumbers: stringToNumberArray(winningNumbers),
            numbers: stringToNumberArray(numbers),
        };
    });
};

export const getPart1Solution = async () => {
    const lines = await getLines("day-04");
    const cards = parseCards(lines);

    return cards.reduce((acc, card) => {
        const numMatches = card.numbers.filter((n) =>
            card.winningNumbers.includes(n)
        ).length;

        return numMatches === 0 ? acc : acc + Math.pow(2, numMatches - 1);
    }, 0);
};

export const getPart2Solution = async () => {
    const lines = await getLines("day-04");
    const cards = parseCards(lines);

    const cardCount = new Array(cards.length).fill(1);

    cards.forEach((card, i) => {
        const numMatches = card.numbers.filter((n) =>
            card.winningNumbers.includes(n)
        ).length;

        for (let j = 1; j <= numMatches; j++) {
            cardCount[i + j] += cardCount[i];
        }
    });

    return cardCount.reduce((acc, count) => acc + count, 0);
};
