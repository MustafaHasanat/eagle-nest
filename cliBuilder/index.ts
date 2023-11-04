import inquirer from "inquirer";
import Utils from "../utils/index.js";
import Constants from "../constants/index.js";

export default class CliBuilder {
    constructor(constants: Constants, utils: Utils) {
        this.constants = constants;
        this.utils = utils;
    }
    constants;
    utils;

    // fired by the --create-main option
    createMain = async () => {
        inquirer
            .prompt([
                this.constants.builder.createMain.projectName,
                this.constants.builder.createMain.destination,
            ])
            .then(async (answers) => {
                await this.utils.manipulator.cloneTemplate(
                    "templates/base/typescript/app/main-file.txt",
                    answers.destination,
                    "main.ts",
                    "PROJECT_NAME",
                    answers.projectName
                );
            });
    };
}
