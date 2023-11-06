import inquirer from "inquirer";
import Utils from "../utils/index.js";
import Constants from "../constants/index.js";
import { pathConvertor } from "./helpers/index.js";

const createLandingPageBuilder = async (constants: Constants, utils: Utils) => {
    inquirer
        .prompt([
            constants.builder.createLandingPage.projectName,
            constants.builder.createLandingPage.destination,
        ])
        .then(async (answers) => {
            await utils.manipulator.cloneTemplates([
                {
                    target: "templates/base/html/landing-page.txt",
                    dest: pathConvertor(answers.destination, "public"),
                    newFileName: "index.html",
                    replacements: [
                        {
                            oldString: "PROJECT_NAME",
                            newString: answers.projectName,
                        },
                    ],
                },
                {
                    target: "templates/base/css/landing-page.txt",
                    dest: pathConvertor(answers.destination, "public"),
                    newFileName: "styles.css",
                },
            ]);
        });
};

export default createLandingPageBuilder;
