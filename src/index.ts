#! /usr/bin/env node
"use strict";

import { Command } from "commander";
import constants from "./utils/constants/appConstants.js";
import createAction from "./actions/createAction.js";
import { isNodeProject } from "./middlewares/isNodeProject.js";
import defaultAction from "./actions/defaultAction.js";
import newAction from "./actions/newAction.js";
import initAction from "./actions/initAction.js";
import { CreateArgument } from "./enums/createArgument.js";

const app = new Command();
const options = app.opts();

app.version(constants.version).description(constants.description);

app.command("init")
    .description("Install Nest.js globally.")
    .action(() => {
        initAction();
    });

app.command("new <name>")
    .description("Initialize a new Nest project.")
    .action((projectName: string) => {
        newAction(projectName);
    });

app.command("create <files-set>")
    .description(
        "Create the necessary files and directories for the selected 'files-set'."
    )
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
