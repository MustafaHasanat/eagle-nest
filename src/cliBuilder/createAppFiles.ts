import inquirer from "inquirer";
import Manipulator from "../manipulator/index.js";
import constants from "../utils/constants/builderConstants.js";
import cloningCommands from "../manipulator/cloner/cloningCommands.js";
import injectingCommands from "manipulator/injector/injectingCommands.js";

/**
 * This function will be fired by the --create-app-files option
 */
const createAppFilesBuilder = async (manipulator: Manipulator) => {
    inquirer
        .prompt([
            constants.createAppFiles.mainDest,
            constants.createAppFiles.envDest,
            constants.createAppFiles.rolesGuard,
            constants.shared.overwrite([
                "app.module.ts",
                "app.controller.ts",
                "app.service.ts",
            ]),
        ])
        .then(async (answers) => {
            const { overwrite, mainDest, envDest, rolesGuard } = answers;

            if (!overwrite) return;

            const isDone = await manipulator.cloneTemplates(
                cloningCommands.createAppFiles(mainDest, rolesGuard)
            );
            if (!isDone) return;

            await manipulator.injectTemplates(
                injectingCommands.createAppFiles({
                    mainDest,
                    envDest,
                    rolesGuard,
                })
            );
        });
};

export default createAppFilesBuilder;
