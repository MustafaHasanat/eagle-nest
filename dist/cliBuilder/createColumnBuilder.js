import inquirer from "inquirer";
import constants from "../constants/builderConstants.js";
import select from "@inquirer/select";
import input from "@inquirer/input";
import checkbox from "@inquirer/checkbox";
const columnFilesBuilder = async () => {
    const columnName = await input(constants.createColumn.columnName);
    const columnType = await select(constants.createColumn.columnType);
    const columnAttributes = await checkbox({
        ...constants.createColumn.columnAttributes,
    });
};
const columnBuilder = async () => {
    await inquirer
        .prompt([constants.createColumn.newColumn])
        .then(async (answers) => {
        if (!answers.newField)
            return;
        await columnFilesBuilder();
        await columnBuilder();
    });
};
/**
 * This function will be fired by the --create-column option
 */
const createColumnBuilder = async (manipulator) => {
    inquirer.prompt([constants.shared.overwrite([])]).then(async (answers) => {
        if (!answers.overwrite)
            return;
        await columnBuilder();
    });
};
export default createColumnBuilder;
//# sourceMappingURL=createColumnBuilder.js.map