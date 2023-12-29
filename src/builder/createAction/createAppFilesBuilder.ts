import inquirer from "inquirer";
import constants from "../../utils/constants/builderConstants.js";
import {
    createAppFilesInjection,
    createAppFilesCloning,
} from "../../commands/createAction/main/createAppFiles.js";
import { OptionValues } from "commander";
import manipulator from "../../manipulator/index.js";
import { MemoValues, QuestionQuery } from "../../types/actions.js";
import { memosToQuestions } from "../../manipulator/memorizer.js";
import { MemoCategory } from "../../enums/actions.js";

/**
 * This function will be fired by the --create-app-files option
 */
const createAppFilesBuilder = async (
    memoValues: MemoValues,
    options: OptionValues
) => {
    const { guard: isUserGuard, format: isFormat, aws: isAWS } = options;

    inquirer
        .prompt([
            ...memosToQuestions(memoValues, [
                constants.createAppFiles.appDest,
                constants.createAppFiles.rootDir,
            ] as QuestionQuery[]),
            constants.shared.overwrite([
                "src/app.module.ts",
                "src/app.controller.ts",
                "src/app.service.ts",
                ...(isUserGuard ? ["src/guards/user-auth.guard.ts"] : []),
                ...(isFormat ? [".prettierrc", ".eslintrc.js"] : []),
                ...(isAWS
                    ? [
                          "src/aws/aws.module.ts",
                          "src/aws/aws.controller.ts",
                          "src/aws/aws.service.ts",
                      ]
                    : []),
            ]),
        ])
        .then(async ({ overwrite, appDest, rootDir }) => {
            if (!overwrite) return;

            manipulator({
                cloningCommands: createAppFilesCloning({
                    appDest,
                    rootDir,
                    isUserGuard,
                    isFormat,
                    isAWS,
                }),
                injectionCommands: createAppFilesInjection({
                    appDest,
                    rootDir,
                    isUserGuard,
                    isFormat,
                    isAWS,
                }),
                memo: {
                    pairs: { appDest, rootDir },
                    category: MemoCategory.EAGLE_NEST,
                },
            });
        });
};

export default createAppFilesBuilder;
