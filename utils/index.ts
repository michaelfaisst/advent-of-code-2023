export const getLines = async (
    day: string,
    test: boolean = false,
    splitSequence: string = "\n"
) => {
    const fileName = `${day}/${test ? "test-input.txt" : "input.txt"}`;

    const file = Bun.file(fileName);
    const content = await file.text();

    return content.trim().split(splitSequence);
};
