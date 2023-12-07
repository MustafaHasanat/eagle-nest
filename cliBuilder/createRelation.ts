import inquirer from "inquirer";
import Manipulator from "../manipulator/index.js";
import constants from "../constants/builderConstants.js";
import injectingCommands from "./helpers/injectingCommands.js";
import { getTableNameVariants } from "../utils/getTableNameVariants.js";
import { pathConvertor } from "./helpers/filesHelpers.js";

const relationBuilder = async (manipulator: Manipulator) => {
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

            const [entitiesPath, dtoPath2, schemasPath2] = [
                pathConvertor(mainDist, "entities"),
                pathConvertor(mainDist, `dto/${pluralLowerCaseName2}`),
                pathConvertor(mainDist, `schemas/${pluralLowerCaseName2}`),
            ];

            await manipulator.injectTemplates(
                injectingCommands.createRelation({
                    relationType: relationType[0],
                    entitiesPath,
                    table1: {
                        camelCaseName1,
                        upperCaseName1,
                        pluralLowerCaseName1,
                        pluralUpperCaseName1,
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
                    if (newRelation) await relationBuilder(manipulator);
                });
        });
};

/**
 * This function will be fired by the --create-relation option
 */
const createRelationBuilder = async (manipulator: Manipulator) => {
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
            await relationBuilder(manipulator);
        });
};

export default createRelationBuilder;
