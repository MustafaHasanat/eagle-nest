import inquirer from "inquirer";
import Utils from "../utils/index.js";
import Constants from "../constants/index.js";

const createMainBuilder = async (constants: Constants, utils: Utils) => {
    inquirer
        .prompt([
            constants.builder.createMain.projectName,
            constants.builder.createMain.destination,
        ])
        .then(async (answers) => {
            await utils.manipulator.cloneTemplates([
                {
                    target: "templates/base/typescript/app/main-file.txt",
                    dest: answers.destination,
                    newFileName: "main.ts",
                    replacements: [
                        {
                            oldString: "PROJECT_NAME",
                            newString: answers.projectName,
                        },
                    ],
                },
                {
                    target: "templates/base/others/env-file.txt",
                    dest: ".",
                    newFileName: ".env",
                },
            ]);
        });
};

export default createMainBuilder;
