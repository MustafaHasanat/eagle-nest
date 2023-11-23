import { QuestionCollection } from "inquirer";
declare const builderConstants: {
    createMain: {
        projectName: {
            type: string;
            name: string;
            message: string;
            validate: (name: string) => string | boolean;
            filter: (input: string) => string;
        };
        mainDist: QuestionCollection;
    };
    createLandingPage: {
        projectName: {
            type: string;
            name: string;
            message: string;
            validate: (name: string) => string | boolean;
            filter: (input: string) => string;
        };
        publicDir: QuestionCollection;
    };
    createAppFiles: {
        destination: QuestionCollection;
    };
    database: {
        rootDir: QuestionCollection;
        appModuleLocation: QuestionCollection;
    };
    createTable: {
        tableName: {
            message: string;
            type: string;
            name: string;
            validate: (name: string) => string | boolean;
            filter: (input: string) => string;
        };
        mainDist: QuestionCollection;
    };
    createColumn: {
        newColumn: {
            type: string;
            name: string;
            message: string;
            default: boolean;
        };
        columnName: {
            type: string;
            name: string;
            message: string;
            validate: (name: string) => string | boolean;
            filter: (input: string) => string;
        };
        columnType: {
            message: string;
            name: string;
            choices: {
                name: string;
                value: string;
                description?: string | undefined;
            }[];
            validate(choice: string): string | true;
        };
        columnAttributes: {
            name: string;
            message: string;
            choices: {
                name: string;
                value: string;
                description: string;
            }[];
        };
    };
    createRelation: {
        newRelation: {
            type: string;
            name: string;
            message: string;
            default: boolean;
        };
        relationType: {
            message: string;
            name: string;
            choices: {
                name: string;
                value: string;
                description?: string | undefined;
            }[];
            validate(choice: string): string | true;
        };
        foreignTable: {
            type: string;
            name: string;
            message: string;
            validate: (name: string) => string | boolean;
            filter: (input: string) => string;
        };
    };
    shared: {
        overwrite: (files: string[]) => QuestionCollection;
    };
};
export default builderConstants;
