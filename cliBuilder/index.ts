import Manipulator from "manipulator/index";
import createMainBuilder from "./createMain";
import createLandingPageBuilder from "./createLandingPage";
import createAppFilesBuilder from "./createAppFiles";
import databaseBuilder from "./database";
import createTableBuilder from "./createTable";
import createRelationBuilder from "./createRelation";
import createColumnBuilder from "./createColumn";

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
