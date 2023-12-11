import { getLines } from "../utils";

const getGalaxies = (
    universe: string[][],
    expandFactor: number = 1
): [number, number][] => {
    let galaxies: [number, number][] = [];

    for (let i = 0; i < universe.length; i++) {
        for (let j = 0; j < universe[i].length; j++) {
            if (universe[i][j] === "#") {
                galaxies.push([i, j]);
            }
        }
    }

    for (let i = universe.length - 1; i >= 0; i--) {
        if (universe[i].every((node) => node === ".")) {
            galaxies = galaxies.map(([row, col]) => {
                if (row > i) {
                    return [row + expandFactor - 1, col];
                }

                return [row, col];
            });
        }
    }

    for (let i = universe[0].length - 1; i >= 0; i--) {
        const column = universe.map((row) => row[i]);

        if (column.every((node) => node === ".")) {
            galaxies = galaxies.map(([row, col]) => {
                if (col > i) {
                    return [row, col + expandFactor - 1];
                }

                return [row, col];
            });
        }
    }

    return galaxies;
};

const getDistance = (a: [number, number], b: [number, number]) => {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};

const getResult = async (expandFactor: number) => {
    const lines = await getLines("day-11");
    let universe = lines.map((line) => line.split(""));
    const galaxies = getGalaxies(universe, expandFactor);
    let result = 0;

    for (let i = 0; i < galaxies.length; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            result += getDistance(galaxies[i], galaxies[j]);
        }
    }

    return result;
};

export const getPart1Solution = async () => {
    return await getResult(2);
};

export const getPart2Solution = async () => {
    return await getResult(1000000);
};
