import Manipulator from "../manipulator/index.js";
/**
 * This function will be fired by the --create-app-files option
 */
declare const createAppFilesBuilder: (manipulator: Manipulator) => Promise<void>;
export default createAppFilesBuilder;
