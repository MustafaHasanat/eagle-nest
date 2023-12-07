import inquirer from "inquirer";
import Manipulator from "../manipulator/index";
import constants from "../constants/builderConstants";
import injectingCommands from "./helpers/injectingCommands";
import { getTableNameVariants } from "../utils/getTableNameVariants";
import { pathConvertor } from "./helpers/filesHelpers";
import {
    decoratorsEntityMap,
    propertiesDtoMap,
    propertiesEntityMap,
} from "./helpers/columnHelpers";

const columnBuilder = async (
    manipulator: Manipulator,
    mainDist: string,
    prevTableName: string = ""
) => {
    await inquirer
        .prompt([
            { ...constants.createColumn.tableName, default: prevTableName },
            constants.createColumn.columnName,
            constants.createColumn.columnType,
            constants.createColumn.columnProperties,
            constants.createColumn.columnDecorators,
        ])
        .then(async (answers) => {
            const {
                tableName,
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
            constants.createColumn.mainDist,
        ])
        .then(async (answers) => {
            if (!answers.overwrite) return;
            await columnBuilder(manipulator, answers.mainDist);
        });
};

export default createColumnBuilder;