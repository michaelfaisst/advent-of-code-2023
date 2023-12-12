import figlet from "figlet";
import chalk from "chalk";
import select from "@inquirer/select";

console.log(chalk.red(figlet.textSync("AOC 2023", { font: "Ghost" })));
console.log();

const printDay = async (day: {
    getPart1Solution: () => Promise<number>;
    getPart2Solution: () => Promise<number>;
}) => {
    const startPart1 = performance.now();
    const result1 = await day.getPart1Solution();
    const endPart1 = performance.now();
    const timeString1 = chalk.gray(`(${(endPart1 - startPart1).toFixed(2)}ms)`);

    console.log(`Part 1: ${chalk.green(result1)} ${timeString1}`);

    const startPart2 = performance.now();
    const result2 = await day.getPart2Solution();
    const endPart2 = performance.now();
    const timeString2 = chalk.gray(`(${(endPart2 - startPart2).toFixed(2)}ms)`);

    console.log(`Part 2: ${chalk.green(result2)} ${timeString2}`);
};

// const day = await select({
//     message: "Select a day",
//     choices: new Array(25).fill(0).map((_, i) => {
//         const day = i + 1;
//         const paddedDay = day.toString().padStart(2, "0");
//
//         return {
//             name: `Day ${day}`,
//             value: `day-${paddedDay}`,
//         };
//     }),
// });

const day = "day-12" as string;

try {
    const module = await import(`./${day}`);
    printDay(module);
} catch (e) {
    console.log(chalk.red("No solution found for this day."));
    process.exit(1);
}
