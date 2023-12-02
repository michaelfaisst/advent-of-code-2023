import figlet from "figlet";
import chalk from "chalk";
import select from "@inquirer/select";
import * as day1 from "./day-01";
import * as day2 from "./day-02";

console.log(chalk.red(figlet.textSync("AOC 2023", { font: "Ghost" })));
console.log();

const printDay = async (day: {
    getPart1Solution: () => Promise<number>;
    getPart2Solution: () => Promise<number>;
}) => {
    const result1 = await day.getPart1Solution();
    console.log(`Part 1: ${chalk.green(result1)}`);

    const result2 = await day.getPart2Solution();
    console.log(`Part 2: ${chalk.green(result2)}`);
};

const day = await select({
    message: "Select a day",
    choices: new Array(25).fill(0).map((_, i) => {
        const day = i + 1;
        const paddedDay = day.toString().padStart(2, "0");

        return {
            name: `Day ${day}`,
            value: `day-${paddedDay}`,
        };
    }),
});

// const day = "day-02" as string;

switch (day) {
    case "day-01":
        printDay(day1);
        break;
    case "day-02":
        printDay(day2);
        break;
}
