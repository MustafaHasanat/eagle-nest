type InjectionAction = {
    addition: string;
    additionIsFile?: boolean;
    supposedToBeThere?: string;
    replica?: boolean;
    keyword: string;
    replacements?: {
        oldString: string;
        newString: string;
    }[];
} | null;

type InjectTemplate = {
    injectable: string;
    actions: InjectionAction[];
};

export { InjectTemplate, InjectionAction };
