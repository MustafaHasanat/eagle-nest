type CloneTemplate = {
    target: string;
    dest: string;
    newFileName: string;
    replacements?: {
        oldString: string;
        newString: string;
    }[];
};
export default CloneTemplate;
