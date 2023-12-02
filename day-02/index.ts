import { getLines } from "../utils";

const parseGames = (lines: string[]) => {
    return lines.map((line, index) => {
        const drawLines = line.split(":")[1].trim().split(";");
        const draws = drawLines.map((drawLine) =>
            drawLine
                .trim()
                .split(",")
                .reduce(
                    (acc, curr) => {
                        const [value, color] = curr.trim().split(" ");
                        return {
                            ...acc,
                            [color]: acc[color] + parseInt(value),
                        };
                    },
                    {
                        red: 0,
                        green: 0,
                        blue: 0,
                    } as { [key: string]: number }
                )
        );

        return {
            index: index + 1,
            draws,
        };
    });
};

export const getPart1Solution = async () => {
    const lines = await getLines("day-02");
    const games = parseGames(lines);

    return games
        .filter((game) =>
            game.draws.every(
                (draw) => draw.red <= 12 && draw.green <= 13 && draw.blue <= 14
            )
        )
        .reduce((acc, curr) => acc + curr.index, 0);
};

export const getPart2Solution = async () => {
    const lines = await getLines("day-02");
    const games = parseGames(lines);

    return games
        .map((game) => {
            return game.draws.reduce(
                (acc, curr) => {
                    return {
                        red: Math.max(acc.red, curr.red),
                        green: Math.max(acc.green, curr.green),
                        blue: Math.max(acc.blue, curr.blue),
                    };
                },
                {
                    red: 0,
                    green: 0,
                    blue: 0,
                }
            );
        })
        .map((game) => game.red * game.green * game.blue)
        .reduce((acc, curr) => acc + curr, 0);
};
