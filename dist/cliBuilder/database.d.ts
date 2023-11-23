import Manipulator from "../manipulator/index.js";
/**
 * This function will be fired by the --database option
 */
declare const databaseBuilder: (manipulator: Manipulator) => Promise<void>;
export default databaseBuilder;
