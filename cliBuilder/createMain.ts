import inquirer from "inquirer";
import Manipulator from "../manipulator/index.js";
import constants from "../constants/builderConstants.js";
import cloningCommands from "./helpers/cloningCommands.js";
import injectingCommands from "./helpers/injectingCommands.js";
import { pathConvertor } from "./helpers/filesHelpers.js";

/**
 * This function will be fired by the --create-main option
 */
const createMainBuilder = async (manipulator: Manipulator) => {
    inquirer
        .prompt([
            constants.createMain.projectName,
            constants.createMain.mainDist,
            constants.shared.overwrite(["main.ts", ".env"]),
        ])
        .then(async (answers) => {
            if (!answers.overwrite) return;

            const isDone = await manipulator.cloneTemplates(
                cloningCommands.createMain(
                    answers.mainDist,
                    answers.projectName
                )
            );
            if (!isDone) return;

            await manipulator.injectTemplates(
                injectingCommands.createMain(".env")
            );
        });
};

export default createMainBuilder;
