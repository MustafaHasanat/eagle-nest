import inquirer from "inquirer";
import constants from "../constants/builderConstants.js";
import { filesExist, pathConvertor } from "./helpers/filesHelpers.js";
import { join } from "path";
import cloningCommands from "./helpers/cloningCommands.js";
import injectingCommands from "./helpers/injectingCommands.js";
const databaseBuilder = async (manipulator) => {
    inquirer
        .prompt([
        constants.database.destination,
        constants.database.appModuleLocation,
        constants.database.overwrite,
    ])
        .then(async (answers) => {
        const isFilesExist = filesExist([
            join(process.cwd(), answers.appModuleLocation, "app.module.txt"),
            join(process.cwd(), answers.destination, ".env"),
        ]);
        if (isFilesExist.length > 0) {
            console.log("You must have these files to modify them:");
            isFilesExist.forEach((file) => {
                console.log("\n1) " + file);
            });
            return;
        }
        if (!answers.overwrite) {
            console.log("You have to allow us to overwrite so we can make changes!");
            return;
        }
        await manipulator.cloneTemplates(cloningCommands.database(pathConvertor(answers.destination, "entities")));
        await manipulator.injectTemplates(injectingCommands.database({
            appModuleLocation: pathConvertor(answers.appModuleLocation, "app.module.ts"),
            dest: pathConvertor(answers.destination, ".env"),
        }));
    });
};
export default databaseBuilder;
//# sourceMappingURL=database.js.map