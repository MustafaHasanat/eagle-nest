import inquirer from "inquirer";
import Manipulator from "../manipulator/index.js";
import constants from "../constants/builderConstants.js";
import injectingCommands from "./helpers/injectingCommands.js";
import { getTableNameVariants } from "../utils/getTableNameVariants.js";
import { pathConvertor } from "./helpers/filesHelpers.js";
import {
    decoratorsEntityMap,
    propertiesDtoMap,
    propertiesEntityMap,
} from "./helpers/columnHelpers.js";

const columnBuilder = async (
    manipulator: Manipulator,
    prevTableName: string = ""
) => {
    await inquirer
        .prompt([
            { ...constants.createColumn.tableName, default: prevTableName },
            constants.createColumn.mainDist,
            constants.createColumn.columnName,
            constants.createColumn.columnType,
            constants.createColumn.columnProperties,
            constants.createColumn.columnDecorators,
        ])
        .then(async (answers) => {
            const {
                tableName,
                mainDist,
                columnName,
                columnType,
                columnProperties,
                columnDecorators,
            } = answers;

            const { camelCaseName, pluralLowerCaseName } =
                getTableNameVariants(tableName);

            const [entitiesPath, dtoPath] = [
                pathConvertor(mainDist, "entities"),
                pathConvertor(mainDist, `dto/${pluralLowerCaseName}`),
            ];

            await manipulator.injectTemplates(
                injectingCommands.createColumn({
                    columnData: {
                        columnName,
                        columnType: columnType[0],
                        entityProperties: propertiesEntityMap(columnProperties),
                        entityDecorators: decoratorsEntityMap(columnDecorators),
                        dtoProperties: propertiesDtoMap(columnProperties),
                    },
                    paths: {
                        entitiesPath,
                        dtoPath,
                    },
                    nameVariants: {
                        camelCaseName,
                    },
                })
            );

            // ask the user if they want to add another column
            await inquirer
                .prompt([constants.createColumn.newColumn])
                .then(async ({ newColumn }) => {
                    if (newColumn) await columnBuilder(manipulator, tableName);
                });
        });
};

/**
 * This function will be fired by the --create-column option
 */
const createColumnBuilder = async (manipulator: Manipulator) => {
    inquirer
        .prompt([
            constants.shared.overwrite([
                "src/entities/TABLE.entity.ts",
                "src/dto/create-TABLE.dto.ts",
                "src/dto/update-TABLE.dto.ts",
                "src/enums/tables-columns.enum.ts",
            ]),
        ])
        .then(async (answers) => {
            if (!answers.overwrite) return;
            await columnBuilder(manipulator);
        });
};

export default createColumnBuilder;
