import inquirer from "inquirer";
import constants from "../constants/builderConstants.js";
import { pathConvertor } from "./helpers/filesHelpers.js";
import Manipulator from "../manipulator/index.js";
import cloningCommands from "./helpers/cloningCommands.js";

/**
 * This function will be fired by the --create-landing-page option
 */
const createLandingPageBuilder = async (manipulator: Manipulator) => {
    inquirer
        .prompt([
            constants.createLandingPage.projectName,
            constants.createLandingPage.destination,
            constants.shared.overwrite([
                "public/index.html",
                "public/styles.css",
            ]),
        ])
        .then(async (answers) => {
            if (!answers.overwrite) return;

            await manipulator.cloneTemplates(
                cloningCommands.createLandingPage(
                    pathConvertor(answers.destination, "public"),
                    answers.projectName
                )
            );
        });
};

export default createLandingPageBuilder;
