import inquirer from "inquirer";
import constants from "../../utils/constants/builderConstants.js";
import { createRelationInjection } from "../../commands/createAction/main/createRelation.js";
import injectTemplates from "../../manipulator/injectTemplates.js";
import NameVariant from "../../models/nameVariant.js";
import SubPath from "../../models/subPath.js";

const relationBuilder = async () => {
    await inquirer
        .prompt([
            constants.createRelation.mainDist,
            constants.createRelation.relationType,
            constants.createRelation.tables,
            constants.createRelation.fieldName,
        ])
        .then(async (answers) => {
            const {
                mainDist,
                tables,
                relationType,
                fieldName,
            }: {
                mainDist: string;
                tables: string;
                relationType: string;
                fieldName: string;
            } = answers;

            const [firstTableName, secondTableName] = tables.split("-");

            // get the names variants and the paths
            const tableNameVariantObj1 = new NameVariant(firstTableName);
            const tableNameVariantObj2 = new NameVariant(secondTableName);
            const subPathObj1 = new SubPath({
                mainDir: mainDist,
                nameVariant: tableNameVariantObj1,
            });
            const subPathObj2 = new SubPath({
                mainDir: mainDist,
                nameVariant: tableNameVariantObj2,
            });

            await injectTemplates(
                createRelationInjection({
                    relationType: relationType[0],
                    table1: {
                        nameVariant: tableNameVariantObj1,
                        paths: subPathObj1,
                    },
                    table2: {
                        nameVariant: tableNameVariantObj2,
                        paths: subPathObj2,
                        camelCaseColumnName: fieldName,
                    },
                })
            );

            // ask the user if they want to add another relation
            await inquirer
                .prompt([constants.createRelation.newRelation])
                .then(async ({ newRelation }) => {
                    if (newRelation) await relationBuilder();
                });
        });
};

/**
 * This function will be fired by the --create-relation option
 */
const createRelationBuilder = async () => {
    inquirer
        .prompt([
            constants.shared.overwrite([
                "src/entities/TABLE1.entity.ts",
                "src/entities/TABLE2.entity.ts",
                "src/schemas/TABLE2.service.ts",
                "src/schemas/TABLE2.controller.ts",
                "src/dto/create-TABLE2.dto.ts",
                "src/dto/update-TABLE2.dto.ts",
            ]),
        ])
        .then(async (answers) => {
            if (!answers.overwrite) return;
            await relationBuilder();
        });
};

export default createRelationBuilder;
