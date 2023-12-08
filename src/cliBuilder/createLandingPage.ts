import inquirer from "inquirer";
import constants from "../utils/constants/builderConstants.js";
import { pathConvertor } from "../utils/helpers/filesHelpers.js";
import Manipulator from "../manipulator/index.js";
import cloningCommands from "../manipulator/cloner/cloningCommands.js";

/**
 * This function will be fired by the --create-landing-page option
 */
const createLandingPageBuilder = async (manipulator: Manipulator) => {
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

            const isDone = await manipulator.cloneTemplates(
                cloningCommands.createLandingPage(
                    pathConvertor(answers.publicDir, "public"),
                    answers.projectName
                )
            );
            if (!isDone) return;
        });
};

export default createLandingPageBuilder;
