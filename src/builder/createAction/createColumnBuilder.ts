import inquirer from "inquirer";
import constants from "../../utils/constants/builderConstants.js";
import { createColumnInjection } from "../../commands/createAction/main/createColumn.js";
import {
    decoratorsMap,
    getColumnAttributes,
    propertiesDtoMap,
    propertiesEntityMap,
} from "../../utils/helpers/columnHelpers.js";
import { addSpecialItems } from "../../utils/helpers/columnSpecialTypes.js";
import injectTemplates from "../../manipulator/injectTemplates.js";
import NameVariant from "../../models/nameVariant.js";
import SubPath from "../../models/subPath.js";

const columnBuilder = async (mainDist: string, prevTableName: string = "") => {
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

            // get the names variants and the paths
            const tableNameVariantObj = new NameVariant(tableName);
            const columnNameVariantObj = new NameVariant(columnName);
            const subPathObj = new SubPath({
                mainDir: mainDist,
                nameVariant: tableNameVariantObj,
            });

            await injectTemplates(
                createColumnInjection({
                    columnData: await addSpecialItems({
                        columnName,
                        columnType: columnType[0],
                        ...getColumnAttributes({
                            columnProperties,
                            columnDecorators,
                        }),
                    }),
                    paths: subPathObj,
                    tableNameVariants: tableNameVariantObj,
                    columNameVariants: columnNameVariantObj,
                })
            );

            // ask the user if they want to add another column
            await inquirer
                .prompt([constants.createColumn.newColumn])
                .then(async ({ newColumn }) => {
                    if (newColumn) await columnBuilder(tableName);
                });
        });
};

/**
 * This function will be fired by the --create-column option
 */
const createColumnBuilder = async () => {
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
            await columnBuilder(answers.mainDist);
        });
};

export default createColumnBuilder;
