import { getLines } from "../utils";

const rotateStringArray = (arr: string[]) => {
    const rotated = [];

    for (let i = 0; i < arr[0].length; i++) {
        rotated.push(arr.map((row) => row[i]).join(""));
    }

    return rotated;
};

const isPerfectReflection = (chunk: string[], startCol: number) => {
    for (let i = 1; i < chunk.length / 2; i++) {
        const [before, after] = [chunk[startCol - i], chunk[startCol + i + 1]];

        if (before === undefined || after === undefined) {
            return true;
        }

        if (before === after) {
            continue;
        } else {
            return false;
        }
    }

    return false;
};

const iterateChunk = (chunk: string[], vertical: boolean) => {
    for (let i = 0; i < chunk.length - 1; i++) {
        if (chunk[i] === chunk[i + 1]) {
            const isPerfect = isPerfectReflection(chunk, i);

            if (isPerfect) {
                return {
                    index: i,
                    isVertical: vertical,
                };
            }
        }
    }

    return null;
};

const findReflectionLine = (chunk: string[]) => {
    const horizontalResult = iterateChunk(chunk, false);

    if (horizontalResult) {
        return horizontalResult;
    }

    const rotatedChunk = rotateStringArray(chunk);
    const verticalResult = iterateChunk(rotatedChunk, true);

    if (verticalResult) {
        return verticalResult;
    }

    return null;
};

export const getPart1Solution = async () => {
    const chunks = (await getLines("day-13", false, "\n\n")).map((chunk) =>
        chunk.split("\n")
    );

    return chunks.reduce((acc, chunk) => {
        const chunkResult = findReflectionLine(chunk);

        if (chunkResult === null) {
            return acc;
        }

        return (
            acc + (chunkResult.index + 1) * (chunkResult.isVertical ? 1 : 100)
        );
    }, 0);
};

export const getPart2Solution = async () => {
    return 0;
};
