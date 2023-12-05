import { getLines } from "../utils";
import { SeedRange, getLocation, parseAlmanac } from "./utils";

export const getPart1Solution = async () => {
    const parts = await getLines("day-05", false, "\n\n");
    const almanac = parseAlmanac(parts, false);

    const min = almanac.seeds.reduce<number>((acc, seed) => {
        const location = getLocation(seed as number, almanac);
        return location < acc ? location : acc;
    }, Infinity);

    return min;
};

export const getPart2Solution = async () => {
    const parts = await getLines("day-05", false, "\n\n");
    const almanac = parseAlmanac(parts, true);

    const workerPromises = almanac.seeds.map((seed) => {
        return new Promise<number>((resolve) => {
            const worker = new Worker("./day-05/worker.ts");

            worker.onmessage = (event: MessageEvent<number>) => {
                resolve(event.data);
                worker.terminate();
            };

            worker.postMessage({
                seedRange: seed as SeedRange,
                almanac: almanac,
            });
        });
    });

    const workerResults = await Promise.all(workerPromises);
    return Math.min(...workerResults);
};
