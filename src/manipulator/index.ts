import cloneTemplates from "./cloner/cloneTemplates.js";
import injectTemplates from "./injector/injectTemplates.js";

/**
 * This class has the required tools for creating and updating files in the project
 */
export default class Manipulator {
    cloneTemplates = cloneTemplates
    injectTemplates = injectTemplates
}
