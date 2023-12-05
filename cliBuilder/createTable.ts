import inquirer from "inquirer";
import Manipulator from "../manipulator/index.js";
import constants from "../constants/builderConstants.js";
import { pathConvertor } from "./helpers/filesHelpers.js";
import pathCreator from "../utils/pathCreator.js";
import cloningCommands from "./helpers/cloningCommands.js";
import injectingCommands from "./helpers/injectingCommands.js";
import { getTableNameVariants } from "../utils/getTableNameVariants.js";

/**
 * This function will be fired by the --create-table option
 */
const createTableBuilder = async (manipulator: Manipulator) => {
    await inquirer
        .prompt([
            constants.createTable.tableName,
            constants.createTable.mainDist,
            constants.shared.overwrite([
                "/entities/index.ts",
                "/entities/TABLE.entity.ts",
                "/dto/create-TABLE-body.ts",
                "/dto/create-TABLE-dto.ts",
                "/dto/update-TABLE-body.ts",
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

            const isDone = await manipulator.cloneTemplates(
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

            await manipulator.injectTemplates(
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
