import inquirer from "inquirer";
import Manipulator from "../manipulator/index.js";
import constants from "../constants/builderConstants.js";
import {
    firstCharToLower,
    firstCharToUpper,
    pathConvertor,
    pluralize,
} from "./helpers/filesHelpers.js";
import pathCreator from "../utils/pathCreator.js";
import cloningCommands from "./helpers/cloningCommands.js";
import injectingCommands from "./helpers/injectingCommands.js";

/**
 * This function will be fired by the --create-table option
 */
const createTableBuilder = async (manipulator: Manipulator) => {
    await inquirer
        .prompt([
            constants.createTable.tableName,
            constants.createTable.mainDist,
            constants.shared.overwrite([
                "/entities/entities.ts",
                "/entities/TABLE_NAME.entity.ts",
                "/dto/create-TABLE_NAME-body.ts",
                "/dto/create-TABLE_NAME-dto.ts",
                "/dto/update-TABLE_NAME-body.ts",
                "/dto/update-TABLE_NAME-dto.ts",
                "/schemas/TABLE_NAME/TABLE_NAME.module.ts",
                "/schemas/TABLE_NAME/TABLE_NAME.controller.ts",
                "/schemas/TABLE_NAME/TABLE_NAME.service.ts",
                "/enums/TABLE_NAME-fields.enum.ts",
            ]),
        ])
        .then(async (answers) => {
            const { overwrite, tableName, mainDist } = answers;
            if (!overwrite) return;

            const camelCaseName = tableName;
            const upperCaseName = firstCharToUpper(tableName);
            const pluralName = pluralize(tableName);
            const pluralUpperCaseName = firstCharToUpper(pluralName);
            const pluralLowerCaseName = firstCharToLower(pluralName);

            const [entitiesPath, schemasPath, dtoPath, enumPath] = [
                pathConvertor(mainDist, "entities"),
                pathConvertor(mainDist, `schemas/${pluralLowerCaseName}`),
                pathConvertor(mainDist, `dto/${pluralLowerCaseName}`),
                pathConvertor(mainDist, `enums/${pluralLowerCaseName}`),
            ];
            pathCreator([schemasPath, dtoPath, enumPath]);

            const isDone = await manipulator.cloneTemplates(
                cloningCommands.createTable({
                    paths: { entitiesPath, dtoPath, enumPath, schemasPath },
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
                        entitiesPath,
                        appModulePath: mainDist,
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
