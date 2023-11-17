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
        console.log(this.options);
        // if there was no option selected, show the logo with the instructions for -h
        if (Object.keys(this.options).length === 0) {
            console.log(figlet.textSync("Eagle Nest"));
            this.app.outputHelp();
        }
        // selection for creating the main.ts file
        if (this.options.createMain) {
            await this.installer.installPackages([
            // "@nestjs/core",
            // "@nestjs/platform-express",
            // "@nestjs/swagger",
            ]);
            await this.builder.createMain(this.manipulator);
        }
        // selection for creating the landing page
        if (this.options.createLandingPage) {
            await this.builder.createLandingPage(this.manipulator);
        }
        // selection for creating the app files (module, service, controller, ...)
        if (this.options.createAppFiles) {
            await this.builder.createAppFiles(this.manipulator);
        }
        // selection for configuring the database
        if (this.options.database) {
            await this.builder.database(this.manipulator);
        }
        // selection for creating a new table files
        if (this.options.createTable) {
            await this.builder.createTable(this.manipulator);
        }
    };
}
//# sourceMappingURL=index.js.map