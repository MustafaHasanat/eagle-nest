import inquirer from "inquirer";
import constants from "../constants/builderConstants.js";
const createAppFilesBuilder = async (manipulator) => {
    inquirer
        .prompt([constants.createAppFiles.destination])
        .then(async (answers) => {
        await manipulator.cloneTemplates([
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
//# sourceMappingURL=createAppFiles.js.map