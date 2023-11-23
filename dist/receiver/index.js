import figlet from "figlet";
import path from "path";
import { fileURLToPath } from "url";
import { Installer } from "./installer.js";
/**
 * A class to control the main entry of the tool
 * here we decide what action should be made based on the user's interactions
 */
export default class Receiver {
    constructor(app, options, manipulator, builder) {
        this.app = app;
        this.options = options;
        this.manipulator = manipulator;
        this.builder = builder;
        this.installer = new Installer();
    }
    app;
    options;
    manipulator;
    builder;
    installer;
    filename = fileURLToPath(import.meta.url);
    dirname = path.dirname(this.filename);
    // receiver prompt initializer
    action = async () => {
        // if there was no option selected, show the logo with the instructions for -h
        if (Object.keys(this.options).length === 0) {
            console.log(figlet.textSync("Eagle Nest"));
            this.app.outputHelp();
        }
        // selection for creating the main.ts file
        if (this.options.createMain) {
            await this.installer.installPackages([
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
            await this.installer.installPackages([
                { packageName: "@nestjs/common", commandType: "--save" },
            ]);
            await this.builder.createAppFiles(this.manipulator);
        }
        // selection for configuring the database
        if (this.options.database) {
            await this.installer.installPackages([
                { packageName: "@nestjs/config", commandType: "--save" },
                { packageName: "@nestjs/typeorm", commandType: "--save" },
            ]);
            await this.builder.database(this.manipulator);
        }
        // selection for creating a new table files
        if (this.options.createTable) {
            await this.installer.installPackages([
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
            // await this.installer.installPackages([]);
            await this.builder.createColumn(this.manipulator);
        }
        // selection for creating a new relation
        if (this.options.createRelation) {
            // await this.installer.installPackages([]);
            await this.builder.createRelation(this.manipulator);
        }
    };
}
//# sourceMappingURL=index.js.map