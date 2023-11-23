type InjectionAction = {
    target: string;
    targetIsFile?: boolean;
    keyword: string;
    replacements?: {
        oldString: string;
        newString: string;
    }[];
};
type InjectTemplate = {
    injectable: string;
    actions: InjectionAction[];
};
export { InjectTemplate, InjectionAction };
