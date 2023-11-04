import { existsSync } from "fs";

const trimmer = (input: string) => {
    return input.trim();
};

const builderConstants = {
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
        destination: {
            type: "input",
            name: "destination",
            message: "Where do you want to locate your main.ts file?",
            default: ".",
            validate(destination: string) {
                return !existsSync(destination) ? "Path doesn't exist!" : true;
            },
            filter: trimmer,
        },
    },
};

export default builderConstants;
