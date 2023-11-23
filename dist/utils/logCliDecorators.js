const logCliTitle = (text) => {
    const result = `\n-------- ${text} --------\n`;
    console.log(result);
};
const logNewMessage = (text) => {
    const result = `\n${text}\n`;
    console.log(result);
};
const logCliProcess = (text) => {
    const result = `\n>>> ${text} ...\n`;
    console.log(result);
};
export { logCliTitle, logNewMessage, logCliProcess };
//# sourceMappingURL=logCliDecorators.js.map