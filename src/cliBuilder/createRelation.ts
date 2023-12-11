import inquirer from "inquirer";
import constants from "../utils/constants/builderConstants.js";
import injectingCommands from "../commands/injectingCommands.js";
import { getTableNameVariants } from "../utils/helpers/getTableNameVariants.js";
import { pathConvertor } from "../utils/helpers/filesHelpers.js";
import injectTemplates from "../manipulator/injectTemplates.js";

const relationBuilder = async () => {
    await inquirer
        .prompt([
            constants.createRelation.mainDist,
            constants.createRelation.relationType,
            constants.createRelation.tables,
        ])
        .then(async (answers) => {
            const {
                mainDist,
                tables,
                relationType,
            }: { mainDist: string; tables: string; relationType: string } =
                answers;

            const [firstTableName, secondTableName] = tables.split("-");

            const {
                camelCaseName: camelCaseName1,
                upperCaseName: upperCaseName1,
                pluralLowerCaseName: pluralLowerCaseName1,
                pluralUpperCaseName: pluralUpperCaseName1,
            } = getTableNameVariants(firstTableName);

            const {
                camelCaseName: camelCaseName2,
                upperCaseName: upperCaseName2,
                pluralLowerCaseName: pluralLowerCaseName2,
                pluralUpperCaseName: pluralUpperCaseName2,
            } = getTableNameVariants(secondTableName);

            const [entitiesPath, dtoPath2, schemasPath1, schemasPath2] = [
                pathConvertor(mainDist, "entities"),
                pathConvertor(mainDist, `dto/${pluralLowerCaseName2}`),
                pathConvertor(mainDist, `schemas/${pluralLowerCaseName1}`),
                pathConvertor(mainDist, `schemas/${pluralLowerCaseName2}`),
            ];

            await injectTemplates(
                injectingCommands.createRelation({
                    relationType: relationType[0],
                    entitiesPath,
                    table1: {
                        camelCaseName1,
                        upperCaseName1,
                        pluralLowerCaseName1,
                        pluralUpperCaseName1,
                        schemasPath1,
                    },
                    table2: {
                        camelCaseName2,
                        upperCaseName2,
                        pluralLowerCaseName2,
                        pluralUpperCaseName2,
                        dtoPath2,
                        schemasPath2,
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
