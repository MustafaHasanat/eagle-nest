import inquirer from "inquirer";
import constants from "../utils/constants/builderConstants.js";
import { pathConvertor } from "../utils/helpers/filesHelpers.js";
import pathCreator from "../utils/helpers/pathCreator.js";
import cloningCommands from "../commands/cloningCommands.js";
import injectingCommands from "../commands/injectingCommands.js";
import { getTableNameVariants } from "../utils/helpers/getTableNameVariants.js";
import cloneTemplates from "../manipulator/cloneTemplates.js";
import injectTemplates from "../manipulator/injectTemplates.js";

/**
 * This function will be fired by the --create-table option
 */
const createTableBuilder = async () => {
    await inquirer
        .prompt([
            constants.createTable.tableName,
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
        ])
        .then(async (answers) => {
            const { overwrite, tableName, mainDist } = answers;
            if (!overwrite) return;

            const {
                camelCaseName,
                upperCaseName,
                pluralUpperCaseName,
                pluralLowerCaseName,
            } = getTableNameVariants(tableName);

            const [entitiesPath, schemasPath, dtoPath, enumsPath] = [
                pathConvertor(mainDist, "entities"),
                pathConvertor(mainDist, `schemas/${pluralLowerCaseName}`),
                pathConvertor(mainDist, `dto/${pluralLowerCaseName}`),
                pathConvertor(mainDist, `enums`),
            ];
            pathCreator([schemasPath, dtoPath, enumsPath]);

            const isDone = await cloneTemplates(
                cloningCommands.createTable({
                    paths: { entitiesPath, dtoPath, schemasPath },
                    nameVariants: {
                        camelCaseName,
                        upperCaseName,
                        pluralLowerCaseName,
                        pluralUpperCaseName,
                    },
                })
            );
            if (!isDone) return;

            await injectTemplates(
                injectingCommands.createTable({
                    paths: {
                        appModulePath: mainDist,
                        entitiesPath,
                        enumsPath,
                    },
                    nameVariants: {
                        camelCaseName,
                        upperCaseName,
                        pluralLowerCaseName,
                        pluralUpperCaseName,
                    },
                })
            );
        });
};

export default createTableBuilder;
