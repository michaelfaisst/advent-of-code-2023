import { getLines } from "../utils";

enum Direction {
    Left,
    Right,
}

interface Instructions {
    directions: Direction[];
    maps: Record<string, [string, string]>;
}

export const parseLines = (lines: string[]): Instructions => {
    const directions = lines[0]
        .split("")
        .map((d) => (d === "L" ? Direction.Left : Direction.Right));

    const maps = lines.slice(2).reduce<Instructions["maps"]>((acc, line) => {
        const test = line.match(/(\w{3})/g);
        const [start, left, right] = test || [];

        if (start) {
            acc[start] = [left, right];
        }

        return acc;
    }, {});

    return {
        directions,
        maps,
    };
};

const lcm = (...arr: number[]) => {
    const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
    const _lcm = (x: number, y: number): number => (x * y) / gcd(x, y);
    return [...arr].reduce((a, b) => _lcm(a, b));
};

export const getPart1Solution = async () => {
    const lines = await getLines("day-08");
    const instructions = parseLines(lines);

    let currentNode = "AAA";
    let steps = 0;

    while (currentNode !== "ZZZ") {
        const direction =
            instructions.directions[steps % instructions.directions.length];
        currentNode = instructions.maps[currentNode][direction];
        steps++;
    }

    return steps;
};

export const getPart2Solution = async () => {
    const lines = await getLines("day-08");
    const instructions = parseLines(lines);

    let currentNodes = Object.keys(instructions.maps).filter(
        (node) => node.slice(2) === "A"
    );
    let steps = 0;

    const ghosts = currentNodes.reduce<
        Record<string, { currentNode: string; steps: number; done: boolean }>
    >((acc, node) => {
        acc[node] = {
            currentNode: node,
            steps: 0,
            done: false,
        };
        return acc;
    }, {});

    while (Object.values(ghosts).some((ghost) => !ghost.done)) {
        const direction =
            instructions.directions[steps % instructions.directions.length];

        for (const ghost of Object.values(ghosts)) {
            if (ghost.done) continue;
            ghost.currentNode = instructions.maps[ghost.currentNode][direction];
            ghost.steps++;

            if (ghost.currentNode.slice(2) === "Z") {
                ghost.done = true;
            }
        }

        steps++;
    }

    const ghostSteps = Object.values(ghosts).map((ghost) => ghost.steps);
    return lcm(...ghostSteps);
};
