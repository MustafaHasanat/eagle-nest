import inquirer from "inquirer";
import Manipulator from "../manipulator/index.js";
import constants from "../utils/constants/builderConstants.js";
import injectingCommands from "../manipulator/injector/injectingCommands.js";
import { getTableNameVariants } from "../utils/helpers/getTableNameVariants.js";
import { pathConvertor } from "../utils/helpers/filesHelpers.js";
import {
    decoratorsMap,
    propertiesDtoMap,
    propertiesEntityMap,
} from "../utils/helpers/columnHelpers.js";
import { addSpecialItems } from "../utils/helpers/columnSpecialTypes.js";

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

            const entityProperties = propertiesEntityMap(columnProperties);
            const dtoProperties = propertiesDtoMap(columnProperties);
            const decorators = decoratorsMap(columnDecorators);

            const {
                fullEntityProperties,
                fullDtoProperties,
                fullDecorators,
                specialInjections,
            } = await addSpecialItems({
                columnType,
                entityProperties,
                dtoProperties,
                decorators,
            });

            await manipulator.injectTemplates(
                injectingCommands.createColumn({
                    columnData: {
                        columnName,
                        columnType: columnType[0],
                        entityProperties: fullEntityProperties,
                        dtoProperties: fullDtoProperties,
                        decorators: fullDecorators,
                    },
                    paths: {
                        entitiesPath,
                        dtoPath,
                    },
                    nameVariants: {
                        camelCaseName,
                    },
                    specialInjections,
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
