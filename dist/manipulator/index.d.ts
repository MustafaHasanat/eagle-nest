/**
 * This class has the required tools for creating and updating files in the project
 */
export default class Manipulator {
    cloneTemplates: (files: import("../types/cloneTemplate.js").default[]) => Promise<boolean>;
    injectTemplates: (files: import("../types/injectTemplate.js").InjectTemplate[]) => Promise<boolean>;
}
