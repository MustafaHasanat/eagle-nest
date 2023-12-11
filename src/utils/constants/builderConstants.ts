import { existsSync } from "fs";
import { tableNameValidator } from "../validators/stringValidators.js";
import { QuestionCollection } from "inquirer";
import {
    columnDecoratorsChoices,
    columnPropertiesChoices,
    columnTypeChoices,
    relationChoices,
} from "./builderChoices.js";
import { BuilderConstantsProps } from "../../interfaces/constants.js";

// ----------------
// helper functions
// ----------------
const trimmer = (input: string) => {
    return input.trim();
};

const getName = (props: {
    name: string;
    defaultValue?: string;
    validator?: (name: string) => string | boolean;
}): QuestionCollection<any> => {
    const {
        name,
        defaultValue = "",
        validator = (name: string) => {
            return !name ? "You must pick a name!" : true;
        },
    } = props;
    return {
        type: "input",
        name: name + "Name",
        default: defaultValue,
        message: `What's the name of your ${name}?`,
        validate: validator,
        filter: trimmer,
    };
};

const getDestination = (props: {
    targetName: string;
    defaultDest?: string;
    distName?: string;
    whenCallback?: Function;
    transformerCallback?: Function;
}): QuestionCollection => {
    const {
        targetName,
        defaultDest = "src",
        distName = "destination",
        whenCallback = () => true,
        transformerCallback = (answer: string) => answer,
    } = props;
    return {
        type: "input",
        name: distName,
        message: `Where do you want to locate your ${targetName}?`,
        default: defaultDest,
        filter: trimmer,
        validate(destination: string) {
            return !existsSync(destination) ? "Path doesn't exist!" : true;
        },
        when: whenCallback(),
        transformer: transformerCallback(),
    };
};

const getFileLocation = (
    fileName: string,
    realName: string,
    defaultValue: string = "."
): QuestionCollection => ({
    type: "input",
    name: fileName + "Location",
    message: `What is the path to your ${realName} file?`,
    default: defaultValue,
    validate(destination: string) {
        return !existsSync(destination) ? "Path doesn't exist!" : true;
    },
    filter: trimmer,
});

// -----------------
// builder constants
// -----------------
const builderConstants: BuilderConstantsProps = {
    // constants for the --create-main option
    createMain: {
        projectName: getName({ name: "project" }),
        mainDist: getDestination({
            distName: "mainDist",
            targetName: "main.ts file",
        }),
    },
    // constants for the --create-landing-page
    createLandingPage: {
        projectName: getName({ name: "project" }),
        publicDir: getDestination({
            targetName: "public folder",
            distName: "publicDir",
            defaultDest: ".",
            whenCallback: () => !existsSync(process.cwd() + "/public"),
            transformerCallback: (answer: string) =>
                answer === "." ? "" : answer,
        }),
    },
    // constants for the --create-app-files
    createAppFiles: {
        mainDest: getDestination({
            distName: "mainDest",
            targetName: "app files",
        }),
        envDest: getDestination({
            distName: "envDest",
            targetName: ".env file",
            defaultDest: ".",
        }),
        rolesGuard: {
            name: "rolesGuard",
            message: "Do you want us to add a user-guard?",
            type: "confirm",
            default: true,
        },
    },
    // constants for the --database
    database: {
        rootDir: getDestination({
            targetName: "root directory",
            defaultDest: ".",
            distName: "rootDir",
        }),
        appModuleLocation: getFileLocation("appModule", "app.module.ts", "src"),
    },
    // constants for the --create-table
    createTable: {
        tableName: {
            ...getName({
                name: "table",
                validator: (name: string) => tableNameValidator(name),
            }),
            message:
                "What's the name of your table? (use singular camelCase nouns to avoid errors, like: user, product, ...)",
        },
        mainDist: getDestination({
            targetName: "tables",
            defaultDest: "src",
            distName: "mainDist",
        }),
    },
    // constants for the --create-column option
    createColumn: {
        newColumn: {
            type: "confirm",
            name: "newColumn",
            message: "Do you want to create a new column?",
            default: true,
        },
        mainDist: {
            ...getDestination({
                targetName: "tables",
                defaultDest: "src",
                distName: "mainDist",
            }),
            message:
                "Where have you located your schemas, entities, dtos, ... ?",
        },
        tableName: {
            ...getName({ name: "table" }),
            message:
                "What's the name of your table? (use singular camelCase nouns to avoid errors, like: user, product, ...)",
        },
        columnName: getName({ name: "column" }),
        columnType: {
            name: "columnType",
            type: "checkbox",
            message:
                "Select the type of the new column: (exactly one must be selected)",
            choices: columnTypeChoices,
            validate: (options) => {
                if (options.length !== 1) {
                    return "Choose exactly one of the above!";
                }
                return true;
            },
        },
        columnProperties: {
            name: "columnProperties",
            type: "checkbox",
            message: "Select the properties of this column: (optional)",
            choices: columnPropertiesChoices,
        },
        columnDecorators: {
            name: "columnDecorators",
            type: "checkbox",
            message:
                "Select the validators that should be applied to this column: (optional)",
            choices: columnDecoratorsChoices,
        },
        stringLength: {
            name: "lengths",
            type: "input",
            message:
                "Specify the min and max lengths for your string separated by a comma with no spaces (e.g: 3,25): ",
            validate: (input: string) => {
                if (input.indexOf(",") === -1)
                    return "You must have a comma separating the lengths!";
                if (input.indexOf(" ") !== -1)
                    return "You shouldn't have any space!";
                if (input.indexOf(".") !== -1)
                    return "You shouldn't have any decimal points!";

                const [minimum, maximum] = input.trim().split(",");
                if (!!!Number(minimum) || !!!Number(maximum))
                    return "Both sides of the comma must be integers!";

                return true;
            },
        },
    },
    // constants for the --create-relation
    createRelation: {
        newRelation: {
            type: "confirm",
            name: "newRelation",
            message: "Do you want to create a new relation?",
            default: true,
        },
        relationType: {
            name: "relationType",
            type: "checkbox",
            message:
                "Select the type of the new relation: (exactly one must be selected)",
            choices: relationChoices,
            validate: (options) => {
                if (options.length !== 1) {
                    return "Choose exactly one of the above!";
                }
                return true;
            },
        },
        mainDist: {
            ...getDestination({
                targetName: "tables",
                defaultDest: "src",
                distName: "mainDist",
            }),
            message:
                "Where have you located your schemas, entities, dtos, ... ?",
        },
        tables: {
            type: "input",
            name: "tables",
            message:
                "Enter the names of the tables separated by a dash \n(use singular camelCase nouns to avoid errors, like: user-product)",
            validate: (tables: string) => {
                if (!tables) return "You must enter the names of your tables!";
                if (tables.indexOf("-") === -1)
                    return "You must have the dash symbol: -";
                if (tables.indexOf(" ") !== -1)
                    return "You must not use any space";

                return true;
            },
            filter: trimmer,
        },
    },
    // shared constants
    shared: {
        overwrite: (files: string[]) => ({
            type: "confirm",
            name: "overwrite",
            message: `May we overwrite the following files if they exist at the directory? \n[${files.join(
                ",\n"
            )}]\n(If we can't overwrite, then the command will be terminated)`,
            default: true,
        }),
    },
};

export default builderConstants;
