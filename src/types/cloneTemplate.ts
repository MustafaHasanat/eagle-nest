type CloneTemplate = {
    target: string;
    destination: string;
    newFileName: string;
    replacements?: {
        oldString: string;
        newString: string;
    }[];
};

export { CloneTemplate };
