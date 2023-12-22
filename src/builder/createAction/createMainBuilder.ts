import inquirer from "inquirer";
import constants from "../../utils/constants/builderConstants.js";
import {
    createMainCloning,
    createMainInjection,
} from "../../commands/createAction/main/createMain.js";
import manipulator from "../../manipulator/index.js";
import { MemoValues, QuestionQuery } from "../../types/actions.js";
import { memosToQuestions } from "../../manipulator/memorizer.js";
import { MemoCategory } from "../../enums/actions.js";

/**
 * This function will be fired by the --create-main option
 */
const createMainBuilder = async (memoValues: MemoValues) => {
    inquirer
        .prompt([
            ...memosToQuestions(memoValues, [
                constants.createMain.projectName,
                constants.createMain.mainDest,
            ] as QuestionQuery[]),
            constants.shared.overwrite(["main.ts", ".env"]),
        ])
        .then(async ({ mainDest, projectName, overwrite }) => {
            if (!overwrite) return;

            manipulator({
                cloningCommands: createMainCloning(mainDest, projectName),
                injectionCommands: createMainInjection(".env"),
                memo: {
                    pairs: { mainDest, projectName },
                    category: MemoCategory.EAGLE_NEST,
                },
            });
        });
};

export default createMainBuilder;
