import { QuestionCollection } from "inquirer";

// builder constants' interfaces ----------------------------------------------------

export interface CollectionProps {
    [questionName: string]: QuestionCollection<any>;
}

export interface BuilderConstantsProps {
    createMain: CollectionProps;
    createLandingPage: CollectionProps;
    createAppFiles: {
        mainDest: QuestionCollection<any>;
        envDest: QuestionCollection<any>;
        rolesGuard: QuestionCollection<any>;
    };
    createDatabase: CollectionProps;
    createTable: {
        tableName: QuestionCollection<any>;
        isSpecial: ([...any]) => QuestionCollection<any>;
        mainDist: QuestionCollection<any>;
    };
    createColumn: {
        newColumn: QuestionCollection<any>;
        tableName: QuestionCollection<any>;
        mainDist: QuestionCollection<any>;
        columnName: QuestionCollection<any>;
        columnType: QuestionCollection<any>;
        columnProperties: QuestionCollection<any>;
        columnDecorators: QuestionCollection<any>;
        stringLength: QuestionCollection<any>;
    };
    createRelation: {
        newRelation: QuestionCollection<any>;
        fieldName: QuestionCollection<any>;
        mainDist: QuestionCollection<any>;
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
