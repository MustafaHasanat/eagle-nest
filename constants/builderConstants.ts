import { existsSync } from "fs";
import { strictNameValidator } from "../validators/stringValidators.js";
import { QuestionCollection } from "inquirer";

const columnTypeChoices = [
    {
        name: "string",
        value: "string",
        description: "create a simple string column",
    },
    {
        name: "number",
        value: "number",
    },
    {
        name: "boolean",
        value: "boolean",
    },
    {
        name: "enum",
        value: "enum",
    },
    {
        name: "date",
        value: "date",
    },
    {
        name: "object",
        value: "object",
    },
    {
        name: "array",
        value: "array",
    },
];

const columnAttributesChoices = [
    {
        name: "isUnique",
        value: "isUnique",
        description: "a unique column will never accept duplicate rows on it",
    },
];

const relationChoices = [
    {
        name: "OneToOne",
        value: "OneToOne",
        description:
            "'one-to-one' relation: each record of this table may have a link to only one record from the foreign one",
    },
    {
        name: "OneToMany",
        value: "OneToMany",
        description:
            "'one-to-many' relation: each record of this table may have multiple linked records from the foreign one",
    },
    {
        name: "ManyToOne",
        value: "ManyToOne",
        description:
            "'many-to-one' relation:  multiple records of this table may have a link to only one record from the foreign one",
    },
];

// ----------------
// helper functions
// ----------------
const trimmer = (input: string) => {
    return input.trim();
};

const getName = (
    name: string,
    validator: (name: string) => string | boolean = (name: string) => {
        return !name ? "You must pick a name!" : true;
    }
) => ({
    type: "input",
    name: name + "Name",
    message: `What's the name of your ${name}?`,
    validate: validator,
    filter: trimmer,
});

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

const getChoices = (
    name: string,
    message: string,
    choices: {
        name: string;
        value: string;
        description?: string;
    }[]
) => ({
    message,
    name,
    choices,
    validate(choice: string) {
        return !choice ? `You must pick a ${name}!` : true;
    },
});

// -----------------
// builder constants
// -----------------
const builderConstants = {
    // constants for the --create-main option
    createMain: {
        projectName: getName("project"),
        mainDist: getDestination({
            distName: "mainDist",
            targetName: "main.ts file",
        }),
    },
    // constants for the --create-landing-page
    createLandingPage: {
        projectName: getName("project"),
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
        destination: getDestination({ targetName: "app files" }),
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
            ...getName("table", (name: string) => {
                return strictNameValidator(name) ? "Name is invalid!" : true;
            }),
            message:
                "What's the name of your table? (use camelCase to avoid errors)",
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
            message: "Do you want to create a column?",
            default: true,
        },
        columnName: getName("columnName"),
        columnType: getChoices(
            "columnType",
            "Select the type of the column",
            columnTypeChoices
        ),
        columnAttributes: {
            name: "columnAttributes",
            message:
                "Select the attributes that should be applied to this column (this is optional)",
            choices: columnAttributesChoices,
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
        relationType: getChoices(
            "relationType",
            "Select the new relation",
            relationChoices
        ),
        foreignTable: getName("foreignTable", (name: string) => {
            return strictNameValidator(name) ? "Name is invalid!" : true;
        }),
    },
    // shared constants
    shared: {
        overwrite: (files: string[]): QuestionCollection => ({
            type: "confirm",
            name: "overwrite",
            message: `May we overwrite the files if they exist at the directory? -> [${files.join(
                ", "
            )}]\n(If we can't overwrite, then the command will be terminated)`,
            default: true,
        }),
    },
};

export default builderConstants;
