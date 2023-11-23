import Manipulator from "../manipulator/index.js";
/**
 * This function will be fired by the --create-column option
 */
declare const createColumnBuilder: (manipulator: Manipulator) => Promise<void>;
export default createColumnBuilder;
