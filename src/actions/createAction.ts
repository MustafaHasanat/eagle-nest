import {
    logCliError,
    logCliProcess,
} from "../utils/helpers/logCliDecorators.js";
import { CreateArgument } from "../enums/createArgument.js";
import { execSync } from "child_process";
import installPackages from "../manipulator/installPackages.js";
import createMainBuilder from "../cliBuilder/createMain.js";
import constants from "../utils/constants/creatorConstants.js";
import createLandingPageBuilder from "../cliBuilder/createLandingPage.js";
import createAppFilesBuilder from "../cliBuilder/createAppFiles.js";
import databaseBuilder from "../cliBuilder/database.js";
import createTableBuilder from "../cliBuilder/createTable.js";
import createColumnBuilder from "../cliBuilder/createColumn.js";
import createRelationBuilder from "../cliBuilder/createRelation.js";

const createAction = async (filesSet: CreateArgument) => {
    const availableFilesSets = Object.values(CreateArgument);

    if (!availableFilesSets.includes(filesSet)) {
        logCliError(
            `Invalid argument "${filesSet}", you can only choose one of the following:\n${availableFilesSets.join(
                ", "
            )}`,
            "TOOL MISUSE",
            "argument"
        );
        return;
    }

    const isNeedDeps = !["createLandingPage"].includes(filesSet);
    const installedDeps: string[] = [];

    // get a copy from the installed dependencies of the project
    // (only if the option needs some dependencies)
    if (isNeedDeps) {
        logCliProcess("Checking your dependencies");
        installedDeps.push(
            ...execSync("npm ls --depth=0")
                .toString()
                .split(" ")
                .slice(2)
                .map((item) => item.slice(0, item.lastIndexOf("@")))
        );
    }

    switch (filesSet) {
        case CreateArgument.MAIN:
            await installPackages({
                installedDeps,
                neededDeps: constants.neededDeps.main,
            });
            await createMainBuilder();
            break;
        case CreateArgument.LANDING_PAGE:
            await createLandingPageBuilder();
            break;
        case CreateArgument.APP:
            await installPackages({
                installedDeps,
                neededDeps: constants.neededDeps.app,
            });
            await createAppFilesBuilder();
            break;
        case CreateArgument.DATABASE:
            await installPackages({
                installedDeps,
                neededDeps: constants.neededDeps.database,
            });
            await databaseBuilder();
            break;
        case CreateArgument.TABLE:
            await installPackages({
                installedDeps,
                neededDeps: constants.neededDeps.table,
            });
            await createTableBuilder();
            break;
        case CreateArgument.COLUMN:
            await installPackages({
                installedDeps,
                neededDeps: constants.neededDeps.column,
            });
            await createColumnBuilder();
            break;
        case CreateArgument.RELATION:
            await installPackages({
                installedDeps,
                neededDeps: constants.neededDeps.relation,
            });
            await createRelationBuilder();
            break;
        default:
            break;
    }
};

export default createAction;
