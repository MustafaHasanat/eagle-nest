import { logNumberedList, specialLog } from "../utils/helpers/logHelpers.js";
import { CreateFileSetArgument } from "../enums/actions.js";
import { execSync } from "child_process";
import installPackages from "../manipulator/installPackages.js";
import createMainBuilder from "../builder/createAction/createMainBuilder.js";
import constants from "../utils/constants/creatorConstants.js";
import createLandingPageBuilder from "../builder/createAction/createLandingPageBuilder.js";
import createAppFilesBuilder from "../builder/createAction/createAppFilesBuilder.js";
import createDatabaseBuilder from "../builder/createAction/createDatabaseBuilder.js";
import createTableBuilder from "../builder/createAction/createTableBuilder.js";
import createColumnBuilder from "../builder/createAction/createColumnBuilder.js";
import createRelationBuilder from "../builder/createAction/createRelationBuilder.js";
import { OptionValues } from "commander";

export default async function createAction(
    filesSet: CreateFileSetArgument,
    options: OptionValues
) {
    const availableFilesSets = Object.values(CreateFileSetArgument);

    if (!availableFilesSets.includes(filesSet)) {
        specialLog({
            message: `Invalid argument "${filesSet}", you can only choose one of the allowed values\n`,
            situation: "ERROR",
            scope: "argument",
        });
        logNumberedList(availableFilesSets);
        return;
    }

    const isNeedDeps = !["landing-page"].includes(filesSet);
    const installedDeps: string[] = [];

    // get a copy from the installed dependencies of the project
    // (only if the option needs some dependencies)
    if (isNeedDeps) {
        specialLog({
            message: "Checking your dependencies",
            situation: "PROCESS",
        });
        installedDeps.push(
            ...execSync("npm ls --depth=0")
                .toString()
                .split(" ")
                .slice(2)
                .map((item) => item.slice(0, item.lastIndexOf("@")))
        );
    }

    switch (filesSet) {
        case CreateFileSetArgument.MAIN:
            await installPackages({
                installedDeps,
                neededDeps: constants.neededDeps.main,
            });
            await createMainBuilder();
            break;
        case CreateFileSetArgument.LANDING_PAGE:
            await createLandingPageBuilder();
            break;
        case CreateFileSetArgument.APP:
            await installPackages({
                installedDeps,
                neededDeps: constants.neededDeps.app,
            });
            await createAppFilesBuilder();
            break;
        case CreateFileSetArgument.DATABASE:
            await installPackages({
                installedDeps,
                neededDeps: constants.neededDeps.database,
            });
            await createDatabaseBuilder();
            break;
        case CreateFileSetArgument.TABLE:
            await installPackages({
                installedDeps,
                neededDeps: constants.neededDeps.table,
            });
            await createTableBuilder(options);
            break;
        case CreateFileSetArgument.COLUMN:
            await installPackages({
                installedDeps,
                neededDeps: constants.neededDeps.column,
            });
            await createColumnBuilder();
            break;
        case CreateFileSetArgument.RELATION:
            await installPackages({
                installedDeps,
                neededDeps: constants.neededDeps.relation,
            });
            await createRelationBuilder();
            break;
        default:
            break;
    }
}
