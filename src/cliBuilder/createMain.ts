import inquirer from "inquirer";
import injectTemplates from "../manipulator/injectTemplates.js";
import constants from "../utils/constants/builderConstants.js";
import cloneTemplates from "../manipulator/cloneTemplates.js";
import {
    createMainCloning,
    createMainInjection,
} from "../commands/createAction/main/createMain.js";

/**
 * This function will be fired by the --create-main option
 */
const createMainBuilder = async () => {
    inquirer
        .prompt([
            constants.createMain.projectName,
            constants.createMain.mainDist,
            constants.shared.overwrite(["main.ts", ".env"]),
        ])
        .then(async (answers) => {
            if (!answers.overwrite) return;

            const isDone = await cloneTemplates(
                createMainCloning(answers.mainDist, answers.projectName)
            );
            if (!isDone) return;

            await injectTemplates(createMainInjection(".env"));
        });
};

export default createMainBuilder;
