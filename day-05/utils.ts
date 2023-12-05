export interface Mapping {
    rules: {
        startRange: number;
        endRange: number;
        startDestination: number;
    }[];
}

export interface SeedRange {
    startSeed: number;
    numSeeds: number;
}

export interface Almanac {
    seeds: number[] | SeedRange[];
    mappings: Mapping[];
}

const parseSeed = (line: string, part2Logic: boolean) => {
    const split = line
        .split(":")[1]
        .trim()
        .split(" ")
        .map((s) => parseInt(s));

    if (!part2Logic) {
        return split;
    }

    const seeds: { startSeed: number; numSeeds: number }[] = [];

    for (let i = 0; i < split.length; i += 2) {
        const startSeed = split[i];
        const numSeeds = split[i + 1];

        seeds.push({ startSeed, numSeeds });
    }

    return seeds;
};

export const parseAlmanac = (parts: string[], part2Logic: boolean): Almanac => {
    const mappings: Mapping[] = parts.slice(1).map((part) => {
        const [_, ...rules] = part.split("\n");

        return {
            rules: rules.map((rule) => {
                const [destStart, sourceStart, range] = rule.split(" ");

                return {
                    startRange: parseInt(sourceStart),
                    endRange: parseInt(sourceStart) + parseInt(range) - 1,
                    startDestination: parseInt(destStart),
                };
            }),
        };
    });
    return {
        seeds: parseSeed(parts[0], part2Logic),
        mappings: mappings,
    };
};

const getMappingResult = (mapping: Mapping, seed: number) => {
    const rule = mapping.rules.find(
        (x) => seed >= x.startRange && seed <= x.endRange
    );

    return rule ? rule.startDestination + (seed - rule.startRange) : seed;
};

export const getLocation = (seed: number, almanac: Almanac) => {
    return almanac.mappings.reduce(
        (acc, mapping) => getMappingResult(mapping, acc),
        seed
    );
};
