import { QuestionCollection } from "inquirer";

// builder constants' interfaces ----------------------------------------------------

export interface CollectionProps {
    [questionName: string]: QuestionCollection<any>;
}

export interface BuilderConstantsProps {
    createMain: CollectionProps;
    createLandingPage: CollectionProps;
    createAppFiles: CollectionProps;
    database: CollectionProps;
    createTable: CollectionProps;
    createColumn: {
        newColumn: QuestionCollection<any>;
        tableName: QuestionCollection<any>;
        mainDist: QuestionCollection<any>;
        columnName: QuestionCollection<any>;
        columnType: QuestionCollection<any>;
        columnProperties: QuestionCollection<any>;
        columnDecorators: QuestionCollection<any>;
    };
    createRelation: {
        newRelation: QuestionCollection<any>;
        mainDist: QuestionCollection<any>;
        relationType: QuestionCollection<any>;
        tables: QuestionCollection<any>;
    };
    shared: { overwrite: (files: string[]) => QuestionCollection<any> };
}