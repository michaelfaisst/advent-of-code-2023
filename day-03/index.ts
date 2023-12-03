import { getLines } from "../utils";

interface NumberInfo {
    num: number;
    row: number;
    cells: { row: number; col: number }[];
}

const getNumberInfos = (lines: string[]) => {
    const allNumbersMatches = lines.join("").matchAll(/(\d+)/g);
    const width = lines[0].length;
    const numberInfos: NumberInfo[] = [];

    for (const match of allNumbersMatches) {
        const row = Math.floor((match.index || 0) / width);

        numberInfos.push({
            num: parseInt(match[1]),
            row,
            cells: new Array(match[1].length).fill(0).map((_, i) => ({
                row,
                col: ((match.index || 0) % width) + i,
            })),
        });
    }

    return numberInfos;
};

const getNeighbourCoordinates = (numberInfo: NumberInfo) => {
    const numLength = numberInfo.num.toString().length;

    const neighbours = [];

    // Left and right of the number
    neighbours.push(
        [numberInfo.row, numberInfo.cells[0].col - 1],
        [numberInfo.row, numberInfo.cells[numberInfo.cells.length - 1].col + 1]
    );

    // Top and bottom of the number
    for (let i = -1; i <= numLength; i++) {
        neighbours.push([numberInfo.row + 1, numberInfo.cells[0].col + i]);
        neighbours.push([numberInfo.row - 1, numberInfo.cells[0].col + i]);
    }

    return neighbours;
};

export const getPart1Solution = async () => {
    const lines = await getLines("day-03");
    const numberInfos = getNumberInfos(lines);

    const partNumbers = numberInfos.filter((info) => {
        const neighbours = getNeighbourCoordinates(info);

        return neighbours.some(([row, col]) =>
            lines?.[row]?.[col]?.match(/[^\d.]/)
        );
    });

    return partNumbers.reduce((acc, curr) => acc + curr.num, 0);
};

export const getPart2Solution = async () => {
    const lines = await getLines("day-03");
    const numberInfos = getNumberInfos(lines);

    const gears = lines.join("").matchAll(/[*]/g);
    let result = 0;

    for (const gear of gears) {
        const row = Math.floor((gear.index || 0) / lines[0].length);
        const col = (gear.index || 0) % lines[0].length;

        const gearNeighbours = getNeighbourCoordinates({
            num: 0,
            row,
            cells: [{ row, col }],
        });

        const neighbourNumbers = numberInfos.filter((info) =>
            gearNeighbours.some(([row, col]) =>
                info.cells.some((cell) => cell.row === row && cell.col === col)
            )
        );

        if (neighbourNumbers.length == 2) {
            result += neighbourNumbers[0].num * neighbourNumbers[1].num;
        }
    }

    return result;
};
