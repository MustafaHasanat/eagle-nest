import figlet from "figlet";
import { Command, OptionValues } from "commander";
import path from "path";
import { fileURLToPath } from "url";
import CliBuilder from "../cliBuilder/index.js";
import Constants from "../constants/index.js";
import Utils from "../utils/index.js";
import { Installer } from "./installer.js";

/**
 * A class to control the main entry of the tool
 * here we decide what action should be made based on the user's interactions
 */
export default class Receiver {
    constructor(
        app: Command,
        options: OptionValues,
        constants: Constants,
        utils: Utils,
        builder: CliBuilder
    ) {
        this.app = app;
        this.options = options;
        this.constants = constants;
        this.utils = utils;
        this.builder = builder;
        this.installer = new Installer(constants);
    }
    app;
    options;
    constants;
    utils;
    builder;
    installer;
    filename = fileURLToPath(import.meta.url);
    dirname = path.dirname(this.filename);

    // receiver prompt initializer
    action = async (): Promise<void> => {
        console.log(this.options);
        // if there was no option selected, show the logo with the instructions for -h
        if (Object.keys(this.options).length === 0) {
            console.log(figlet.textSync("Eagle Nest"));
            this.app.outputHelp();
        }
        // selection for creating the main.ts file
        if (this.options.createMain) {
            await this.installer.installPackages([
                "@nestjs/core",
                "@nestjs/platform-express",
                "@nestjs/swagger",
            ]);
            await this.builder.createMain();
        }
        // selection for configuring the database
        if (this.options.createMain) {
            // await this.builder.createMain();
        }
    };
}
