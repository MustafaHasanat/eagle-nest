type InjectionAdditionAction = {
    keyword: string;
    addition: {
        base: string;
        additionIsFile?: boolean;
        conditional?: {
            type: "SUPPOSED_TO_BE_THERE" | "NONE";
            data: string | null;
        };
    };
    replacements?: {
        oldString: string;
        newString: string;
    }[];
    replica?: boolean;
} | null;

type InjectionDeletionAction = {
    target: string;
};

type InjectTemplate = {
    injectable: string;
    additions: InjectionAdditionAction[];
    deletions?: InjectionDeletionAction[];
};

export { InjectTemplate, InjectionAdditionAction, InjectionDeletionAction };
