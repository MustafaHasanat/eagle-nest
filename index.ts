#! /usr/bin/env node
"use strict";

import { Command } from "commander";
import Receiver from "./receiver/index.js";
import Constants from "./constants/index.js";
import Utils from "./utils/index.js";
import CliBuilder from "./cliBuilder/index.js";

const app = new Command();
const options = app.opts();
const constants = new Constants();
const utils = new Utils();
const builder = new CliBuilder(constants, utils);
const receiver = new Receiver(app, options, constants, utils, builder);

const { cm, clp, caf } = constants.app.options;

app.version(constants.app.version)
    .description(constants.app.description)
    .option(cm.flags, cm.desc)
    .option(clp.flags, clp.desc)
    .option(caf.flags, caf.desc)
    .alias("createMain")
    .action(receiver.action)
    .parse(process.argv);
