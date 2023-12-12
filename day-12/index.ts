import { getLines } from "../utils";

interface Line {
    map: string;
    groupCounts: number[];
}

const parseLine = (line: string): Line => {
    const [map, counts] = line.split(" ");
    return {
        map,
        groupCounts: counts.split(",").map(Number),
    };
};

const isMatch = (line: string, groupCounts: number[]): boolean => {
    const matches = line.match(/(#+)/g);

    if (matches === null || matches.length !== groupCounts.length) {
        return false;
    }

    return matches.every((match, i) => match.length === groupCounts[i]);
};

const calcPermutations = (line: Line): number => {
    const unknownIndices = line.map
        .split("")
        .reduce<number[]>((acc, char, i) => {
            if (char === "?") {
                acc.push(i);
            }

            return acc;
        }, []);

    const numPermutations = Math.pow(2, unknownIndices.length);
    let numMatches = 0;

    for (let i = 0; i < numPermutations; i++) {
        const binary = i.toString(2).padStart(unknownIndices.length, "0");

        const permutation = line.map.split("");

        unknownIndices.forEach((index, i) => {
            permutation[index] = binary[i] === "0" ? "#" : ".";
        });

        if (isMatch(permutation.join(""), line.groupCounts)) {
            numMatches++;
        }
    }

    return numMatches;
};

export const getPart1Solution = async () => {
    const lines = await getLines("day-12");
    const input = lines.map(parseLine);

    return input.reduce((acc, line) => {
        return acc + calcPermutations(line);
    }, 0);
};

export const getPart2Solution = async () => {
    return 0;
};
