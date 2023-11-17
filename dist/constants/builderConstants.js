import { existsSync } from "fs";
import { strictNameValidator } from "../validators/stringValidators.js";
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
        description: "'one-to-one' relation: each record of this table may have a link to only one record from the foreign one",
    },
    {
        name: "OneToMany",
        value: "OneToMany",
        description: "'one-to-many' relation: each record of this table may have multiple linked records from the foreign one",
    },
    {
        name: "ManyToOne",
        value: "ManyToOne",
        description: "'many-to-one' relation:  multiple records of this table may have a link to only one record from the foreign one",
    },
];
// ----------------
// helper functions
// ----------------
const trimmer = (input) => {
    return input.trim();
};
const getName = (name, validator = (name) => {
    return !name ? "You must pick a name!" : true;
}) => ({
    type: "input",
    name: name + "Name",
    message: `What's the name of your ${name}?`,
    validate: validator,
    filter: trimmer,
});
const getDestination = (props) => {
    const { targetName, defaultDest = "src", whenCallback = () => true, transformerCallback = (answer) => answer, } = props;
    return {
        type: "input",
        name: "destination",
        message: `Where do you want to locate your ${targetName}?`,
        default: defaultDest,
        filter: trimmer,
        validate(destination) {
            return !existsSync(destination) ? "Path doesn't exist!" : true;
        },
        when: whenCallback(),
        transformer: transformerCallback(),
    };
};
const getFileLocation = (fileName, realName) => ({
    type: "input",
    name: fileName + "Location",
    message: `What is the path to your ${realName} file?`,
    default: ".",
    validate(destination) {
        return !existsSync(destination) ? "Path doesn't exist!" : true;
    },
    filter: trimmer,
});
const overwritePermission = () => ({
    type: "confirm",
    name: "overwrite",
    message: "May we overwrite the files if they exist at the directory?",
    default: true,
});
const getChoices = (name, message, choices) => ({
    message,
    name,
    choices,
    validate(choice) {
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
        destination: getDestination({ targetName: "main.ts file" }),
    },
    // constants for the --create-landing-page
    createLandingPage: {
        projectName: getName("project"),
        destination: getDestination({
            targetName: "public folder",
            defaultDest: ".",
            whenCallback: () => !existsSync(process.cwd() + "/public"),
            transformerCallback: (answer) => answer === "." ? "" : answer,
        }),
    },
    // constants for the --create-app-files
    createAppFiles: {
        destination: getDestination({ targetName: "app files" }),
    },
    // constants for the --database
    database: {
        destination: getDestination({
            targetName: "db config files (root dir is recommended)",
            defaultDest: ".",
        }),
        appModuleLocation: getFileLocation("appModule", "app.module.ts"),
        overwrite: overwritePermission(),
    },
    // constants for the --create-table
    createTable: {
        tableName: {
            ...getName("table", (name) => {
                return strictNameValidator(name) ? "Name is invalid!" : true;
            }),
            message: "What's the name of your table? (use camelCase to avoid errors)"
        },
        destination: getDestination({
            targetName: "tables",
            defaultDest: "src",
        }),
        newColumn: {
            type: "confirm",
            name: "newColumn",
            message: "Do you want to create a column?",
            default: true,
        },
        columnName: getName("columnName"),
        columnType: getChoices("columnType", "Select the type of the column", columnTypeChoices),
        columnAttributes: {
            name: "columnAttributes",
            message: "Select the attributes that should be applied to this column (this is optional)",
            choices: columnAttributesChoices,
        },
        newRelation: {
            type: "confirm",
            name: "newRelation",
            message: "Do you want to create a new relation?",
            default: true,
        },
        relationType: getChoices("relationType", "Select the new relation", relationChoices),
        foreignTable: getName("foreignTable", (name) => {
            return strictNameValidator(name) ? "Name is invalid!" : true;
        }),
    },
};
export default builderConstants;
//# sourceMappingURL=builderConstants.js.map