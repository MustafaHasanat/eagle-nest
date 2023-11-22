import inquirer from "inquirer";
import constants from "../constants/builderConstants.js";
import { firstCharToLower, firstCharToUpper, pathConvertor, pluralize, } from "./helpers/filesHelpers.js";
import { existsSync } from "fs";
import pathCreator from "../utils/pathCreator.js";
import { columnBuilder } from "./helpers/tableHelpers.js";
import cloningCommands from "./helpers/cloningCommands.js";
import injectingCommands from "./helpers/injectingCommands.js";
/**
 * This function will be fired by the --create-table option
 */
const createTableBuilder = async (manipulator) => {
    await inquirer
        .prompt([
        constants.createTable.tableName,
        constants.createTable.destination,
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
        if (!answers.overwrite)
            return;
        const camelCaseName = answers.tableName;
        const upperCaseName = firstCharToUpper(answers.tableName);
        const pluralName = pluralize(answers.tableName);
        const pluralUpperCaseName = firstCharToUpper(pluralName);
        const pluralLowerCaseName = firstCharToLower(pluralName);
        const [entitiesPath, schemasPath, dtoPath, enumPath] = [
            pathConvertor(answers.destination, "entities"),
            pathConvertor(answers.destination, `schemas/${pluralLowerCaseName}`),
            pathConvertor(answers.destination, `dto/${pluralLowerCaseName}`),
            pathConvertor(answers.destination, `enums/${pluralLowerCaseName}`),
        ];
        pathCreator([schemasPath, dtoPath, enumPath]);
        if (!existsSync(entitiesPath) ||
            !existsSync(entitiesPath + "/entities.ts")) {
            console.log(`You must have the file '${entitiesPath}/entities.ts'`);
            return;
        }
        await manipulator.cloneTemplates(cloningCommands.createTable({
            paths: { entitiesPath, dtoPath, enumPath, schemasPath },
            nameVariants: {
                camelCaseName,
                upperCaseName,
                pluralLowerCaseName,
                pluralUpperCaseName,
            },
        }));
        await manipulator.injectTemplates(injectingCommands.createTable({
            paths: {
                entitiesPath: entitiesPath + "/entities.ts",
            },
            nameVariants: {
                camelCaseName,
                upperCaseName,
            },
        }));
        await columnBuilder(answers.tableName, answers.destination);
    });
};
export default createTableBuilder;
//# sourceMappingURL=createTable.js.map