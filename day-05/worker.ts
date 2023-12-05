import { Almanac, SeedRange, getLocation } from "./utils";

declare var self: Worker;

self.onmessage = (
    event: MessageEvent<{
        seedRange: SeedRange;
        almanac: Almanac;
    }>
) => {
    const { seedRange, almanac } = event.data;
    let currMin = Infinity;

    console.log("Worker started");

    for (let i = 0; i < seedRange.numSeeds; i++) {
        const location = getLocation(seedRange.startSeed + i, almanac);
        if (location < currMin) {
            currMin = location;
        }
    }

    console.log("Worker finished");

    self.postMessage(currMin);
};
