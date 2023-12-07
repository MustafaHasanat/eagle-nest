import inquirer from "inquirer";
import constants from "../constants/builderConstants";
import { pathConvertor } from "./helpers/filesHelpers";
import Manipulator from "../manipulator/index";
import cloningCommands from "./helpers/cloningCommands";

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
