import constants from "../../constants/builderConstants.js";
import select from "@inquirer/select";
import input from "@inquirer/input";
import checkbox from "@inquirer/checkbox";
import inquirer from "inquirer";
const tableRelationFilesBuilder = async () => {
    const relation = await select({
        ...constants.createTable.relationType,
    });
    const foreignTable = await input({
        ...constants.createTable.foreignTable,
    });
    if (relation === "OneToOne") {
    }
    else if (relation === "OneToMany") {
    }
    else if (relation === "ManyToOne") {
    }
};
const tableRelationsBuilder = async () => {
    await inquirer
        .prompt([constants.createTable.newRelation])
        .then(async (answers) => {
        if (!answers.newRelation)
            return;
        await tableRelationFilesBuilder();
        await tableRelationsBuilder();
    });
};
const columnFilesBuilder = async (tableName, destination) => {
    const columnName = await input({
        ...constants.createTable.columnName,
    });
    const columnType = await select({
        ...constants.createTable.columnType,
    });
    const columnAttributes = await checkbox({
        ...constants.createTable.columnAttributes,
    });
    await tableRelationsBuilder();
};
const columnBuilder = async (tableName, destination) => {
    await inquirer
        .prompt([constants.createTable.newColumn])
        .then(async (answers) => {
        if (!answers.newField)
            return;
        await columnFilesBuilder(tableName, destination);
        await columnBuilder(tableName, destination);
    });
};
export { columnBuilder };
//# sourceMappingURL=tableHelpers.js.map