import inquirer from "inquirer";
import constants from "../constants/builderConstants";
import { pathConvertor } from "./helpers/filesHelpers";
import { join } from "path";
import Manipulator from "../manipulator/index";
import cloningCommands from "./helpers/cloningCommands";
import injectingCommands from "./helpers/injectingCommands";
import { getRelativePathFromDirs } from "../utils/pathHelpers";

/**
 * This function will be fired by the --database option
 */
const databaseBuilder = async (manipulator: Manipulator) => {
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

            const isDone = await manipulator.cloneTemplates(
                cloningCommands.database(
                    pathConvertor(answers.appModuleLocation, "entities"),
                    pathConvertor(answers.appModuleLocation, "enums")
                )
            );
            if (!isDone) return;

            await manipulator.injectTemplates(
                injectingCommands.database({
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
