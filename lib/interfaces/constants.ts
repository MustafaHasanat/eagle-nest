import { QuestionCollection } from "inquirer";

// builder constants' interfaces ----------------------------------------------------

export interface BuilderConstantsProps {
    createMain: {
        projectName: QuestionCollection<any>;
        mainDest: QuestionCollection<any>;
    };
    createLandingPage: {
        projectName: QuestionCollection<any>;
        publicDir: QuestionCollection<any>;
    };
    createAppFiles: {
        appDest: QuestionCollection<any>;
        rootDir: QuestionCollection<any>;
    };
    createDatabase: {
        rootDir: QuestionCollection<any>;
        appDest: QuestionCollection<any>;
    };
    createTable: {
        tableName: QuestionCollection<any>;
        isSpecial: ([...any]) => QuestionCollection<any>;
        mainDest: QuestionCollection<any>;
    };
    createColumn: {
        newColumn: QuestionCollection<any>;
        tableName: QuestionCollection<any>;
        mainDest: QuestionCollection<any>;
        columnName: QuestionCollection<any>;
        columnType: QuestionCollection<any>;
        columnProperties: QuestionCollection<any>;
        columnDecorators: QuestionCollection<any>;
        stringLength: QuestionCollection<any>;
    };
    createRelation: {
        newRelation: QuestionCollection<any>;
        fieldName: QuestionCollection<any>;
        mainDest: QuestionCollection<any>;
        relationType: QuestionCollection<any>;
        tables: QuestionCollection<any>;
    };
    shared: { overwrite: (files: string[]) => QuestionCollection<any> };
}

// create command interfaces ----------------------------------------------------

export interface CreatorConstantsPros {
    installer: {
        confirmation: (packages: string, count: number) => QuestionCollection;
    };
    neededDeps: {
        [set: string]: PackageType[];
    };
}

export interface PackageType {
    packageName: string;
    commandType: "--save" | "--save-dev";
}

export interface FullDependencies {
    installedDeps: string[];
    neededDeps: PackageType[];
}
