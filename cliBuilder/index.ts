import Manipulator from "manipulator/index.js";
import createMainBuilder from "./createMain.js";
import createLandingPageBuilder from "./createLandingPage.js";
import createAppFilesBuilder from "./createAppFiles.js";
import databaseBuilder from "./database.js";
import createTableBuilder from "./createTable.js";
import createRelationBuilder from "./createRelation.js";
import createColumnBuilder from "./createColumnBuilder.js";

export default class CliBuilder {
    constructor(manipulator: Manipulator) {
        this.manipulator = manipulator;
    }
    manipulator;
    // fired by the --create-main option
    createMain = createMainBuilder;
    // fired by the --create-landing-page option
    createLandingPage = createLandingPageBuilder;
    // fired by the --create-app-files option
    createAppFiles = createAppFilesBuilder;
    // fired by the --database option
    database = databaseBuilder;
    // fired by the --create-table option
    createTable = createTableBuilder;
    // fired by the --create-column option
    createColumn = createColumnBuilder;
    // fired by the --create-relation option
    createRelation = createRelationBuilder;
}
