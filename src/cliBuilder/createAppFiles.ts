import inquirer from "inquirer";
import constants from "../utils/constants/builderConstants.js";
import {
    createAppFilesInjection,
    createAppFilesCloning,
} from "../commands/createAction/main/createAppFiles.js";
import cloneTemplates from "../manipulator/cloneTemplates.js";
import injectTemplates from "../manipulator/injectTemplates.js";

/**
 * This function will be fired by the --create-app-files option
 */
const createAppFilesBuilder = async () => {
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

            const isDone = await cloneTemplates(
                createAppFilesCloning(mainDest, rolesGuard)
            );
            if (!isDone) return;

            await injectTemplates(
                createAppFilesInjection({
                    mainDest,
                    envDest,
                    rolesGuard,
                })
            );
        });
};

export default createAppFilesBuilder;
