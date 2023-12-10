import inquirer from "inquirer";
import constants from "../utils/constants/builderConstants.js";
import { pathConvertor } from "../utils/helpers/filesHelpers.js";
import cloningCommands from "../commander/cloningCommands.js";
import cloneTemplates from "../manipulator/cloneTemplates.js";

/**
 * This function will be fired by the --create-landing-page option
 */
const createLandingPageBuilder = async () => {
    inquirer
        .prompt([
            constants.createLandingPage.projectName,
            constants.createLandingPage.publicDir,
            constants.shared.overwrite([
                "public/index.html",
                "public/styles.css",
            ]),
        ])
        .then(async (answers) => {
            if (!answers.overwrite) return;

            const isDone = await cloneTemplates(
                cloningCommands.createLandingPage(
                    pathConvertor(answers.publicDir, "public"),
                    answers.projectName
                )
            );
            if (!isDone) return;
        });
};

export default createLandingPageBuilder;
