import Manipulator from "../manipulator/index.js";
/**
 * This function will be fired by the --create-table option
 */
declare const createTableBuilder: (manipulator: Manipulator) => Promise<void>;
export default createTableBuilder;
