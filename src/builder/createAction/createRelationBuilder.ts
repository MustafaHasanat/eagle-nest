import inquirer from "inquirer";
import constants from "../../utils/constants/builderConstants.js";
import { createRelationInjection } from "../../commands/createAction/main/createRelation.js";
import NameVariant from "../../models/nameVariant.js";
import SubPath from "../../models/subPath.js";
import manipulator from "../../manipulator/index.js";
import { MemoValues, QuestionQuery } from "../../types/actions.js";
import {
    MemorizerProps,
    memosToQuestions,
} from "../../manipulator/memorizer.js";
import { MemoCategory } from "../../enums/actions.js";

const relationBuilder = async ({
    mainDest,
    memo,
}: {
    mainDest: string;
    memo: MemorizerProps;
}) => {
    await inquirer
        .prompt([
            constants.createRelation.relationType,
            constants.createRelation.tables,
            constants.createRelation.fieldName,
        ])
        .then(async ({ tables, relationType, fieldName }) => {
            const [firstTableName, secondTableName] = tables.split("-");

            // get the names variants and the paths
            const tableNameVariantObj1 = new NameVariant(firstTableName);
            const tableNameVariantObj2 = new NameVariant(secondTableName);
            const subPathObj1 = new SubPath({
                mainDir: mainDest,
                nameVariant: tableNameVariantObj1,
            });
            const subPathObj2 = new SubPath({
                mainDir: mainDest,
                nameVariant: tableNameVariantObj2,
            });

            manipulator({
                injectionCommands: createRelationInjection({
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
                }),
                memo,
            });

            // ask the user if they want to add another relation
            await inquirer
                .prompt([constants.createRelation.newRelation])
                .then(async ({ newRelation }) => {
                    if (newRelation) await relationBuilder({ mainDest, memo });
                });
        });
};

/**
 * This function will be fired by the --create-relation option
 */
const createRelationBuilder = async (memoValues: MemoValues) => {
    inquirer
        .prompt([
            ...memosToQuestions(memoValues, [
                constants.createRelation.mainDest,
            ] as QuestionQuery[]),
            constants.shared.overwrite([
                "src/entities/TABLE1.entity.ts",
                "src/entities/TABLE2.entity.ts",
                "src/schemas/TABLE2.service.ts",
                "src/schemas/TABLE2.controller.ts",
                "src/dto/create-TABLE2.dto.ts",
                "src/dto/update-TABLE2.dto.ts",
            ]),
        ])
        .then(async ({ overwrite, mainDest }) => {
            if (!overwrite) return;
            await relationBuilder({
                mainDest,
                memo: {
                    pairs: { mainDest },
                    category: MemoCategory.EAGLE_NEST,
                },
            });
        });
};

export default createRelationBuilder;
