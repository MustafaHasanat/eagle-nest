import Manipulator from "manipulator/index.js";
export default class CliBuilder {
    constructor(manipulator: Manipulator);
    manipulator: Manipulator;
    createMain: (manipulator: Manipulator) => Promise<void>;
    createLandingPage: (manipulator: Manipulator) => Promise<void>;
    createAppFiles: (manipulator: Manipulator) => Promise<void>;
    database: (manipulator: Manipulator) => Promise<void>;
    createTable: (manipulator: Manipulator) => Promise<void>;
    createColumn: (manipulator: Manipulator) => Promise<void>;
    createRelation: (manipulator: Manipulator) => Promise<void>;
}
