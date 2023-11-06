type InjectTemplate = {
    target: string;
    injectable: string;
    keyword: string;
    replacements?: {
        oldString: string;
        newString: string;
    }[];
};

export default InjectTemplate;
