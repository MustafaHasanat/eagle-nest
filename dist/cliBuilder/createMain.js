import inquirer from "inquirer";
import constants from "../constants/builderConstants.js";
import cloningCommands from "./helpers/cloningCommands.js";
/**
 * This function will be fired by the --create-main option
 */
const createMainBuilder = async (manipulator) => {
    inquirer
        .prompt([
        constants.createMain.projectName,
        constants.createMain.destination,
        constants.shared.overwrite(["main.ts", ".env"]),
    ])
        .then(async (answers) => {
        if (!answers.overwrite)
            return;
        await manipulator.cloneTemplates(cloningCommands.createMain(answers.destination, answers.projectName));
    });
};
export default createMainBuilder;
//# sourceMappingURL=createMain.js.map