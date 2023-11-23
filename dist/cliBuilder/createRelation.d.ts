import Manipulator from "../manipulator/index.js";
/**
 * This function will be fired by the --create-relation option
 */
declare const createRelationBuilder: (manipulator: Manipulator) => Promise<void>;
export default createRelationBuilder;
