import inquirer from "inquirer";
import constants from "../constants/builderConstants.js";
import { pathConvertor } from "./helpers/filesHelpers.js";
const createLandingPageBuilder = async (manipulator) => {
    inquirer
        .prompt([
        constants.createLandingPage.projectName,
        constants.createLandingPage.destination,
    ])
        .then(async (answers) => {
        await manipulator.cloneTemplates([
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
//# sourceMappingURL=createLandingPage.js.map