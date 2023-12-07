import { getLines } from "../utils";

enum HandType {
    HighCard,
    OnePair,
    TwoPair,
    ThreeOfAKind,
    FullHouse,
    FourOfAKind,
    FiveOfAKind,
}

interface Hand {
    cards: string;
    bid: number;
    handType: HandType;
}

const getFaceCardValues = (useJoker?: boolean) => {
    const faceCards: Record<string, number> = {
        A: 14,
        K: 13,
        Q: 12,
        J: 11,
        T: 10,
    };

    if (useJoker) {
        faceCards["J"] = 1;
    }

    return faceCards;
};

const calcHandSets = (input: string, useJoker?: boolean) => {
    const hand = input.split("").reduce<Record<string, number>>((acc, card) => {
        acc[card] = (acc[card] || 0) + 1;
        return acc;
    }, {});

    if (useJoker) {
        const numJokers = hand["J"] || 0;
        delete hand["J"];

        if (Object.keys(hand).length === 0) {
            return { A: numJokers };
        }

        const mostCards = Object.keys(hand).reduce((acc, key) =>
            hand[key] > hand[acc] ? key : acc
        );

        hand[mostCards] += numJokers;
    }

    return hand;
};

const calcHandType = (input: string, useJoker?: boolean) => {
    const handSets = calcHandSets(input, useJoker);

    switch (Object.keys(handSets).length) {
        case 1:
            return HandType.FiveOfAKind;
        case 2:
            return Object.values(handSets).includes(4)
                ? HandType.FourOfAKind
                : HandType.FullHouse;
        case 3:
            return Object.values(handSets).includes(3)
                ? HandType.ThreeOfAKind
                : HandType.TwoPair;
        case 4:
            return HandType.OnePair;
        case 5:
            return HandType.HighCard;
        default:
            throw new Error("Invalid hand type");
    }
};

const tieBreaker = (a: string, b: string, useJoker?: boolean) => {
    for (let i = 0; i < a.length; i++) {
        const aCard = a[i];
        const bCard = b[i];
        const aVal = getFaceCardValues(useJoker)[aCard] || Number(aCard);
        const bVal = getFaceCardValues(useJoker)[bCard] || Number(bCard);

        if (aVal !== bVal) {
            return aVal - bVal;
        }
    }

    return 0;
};

const parseHand = (input: string, useJoker?: boolean): Hand => {
    const [cards, bid] = input.split(" ");

    return {
        cards,
        bid: Number(bid),
        handType: calcHandType(cards, useJoker),
    };
};

const getResult = async (useJoker?: boolean) => {
    const lines = await getLines("day-07");
    let hands = lines.map((line) => parseHand(line, useJoker));

    hands = hands.sort((a, b) => {
        if (a.handType === b.handType) {
            return tieBreaker(a.cards, b.cards, useJoker);
        }

        return a.handType - b.handType;
    });

    return hands.reduce((acc, hand, i) => {
        return acc + (i + 1) * hand.bid;
    }, 0);
};

export const getPart1Solution = async () => {
    return await getResult();
};

export const getPart2Solution = async () => {
    return await getResult(true);
};
