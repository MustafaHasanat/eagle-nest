import inquirer from "inquirer";
import constants from "../utils/constants/builderConstants.js";
import { pathConvertor } from "../utils/helpers/filesHelpers.js";
import { join } from "path";
import { createDatabaseCloning, createDatabaseInjection } from "../commands/createAction/createDatabase.js";
import cloneTemplates from "../manipulator/cloneTemplates.js";
import injectTemplates from "../manipulator/injectTemplates.js";

/**
 * This function will be fired by the --database option
 */
const databaseBuilder = async () => {
    inquirer
        .prompt([
            constants.database.rootDir,
            constants.database.appModuleLocation,
            constants.shared.overwrite([
                "app.module.ts",
                "entities/index.ts",
                "enums/tables-columns.enum.ts",
                ".env",
            ]),
        ])
        .then(async (answers) => {
            if (!answers.overwrite) return;

            const isDone = await cloneTemplates(
                createDatabaseCloning(
                    pathConvertor(answers.appModuleLocation, "entities"),
                    pathConvertor(answers.appModuleLocation, "enums")
                )
            );
            if (!isDone) return;

            await injectTemplates(
                createDatabaseInjection({
                    appModuleLocation: pathConvertor(
                        answers.appModuleLocation,
                        "app.module.ts"
                    ),
                    envLocation: pathConvertor(answers.rootDir, ".env"),
                    pathToEntities: join(
                        process.cwd(),
                        answers.appModuleLocation
                    ),
                    // pathToEntities: getRelativePathFromDirs(
                    //     join(process.cwd(), answers.rootDir, "entities"),
                    //     join(process.cwd(), answers.appModuleLocation)
                    // ),
                })
            );
        });
};
export default databaseBuilder;
