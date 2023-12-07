import inquirer from "inquirer";
import Manipulator from "../manipulator/index";
import constants from "../constants/builderConstants";
import cloningCommands from "./helpers/cloningCommands";

/**
 * This function will be fired by the --create-app-files option
 */
const createAppFilesBuilder = async (manipulator: Manipulator) => {
    inquirer
        .prompt([
            constants.createAppFiles.destination,
            constants.shared.overwrite([
                "app.module.ts",
                "app.controller.ts",
                "app.service.ts",
            ]),
        ])
        .then(async (answers) => {
            if (!answers.overwrite) return;

            const isDone = await manipulator.cloneTemplates(
                cloningCommands.createAppFiles(answers.destination)
            );
            if (!isDone) return;
        });
};

export default createAppFilesBuilder;
