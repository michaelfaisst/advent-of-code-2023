import { getLines } from "../utils";

const calculateSequence = (history: number[]) => {
    const sequences = [history];

    while (sequences[sequences.length - 1].some((x) => x !== 0)) {
        const lastSequence = sequences[sequences.length - 1];
        const newSequence: number[] = [];

        for (let i = 1; i < lastSequence.length; i++) {
            newSequence.push(lastSequence[i] - lastSequence[i - 1]);
        }

        sequences.push(newSequence);
    }

    return sequences;
};

const extrapolateStart = (sequences: number[][]): number => {
    sequences[sequences.length - 1].unshift(0);

    for (let i = sequences.length - 2; i >= 0; i--) {
        sequences[i].unshift(sequences[i][0] - sequences[i + 1][0]);
    }

    return sequences[0][0];
};

const extrapolateEnd = (sequences: number[][]): number => {
    sequences[sequences.length - 1].push(0);
    for (let i = sequences.length - 2; i >= 0; i--) {
        sequences[i].push(
            sequences[i][sequences[i].length - 1] +
                sequences[i + 1][sequences[i + 1].length - 1]
        );
    }

    return sequences[0][sequences[0].length - 1];
};

export const calculateSolution = async (extrapolate: "start" | "end") => {
    const lines = await getLines("day-09");
    const histories = lines.map((line) => line.split(" ").map(Number));

    const result = histories.reduce((acc, curr) => {
        const sequences = calculateSequence(curr);
        const extrapolated =
            extrapolate === "start"
                ? extrapolateStart(sequences)
                : extrapolateEnd(sequences);
        return acc + extrapolated;
    }, 0);

    return result;
};

export const getPart1Solution = async () => {
    return await calculateSolution("end");
};

export const getPart2Solution = async () => {
    return await calculateSolution("start");
};
