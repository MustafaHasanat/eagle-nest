import figlet from "figlet";
import { Command, OptionValues } from "commander";
import path from "path";
import { fileURLToPath } from "url";
import CliBuilder from "../cliBuilder/index.js";
import { Installer } from "./installer.js";
import Manipulator from "../manipulator/index.js";
import { execSync } from "child_process";
import { logCliError } from "../utils/logCliDecorators.js";

/**
 * A class to control the main entry of the tool
 * here we decide what action should be made based on the user's interactions
 */
export default class Receiver {
    constructor(
        app: Command,
        options: OptionValues,
        manipulator: Manipulator,
        builder: CliBuilder
    ) {
        this.app = app;
        this.options = options;
        this.manipulator = manipulator;
        this.builder = builder;
    }
    app;
    options;
    manipulator;
    builder;
    filename = fileURLToPath(import.meta.url);
    dirname = path.dirname(this.filename);

    // receiver prompt initializer
    action = async (): Promise<void> => {
        const optionsArray = Object.keys(this.options);
        const isNeedDeps = !["createLandingPage"].includes(optionsArray[0]);

        // check if this is a node project
        const isNodeProject = execSync("ls")
            .toString()
            .split("\n")
            .includes("package.json");
        if (!isNodeProject) {
            logCliError("This is not a Node.js project!", "TOOL MISUSE");
            return;
        }

        // initialize the installer
        const installer = new Installer(isNeedDeps);

        // if there was no option selected, show the logo with the instructions for -h
        if (optionsArray.length === 0) {
            console.log(figlet.textSync("Eagle Nest"));
            this.app.outputHelp();
            console.log("\n\n");
        }
        // selection for creating the main.ts file
        if (this.options.createMain) {
            await installer.installPackages([
                { packageName: "@nestjs/core", commandType: "--save" },
                {
                    packageName: "@nestjs/platform-express",
                    commandType: "--save",
                },
                { packageName: "@nestjs/swagger", commandType: "--save" },
            ]);
            await this.builder.createMain(this.manipulator);
        }
        // selection for creating the landing page
        if (this.options.createLandingPage) {
            await this.builder.createLandingPage(this.manipulator);
        }
        // selection for creating the app files (module, service, controller, ...)
        if (this.options.createAppFiles) {
            await installer.installPackages([
                { packageName: "@nestjs/common", commandType: "--save" },
            ]);
            await this.builder.createAppFiles(this.manipulator);
        }
        // selection for configuring the database
        if (this.options.database) {
            await installer.installPackages([
                { packageName: "@nestjs/config", commandType: "--save" },
                { packageName: "@nestjs/typeorm", commandType: "--save" },
            ]);
            await this.builder.database(this.manipulator);
        }
        // selection for creating a new table files
        if (this.options.createTable) {
            await installer.installPackages([
                { packageName: "typeorm", commandType: "--save" },
                { packageName: "class-validator", commandType: "--save" },
                { packageName: "@nestjs/swagger", commandType: "--save" },
                { packageName: "@nestjs/common", commandType: "--save" },
                { packageName: "@nestjs/typeorm", commandType: "--save" },
                { packageName: "@types/express", commandType: "--save-dev" },
            ]);
            await this.builder.createTable(this.manipulator);
        }
        // selection for creating a new column
        if (this.options.createColumn) {
            await installer.installPackages([
                { packageName: "class-validator", commandType: "--save" },
                { packageName: "typeorm", commandType: "--save" },
            ]);
            await this.builder.createColumn(this.manipulator);
        }
        // selection for creating a new relation
        if (this.options.createRelation) {
            await installer.installPackages([
                { packageName: "@nestjs/swagger", commandType: "--save" },
            ]);
            await this.builder.createRelation(this.manipulator);
        }
    };
}
