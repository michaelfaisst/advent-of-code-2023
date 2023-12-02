import { getLines } from "../utils";

export const getPart1Solution = async () => {
  const lines = await getLines("day-01");
  return getResult(lines);
};

export const getPart2Solution = async () => {
  const lines = await getLines("day-01");

  // This could be done so much better by just looping through each line and matching either
  // numbers or words, but I'm lazy and this is kind of a funny solution.
  // Info: Number needs to be added somewhere in the middle, because otherwise something like 'eightwo' doesn't work.

  const mappedLines = lines.map((line) =>
    line
      .replaceAll("one", "o1ne")
      .replaceAll("two", "t2wo")
      .replaceAll("three", "th3ree")
      .replaceAll("four", "fo4ur")
      .replaceAll("five", "fi5ve")
      .replaceAll("six", "s6ix")
      .replaceAll("seven", "se7ven")
      .replaceAll("eight", "ei8ght")
      .replaceAll("nine", "ni9ne")
  );

  return getResult(mappedLines);
};

const getResult = (lines: string[]) => {
  return lines
    .map((line) => line.split("").filter(Number))
    .filter((line) => line.length >= 1)
    .map((line) => Number(`${line[0]}${line[line.length - 1]}`))
    .reduce((acc, curr) => acc + curr, 0);
};
