import inquirer from "inquirer";
import constants from "../../utils/constants/builderConstants.js";
import { pathConvertor } from "../../utils/helpers/filesHelpers.js";
import { createLandingPageCloning } from "../../commands/createAction/main/createLandingPage.js";
import manipulator from "../../manipulator/index.js";
import { MemoValues, QuestionQuery } from "../../types/actions.js";
import { memosToQuestions } from "../../manipulator/memorizer.js";
import { MemoCategory } from "../../enums/actions.js";

/**
 * This function will be fired by the --create-landing-page option
 */
const createLandingPageBuilder = async (memoValues: MemoValues) => {
    inquirer
        .prompt([
            ...memosToQuestions(memoValues, [
                constants.createLandingPage.projectName,
                constants.createLandingPage.publicDir,
            ] as QuestionQuery[]),
            constants.shared.overwrite([
                "public/index.html",
                "public/styles.css",
            ]),
        ])
        .then(async ({ projectName, publicDir, overwrite }) => {
            await manipulator({
                cloningCommands: createLandingPageCloning(
                    pathConvertor(publicDir, "public"),
                    projectName
                ),
                memo: {
                    pairs: { publicDir, projectName },
                    category: MemoCategory.EAGLE_NEST,
                },
                overwrite,
            });
        });
};

export default createLandingPageBuilder;
