import inquirer from "inquirer";
import constants from "../constants/builderConstants.js";
import { firstCharToLower, firstCharToUpper, pathConvertor, pluralize, } from "./helpers/filesHelpers.js";
import { existsSync } from "fs";
import pathCreator from "../utils/pathCreator.js";
import { columnBuilder } from "./helpers/tableHelpers.js";
import cloningCommands from "./helpers/cloningCommands.js";
import injectingCommands from "./helpers/injectingCommands.js";
const createTableBuilder = async (manipulator) => {
    await inquirer
        .prompt([
        constants.createTable.tableName,
        constants.createTable.destination,
    ])
        .then(async (answers) => {
        const camelCaseName = answers.tableName;
        const upperCaseName = firstCharToUpper(answers.tableName);
        const pluralName = pluralize(answers.tableName);
        const pluralUpperCaseName = firstCharToUpper(pluralName);
        const pluralLowerCaseName = firstCharToLower(pluralName);
        const entitiesPath = pathConvertor(answers.destination, "entities");
        const schemasPath = pathConvertor(answers.destination, `schemas/${pluralLowerCaseName}`);
        const dtoPath = pathConvertor(answers.destination, `dto/${pluralLowerCaseName}`);
        const enumPath = pathConvertor(answers.destination, `enums/${pluralLowerCaseName}`);
        pathCreator([
            {
                path: schemasPath,
            },
            {
                path: dtoPath,
            },
            {
                path: enumPath,
            },
        ]);
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