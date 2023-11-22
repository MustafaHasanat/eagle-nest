import inquirer from "inquirer";
import constants from "../constants/builderConstants.js";
import { isFilesExist, pathConvertor } from "./helpers/filesHelpers.js";
import { join } from "path";
import cloningCommands from "./helpers/cloningCommands.js";
import injectingCommands from "./helpers/injectingCommands.js";
/**
 * This function will be fired by the --database option
 */
const databaseBuilder = async (manipulator) => {
    inquirer
        .prompt([
        constants.database.destination,
        constants.database.appModuleLocation,
        constants.shared.overwrite(["index.ts", "app.module.ts", ".env"]),
    ])
        .then(async (answers) => {
        if (!answers.overwrite)
            return;
        const isFilesExistRes = isFilesExist([
            join(process.cwd(), answers.appModuleLocation, "app.module.ts"),
            join(process.cwd(), answers.destination, ".env"),
        ]);
        if (isFilesExistRes.length > 0) {
            console.log("You must have these files to modify them:");
            isFilesExistRes.forEach((file) => {
                console.log("\n1) " + file);
            });
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