import inquirer from "inquirer";
import Manipulator from "../manipulator/index.js";
import constants from "../constants/builderConstants.js";
import select from "@inquirer/select";
import input from "@inquirer/input";

const relationFilesBuilder = async () => {
    const relation = await select({
        ...constants.createRelation.relationType,
    });
    const foreignTable = await input({
        ...constants.createRelation.foreignTable,
    });

    if (relation === "OneToOne") {
    } else if (relation === "OneToMany") {
    } else if (relation === "ManyToOne") {
    }
};

const relationsBuilder = async () => {
    await inquirer
        .prompt([constants.createRelation.newRelation])
        .then(async (answers) => {
            if (!answers.newRelation) return;

            await relationFilesBuilder();
            await relationsBuilder();
        });
};

/**
 * This function will be fired by the --create-relation option
 */
const createRelationBuilder = async (manipulator: Manipulator) => {
    inquirer.prompt([constants.shared.overwrite([])]).then(async (answers) => {
        if (!answers.overwrite) return;

        await relationsBuilder();
    });
};

export default createRelationBuilder;
