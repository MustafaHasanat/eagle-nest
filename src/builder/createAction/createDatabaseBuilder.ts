import inquirer from "inquirer";
import constants from "../../utils/constants/builderConstants.js";
import { pathConvertor } from "../../utils/helpers/filesHelpers.js";
import { join } from "path";
import {
    createDatabaseCloning,
    createDatabaseInjection,
} from "../../commands/createAction/main/createDatabase.js";
import manipulator from "../../manipulator/index.js";
import { MemoValues, QuestionQuery } from "../../types/actions.js";
import { memosToQuestions } from "../../manipulator/memorizer.js";
import { MemoCategory } from "../../enums/actions.js";

/**
 * This function will be fired by the --database option
 */
const createDatabaseBuilder = async (memoValues: MemoValues) => {
    inquirer
        .prompt([
            ...memosToQuestions(memoValues, [
                constants.createDatabase.rootDir,
                constants.createDatabase.appDest,
            ] as QuestionQuery[]),
            constants.shared.overwrite([
                "app.module.ts",
                "entities/index.ts",
                "tables-data.enum.ts",
                ".env",
            ]),
        ])
        .then(async ({ overwrite, rootDir, appDest }) => {
            await manipulator({
                cloningCommands: createDatabaseCloning(
                    pathConvertor(appDest, "entities"),
                    pathConvertor(appDest, "enums")
                ),
                injectionCommands: createDatabaseInjection({
                    appModuleDest: pathConvertor(
                        appDest,
                        "app.module.ts"
                    ),
                    envLocation: pathConvertor(rootDir, ".env"),
                    pathToEntities: join(process.cwd(), appDest),
                }),
                memo: {
                    pairs: { rootDir, appDest },
                    category: MemoCategory.EAGLE_NEST,
                },
                overwrite
            });
        });
};
export default createDatabaseBuilder;
