const logCliTitle = (text: string) => {
    const result = `\n-------- ${text} --------\n`;

    console.log(result);
};

const logNewMessage = (text: string) => {
    const result = `${text}\n`;

    console.log(result);
};

const logCliProcess = (text: string) => {
    const result = `\n>>> ${text} ...\n`;

    console.log(result);
};

const logCliError = (
    text: string,
    type: "RUNTIME" | "LOGICAL" | "TOOL MISUSE",
    scope?: string
) => {
    const result = `\n!!! ${type} ERROR ${
        scope && `(${scope})`
    } !!!\n${text}\n`;

    console.log(result);
};

export { logCliTitle, logNewMessage, logCliProcess, logCliError };
