import { getLines } from "../utils";

enum Tile {
    Ground = ".",
    VPipe = "|",
    HPipe = "-",
    NE = "L",
    NW = "J",
    SW = "7",
    SE = "F",
    S = "S",
}

enum Direction {
    Up = "U",
    Down = "D",
    Left = "L",
    Right = "R",
}

const Connections = {
    [Tile.Ground]: [],
    [Tile.VPipe]: [Direction.Up, Direction.Down],
    [Tile.HPipe]: [Direction.Left, Direction.Right],
    [Tile.NE]: [Direction.Up, Direction.Right],
    [Tile.NW]: [Direction.Up, Direction.Left],
    [Tile.SW]: [Direction.Down, Direction.Left],
    [Tile.SE]: [Direction.Down, Direction.Right],
    [Tile.S]: [Direction.Up, Direction.Down, Direction.Left, Direction.Right],
};

const OppositeDirection = {
    [Direction.Up]: Direction.Down,
    [Direction.Down]: Direction.Up,
    [Direction.Left]: Direction.Right,
    [Direction.Right]: Direction.Left,
};

const getGrid = (lines: string[]): Tile[][] => {
    return lines.map((line) => line.split("") as Tile[]);
};

const travel = (
    grid: Tile[][],
    startRow: number,
    startCol: number,
    startDirection: Direction
) => {
    let tile = grid[startRow][startCol];
    let row = startRow;
    let col = startCol;
    let direction = startDirection;
    let path = [[row, col]];

    while (true) {
        row +=
            direction === Direction.Up
                ? -1
                : direction === Direction.Down
                ? 1
                : 0;

        col +=
            direction === Direction.Left
                ? -1
                : direction === Direction.Right
                ? 1
                : 0;

        const nextTile = grid[row][col];

        if (
            nextTile == null ||
            nextTile === Tile.Ground ||
            !Connections[nextTile].includes(OppositeDirection[direction])
        ) {
            return;
        }

        tile = nextTile;
        direction = Connections[tile].find(
            (x) => x !== OppositeDirection[direction]
        )!;
        path.push([row, col]);

        if (tile === Tile.S) {
            path.pop();
            return path;
        }
    }
};

export const getPart1Solution = async () => {
    const lines = await getLines("day-10");
    const grid = getGrid(lines);
    const row = grid.findIndex((row) => row.includes(Tile.S));
    const col = grid[row].findIndex((tile) => tile === Tile.S);

    let pathLength: number | undefined = undefined;

    for (const dir of Object.values(Direction)) {
        const path = travel(grid, row, col, dir);

        if (path != null) {
            pathLength = path.length;
            break;
        }
    }

    return (pathLength || 0) / 2;
};

export const getPart2Solution = async () => {
    return 0;
};
