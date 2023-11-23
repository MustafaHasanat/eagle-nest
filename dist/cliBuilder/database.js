import inquirer from "inquirer";
import constants from "../constants/builderConstants.js";
import { pathConvertor } from "./helpers/filesHelpers.js";
import { join } from "path";
import cloningCommands from "./helpers/cloningCommands.js";
import injectingCommands from "./helpers/injectingCommands.js";
/**
 * This function will be fired by the --database option
 */
const databaseBuilder = async (manipulator) => {
    inquirer
        .prompt([
        constants.database.rootDir,
        constants.database.appModuleLocation,
        constants.shared.overwrite(["index.ts", "app.module.ts", ".env"]),
    ])
        .then(async (answers) => {
        if (!answers.overwrite)
            return;
        const isDone = await manipulator.cloneTemplates(cloningCommands.database(pathConvertor(answers.appModuleLocation, "entities")));
        if (!isDone)
            return;
        await manipulator.injectTemplates(injectingCommands.database({
            appModuleLocation: pathConvertor(answers.appModuleLocation, "app.module.ts"),
            envLocation: pathConvertor(answers.rootDir, ".env"),
            pathToEntities: join(process.cwd(), answers.appModuleLocation),
            // pathToEntities: getRelativePathFromDirs(
            //     join(process.cwd(), answers.rootDir, "entities"),
            //     join(process.cwd(), answers.appModuleLocation)
            // ),
        }));
    });
};
export default databaseBuilder;
//# sourceMappingURL=database.js.map