import { specialLog } from "../utils/helpers/logHelpers.js";
import { CreateFieldsetArgument } from "../enums/createArguments.js";
import { execSync } from "child_process";
import installPackages from "../manipulator/installPackages.js";
import createMainBuilder from "../cliBuilder/createMain.js";
import constants from "../utils/constants/creatorConstants.js";
import createLandingPageBuilder from "../cliBuilder/createLandingPage.js";
import createAppFilesBuilder from "../cliBuilder/createAppFiles.js";
import createDatabaseBuilder from "../cliBuilder/createDatabase.js";
import createTableBuilder from "../cliBuilder/createTable.js";
import createColumnBuilder from "../cliBuilder/createColumn.js";
import createRelationBuilder from "../cliBuilder/createRelation.js";
import { OptionValues } from "commander";

const createAction = async (
    filesSet: CreateFieldsetArgument,
    options: OptionValues
) => {
    const availableFilesSets = Object.values(CreateFieldsetArgument);

    if (!availableFilesSets.includes(filesSet)) {
        specialLog({
            message: `Invalid argument "${filesSet}", you can only choose one of the following:\n${availableFilesSets.join(
                ", "
            )}`,
            situation: "ERROR",
            scope: "argument",
        });
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
        case CreateFieldsetArgument.MAIN:
            await installPackages({
                installedDeps,
                neededDeps: constants.neededDeps.main,
            });
            await createMainBuilder();
            break;
        case CreateFieldsetArgument.LANDING_PAGE:
            await createLandingPageBuilder();
            break;
        case CreateFieldsetArgument.APP:
            await installPackages({
                installedDeps,
                neededDeps: constants.neededDeps.app,
            });
            await createAppFilesBuilder();
            break;
        case CreateFieldsetArgument.DATABASE:
            await installPackages({
                installedDeps,
                neededDeps: constants.neededDeps.database,
            });
            await createDatabaseBuilder();
            break;
        case CreateFieldsetArgument.TABLE:
            await installPackages({
                installedDeps,
                neededDeps: constants.neededDeps.table,
            });
            await createTableBuilder(options);
            break;
        case CreateFieldsetArgument.COLUMN:
            await installPackages({
                installedDeps,
                neededDeps: constants.neededDeps.column,
            });
            await createColumnBuilder();
            break;
        case CreateFieldsetArgument.RELATION:
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
