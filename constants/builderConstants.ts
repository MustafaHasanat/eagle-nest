import { existsSync } from "fs";

const trimmer = (input: string) => {
    return input.trim();
};

const getDestination = (fileName: string) => ({
    type: "input",
    name: "destination",
    message: `Where do you want to locate your ${fileName}?`,
    default: ".",
    validate(destination: string) {
        return !existsSync(destination) ? "Path doesn't exist!" : true;
    },
    filter: trimmer,
});

const getFileLocation = (fileName: string, realName: string) => ({
    type: "input",
    name: fileName + "Location",
    message: `What is the path to your ${realName} file?`,
    default: ".",
    validate(destination: string) {
        return !existsSync(destination) ? "Path doesn't exist!" : true;
    },
    filter: trimmer,
});

const builderConstants = {
    // constants for the --create-main option
    createMain: {
        projectName: {
            type: "input",
            name: "projectName",
            message: "What's the name of your project?",
            validate(projectName: string) {
                return !projectName ? "You must pick a name!" : true;
            },
            filter: trimmer,
        },
        destination: getDestination("main.ts file"),
    },
    // constants for the --create-landing-page
    createLandingPage: {
        projectName: {
            type: "input",
            name: "projectName",
            message: "What's the name of your project?",
            validate(projectName: string) {
                return !projectName ? "You must pick a name!" : true;
            },
            filter: trimmer,
        },
        destination: {
            ...getDestination("public folder"),
            when: () => !existsSync(process.cwd() + "/public"),
            transformer: (answer: string) => (answer === "." ? "" : answer),
        },
    },
    // constants for the --create-app-files
    createAppFiles: {
        destination: getDestination("app files"),
    },
    // constants for the --database
    database: {
        destination: getDestination("db config files (root dir is recommended)"),
        appModuleLocation: getFileLocation("appModule", "app.module.ts"),
        dotEnvLocation: getFileLocation("dotEnv", ".env"),
    },
    // constants for the --create-table
    createTable: {},
};

export default builderConstants;
