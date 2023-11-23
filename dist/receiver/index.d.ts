import { Command, OptionValues } from "commander";
import CliBuilder from "../cliBuilder/index.js";
import { Installer } from "./installer.js";
import Manipulator from "../manipulator/index.js";
/**
 * A class to control the main entry of the tool
 * here we decide what action should be made based on the user's interactions
 */
export default class Receiver {
    constructor(app: Command, options: OptionValues, manipulator: Manipulator, builder: CliBuilder);
    app: Command;
    options: OptionValues;
    manipulator: Manipulator;
    builder: CliBuilder;
    installer: Installer;
    filename: string;
    dirname: string;
    action: () => Promise<void>;
}
