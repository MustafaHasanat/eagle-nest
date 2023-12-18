import inquirer from "inquirer";
import constants from "../../utils/constants/builderConstants.js";
import {
    createTableInjection,
    createTableCloning,
} from "../../commands/createAction/main/createTable.js";
import {
    createSpecialTableCloning,
    createSpecialTableInjection,
} from "../../commands/createAction/options/createSpecialTable.js";
import cloneTemplates from "../../manipulator/cloneTemplates.js";
import injectTemplates from "../../manipulator/injectTemplates.js";
import { OptionValues } from "commander";
import NameVariant from "../../models/nameVariant.js";
import SubPath from "../../models/subPath.js";
import { CreateSpecialArgument } from "../../enums/actions.js";

/**
 * This function will be fired by the --create-table option
 */
const createTableBuilder = async (options: OptionValues) => {
    let isSpecialTable = !!options.special;

    const questions = [
        constants.createTable.mainDist,
        constants.shared.overwrite([
            "/entities/index.ts",
            "/entities/TABLE.entity.ts",
            "/dto/create-TABLE-dto.ts",
            "/dto/update-TABLE-dto.ts",
            "/schemas/TABLE/TABLE.module.ts",
            "/schemas/TABLE/TABLE.controller.ts",
            "/schemas/TABLE/TABLE.service.ts",
            "/enums/TABLE-fields.enum.ts",
        ]),
    ];

    // ask about the table name if the '--special' option is not present
    if (!isSpecialTable) questions.unshift(constants.createTable.tableName);

    await inquirer
        .prompt(questions)
        .then(async ({ overwrite, tableName, mainDist }) => {
            if (!overwrite) return;

            // if the user entered a special table name,
            // ask them if they want to proceed as if '--special' is active
            if (
                !isSpecialTable &&
                Object.values(CreateSpecialArgument).includes(tableName)
            ) {
                const { isSpecial } = await inquirer.prompt([
                    constants.createTable.isSpecial(tableName),
                ]);

                if (isSpecial) isSpecialTable = true;
            }

            // get the names variants and the paths
            const nameVariantObj = new NameVariant(tableName);
            const subPathObj = new SubPath({
                mainDir: mainDist,
                nameVariant: nameVariantObj,
            });
            const createTableObj = {
                paths: subPathObj,
                nameVariant: nameVariantObj,
            };

            // call the cloning function
            const isDone = await cloneTemplates(
                isSpecialTable
                    ? createSpecialTableCloning({
                          ...createTableObj,
                          tableName: options.special || tableName,
                      })
                    : createTableCloning(createTableObj)
            );
            if (!isDone) return;

            // call the injection function
            await injectTemplates(
                isSpecialTable
                    ? createSpecialTableInjection({
                          ...createTableObj,
                          tableName: options.special || tableName,
                      })
                    : createTableInjection(createTableObj)
            );
        });
};

export default createTableBuilder;
