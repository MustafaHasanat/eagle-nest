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
                "app.module.ts",
                "app.controller.ts",
                "app.service.ts",
                ...(isUserGuard ? ["user-auth.guard.ts", ".env"] : []),
                ...(isFormat
                    ? [".prettierrc", ".eslintrc.js", "package.json"]
                    : []),
                ...(isAWS
                    ? ["aws.module.ts", "aws.controller.ts", "aws.service.ts"]
                    : []),
            ]),
        ])
        .then(async ({ overwrite, appDest, rootDir }) => {
            await manipulator({
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
                overwrite,
            });
        });
};

export default createAppFilesBuilder;
