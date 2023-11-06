import Utils from "../utils/index.js";
import Constants from "../constants/index.js";
import createMainBuilder from "./createMain.js";
import createLandingPageBuilder from "./createLandingPage.js";
import createAppFilesBuilder from "./createAppFiles.js";
import databaseBuilder from "./database.js";
import createTableBuilder from "./createTable.js";

export default class CliBuilder {
    constructor(constants: Constants, utils: Utils) {
        this.constants = constants;
        this.utils = utils;
    }
    constants;
    utils;
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
