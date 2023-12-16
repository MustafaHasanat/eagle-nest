import { Command } from "commander";
import constants from "../utils/constants/appConstants.js";
import createAction from "../actions/createAction.js";
import { isNodeProject } from "../middlewares/isNodeProject.js";
import defaultAction from "../actions/defaultAction.js";
import installAction from "../actions/installAction.js";
import { CreateArgument } from "../enums/createArgument.js";

export default function InitAction(app: Command) {
    const options = app.opts();

    app.version(constants.version).description(constants.description);

    app.command(constants.commands.install.action)
        .description(constants.commands.install.description)
        .action(async () => {
            await installAction();
        });

    app.command(constants.commands.create.action)
        .description(constants.commands.create.description)
        .action(async (filesSet: CreateArgument) => {
            isNodeProject();
            await createAction(filesSet);
        });

    app.action(() => {
        defaultAction(app, options);
    });
    // .option(cr.flags, cr.desc)

    // Parse the command-line arguments
    app.parse(process.argv);
}
