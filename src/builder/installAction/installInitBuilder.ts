import inquirer from "inquirer";
import {
    installInitCloning,
    installInitInjection,
} from "../../commands/installAction/initialPack.js";
import manipulator from "../../manipulator/index.js";
import constants from "../../utils/constants/builderConstants.js";

export default async function installInitBuilder() {
    inquirer
        .prompt([constants.shared.overwrite(["memo.json", ".gitignore"])])
        .then(async ({ overwrite }) => {
            await manipulator({
                cloningCommands: installInitCloning(),
                injectionCommands: installInitInjection(),
                overwrite,
            });
        });
}
