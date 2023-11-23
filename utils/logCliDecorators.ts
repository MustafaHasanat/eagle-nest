const logCliTitle = (text: string) => {
    const result = `\n-------- ${text} --------\n`;

    console.log(result);
};

const logNewMessage = (text: string) => {
    const result = `\n${text}\n`;

    console.log(result);
}

const logCliProcess = (text: string) => {
    const result = `\n>>> ${text} ...\n`;

    console.log(result);
};

export { logCliTitle, logNewMessage, logCliProcess };
