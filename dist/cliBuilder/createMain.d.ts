import Manipulator from "../manipulator/index.js";
/**
 * This function will be fired by the --create-main option
 */
declare const createMainBuilder: (manipulator: Manipulator) => Promise<void>;
export default createMainBuilder;
