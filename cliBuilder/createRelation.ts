import inquirer from "inquirer";
import Manipulator from "../manipulator/index.js";
import constants from "../constants/builderConstants.js";

/**
 * This function will be fired by the --create-relation option
 */
const createRelationBuilder = async (manipulator: Manipulator) => {
    inquirer.prompt([constants.shared.overwrite([])]).then(async (answers) => {
        if (!answers.overwrite) return;
    });
};

export default createRelationBuilder;
