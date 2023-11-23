import Manipulator from "../manipulator/index.js";
/**
 * This function will be fired by the --create-landing-page option
 */
declare const createLandingPageBuilder: (manipulator: Manipulator) => Promise<void>;
export default createLandingPageBuilder;
