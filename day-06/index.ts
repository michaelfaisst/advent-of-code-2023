import { getLines } from "../utils";

interface Race {
    time: number;
    recordDistance: number;
}

const calcDistance = (raceTime: number, holdTime: number) => {
    const accTime = raceTime - holdTime;
    return accTime * holdTime;
};

const parseRaces = (line: string[], part2: boolean = false) => {
    let timesLine = line[0];
    let distancesLine = line[1];

    if (part2) {
        timesLine = timesLine.replaceAll(" ", "");
        distancesLine = distancesLine.replaceAll(" ", "");
    }

    const times = timesLine.match(/\d+/g)?.map(Number);
    const distances = distancesLine.match(/\d+/g)?.map(Number);

    const races: Race[] = [];

    times?.forEach((time, i) => {
        if (distances?.[i] == null) return;

        races.push({
            time: time,
            recordDistance: distances?.[i],
        });
    });

    return races;
};

export const getPart1Solution = async () => {
    const lines = await getLines("day-06");
    const races = parseRaces(lines);

    return races.reduce((acc, race) => {
        let waysToWin = 0;

        for (let i = 0; i <= race.time; i++) {
            const traveledDist = calcDistance(race.time, i);
            waysToWin += traveledDist > race.recordDistance ? 1 : 0;
        }

        return acc * waysToWin;
    }, 1);
};

// could propably be done way better with kind of a binary search algorithm
// to check when the distance is reached for the first time and the last time
// distance is reached (where hold time becomes too long). Every time between
// those two is a way to win.
export const getPart2Solution = async () => {
    const lines = await getLines("day-06");
    const races = parseRaces(lines, true);

    return races.reduce((acc, race) => {
        let waysToWin = 0;

        for (let i = 0; i <= race.time; i++) {
            const traveledDist = calcDistance(race.time, i);
            waysToWin += traveledDist > race.recordDistance ? 1 : 0;
        }

        return acc * waysToWin;
    }, 1);
};
