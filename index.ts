#! /usr/bin/env node
"use strict";

import { Command } from "commander";
import Receiver from "./receiver/index.js";
import constants from "./constants/appConstants";
import CliBuilder from "./cliBuilder/index";
import Manipulator from "./manipulator/index";

const app = new Command();
const options = app.opts();
const manipulator = new Manipulator();
const builder = new CliBuilder(manipulator);
const receiver = new Receiver(app, options, manipulator, builder);

const { cm, clp, caf, ct, db, cc, cr } = constants.options;

app.version(constants.version)
    .description(constants.description)
    .option(cm.flags, cm.desc)
    .option(clp.flags, clp.desc)
    .option(caf.flags, caf.desc)
    .option(ct.flags, ct.desc)
    .option(db.flags, db.desc)
    .option(cc.flags, cc.desc)
    .option(cr.flags, cr.desc)
    // .alias("createMain")
    .action(receiver.action)
    .parse(process.argv);
