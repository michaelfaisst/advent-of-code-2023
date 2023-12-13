import { getLines } from "../utils";

interface Line {
    map: string;
    groupCounts: number[];
}

const parseLine = (line: string, expand: boolean): Line => {
    let [map, counts] = line.split(" ");

    if (expand) {
        (map = new Array(5).fill(map).join("?")),
            (counts = new Array(5).fill(counts).join(","));
    }

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

const getResult = async (part2: boolean = false) => {
    const lines = await getLines("day-12", true);
    const input = lines.map((line) => parseLine(line, part2));

    return input.reduce((acc, line, index) => {
        const result = calcPermutations(line);
        console.log(`Processed line ${index + 1}: ${result}`);
        return acc + result;
    }, 0);
};

export const getPart1Solution = async () => {
    return await getResult();
};

export const getPart2Solution = async () => {
    return await getResult(true);
};
