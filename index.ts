#! /usr/bin/env node
"use strict";

import { Command } from "commander";
import Receiver from "./receiver/index.js";
import constants from "./constants/appConstants.js";
import CliBuilder from "./cliBuilder/index.js";
import Manipulator from "./manipulator/index.js";

const app = new Command();
const options = app.opts();
const manipulator = new Manipulator();
const builder = new CliBuilder(manipulator);
const receiver = new Receiver(app, options, manipulator, builder);

const { cm, clp, caf, ct, db } = constants.options;

app.version(constants.version)
    .description(constants.description)
    .option(cm.flags, cm.desc)
    .option(clp.flags, clp.desc)
    .option(caf.flags, caf.desc)
    .option(ct.flags, ct.desc)
    .option(db.flags, db.desc)
    .alias("createMain")
    .action(receiver.action)
    .parse(process.argv);
