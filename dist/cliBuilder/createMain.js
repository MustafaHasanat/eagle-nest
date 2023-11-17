import inquirer from "inquirer";
import constants from "../constants/builderConstants.js";
const createMainBuilder = async (manipulator) => {
    inquirer
        .prompt([
        constants.createMain.projectName,
        constants.createMain.destination,
    ])
        .then(async (answers) => {
        await manipulator.cloneTemplates([
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
//# sourceMappingURL=createMain.js.map