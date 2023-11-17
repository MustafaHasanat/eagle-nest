import createMainBuilder from "./createMain.js";
import createLandingPageBuilder from "./createLandingPage.js";
import createAppFilesBuilder from "./createAppFiles.js";
import databaseBuilder from "./database.js";
import createTableBuilder from "./createTable.js";
export default class CliBuilder {
    constructor(manipulator) {
        this.manipulator = manipulator;
    }
    manipulator;
    // fired by the --create-main option
    createMain = createMainBuilder;
    // fired by the --create-landing-page
    createLandingPage = createLandingPageBuilder;
    // fired by the --create-app-files
    createAppFiles = createAppFilesBuilder;
    // fired by the --database
    database = databaseBuilder;
    // fired by the --create-table
    createTable = createTableBuilder;
}
//# sourceMappingURL=index.js.map