import inquirer from "inquirer";
import Utils from "../utils/index.js";
import Constants from "../constants/index.js";

const createAppFilesBuilder = async (constants: Constants, utils: Utils) => {
    inquirer
        .prompt([constants.builder.createAppFiles.destination])
        .then(async (answers) => {
            await utils.manipulator.cloneTemplates([
                {
                    target: "templates/base/typescript/app/module-file.txt",
                    dest: answers.destination,
                    newFileName: "app.module.ts",
                },
                {
                    target: "templates/base/typescript/app/controller-file.txt",
                    dest: answers.destination,
                    newFileName: "app.controller.ts",
                },
                {
                    target: "templates/base/typescript/app/service-file.txt",
                    dest: answers.destination,
                    newFileName: "app.service.ts",
                },
            ]);
        });
};

export default createAppFilesBuilder;
