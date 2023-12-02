import figlet from "figlet";
import chalk from "chalk";
import select from "@inquirer/select";
import { getPart1Solution, getPart2Solution } from "./day-01";

console.log(chalk.red(figlet.textSync("AOC 2023", { font: "Ghost" })));
console.log();

const day1 = async () => {
  const result1 = await getPart1Solution();
  console.log(`Part 1: ${chalk.green(result1)}`);

  const result2 = await getPart2Solution();
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

switch (day) {
  case "day-01":
    day1();
    break;
}
