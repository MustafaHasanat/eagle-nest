// helpers interfaces ----------------------------------------------------

import { InjectTemplate } from "../types/injectTemplate";

export interface DatabaseProps {
    appModuleLocation: string;
    envLocation: string;
    pathToEntities: string;
}

export interface CreateTableProps {
    paths: {
        appModulePath: string;
        entitiesPath: string;
        enumsPath: string;
    };
    nameVariants: {
        camelCaseName: string;
        upperCaseName: string;
        pluralLowerCaseName: string;
        pluralUpperCaseName: string;
    };
}

export interface CreateColumnProps {
    columnData: {
        columnName: string;
        columnType: string;
        entityProperties: string | null;
        decorators: {
            decoratorsValues: string | null;
            decoratorsImports: string | null;
        };
        dtoProperties: string | null;
    };
    paths: {
        entitiesPath: string;
        dtoPath: string;
    };
    nameVariants: {
        camelCaseName: string;
    };
    specialInjections: InjectTemplate[];
}

export interface CreateRelationProps {
    relationType: string;
    entitiesPath: string;
    table1: {
        camelCaseName1: string;
        upperCaseName1: string;
        pluralLowerCaseName1: string;
        pluralUpperCaseName1: string;
        schemasPath1: string;
    };
    table2: {
        camelCaseName2: string;
        upperCaseName2: string;
        pluralLowerCaseName2: string;
        pluralUpperCaseName2: string;
        dtoPath2: string;
        schemasPath2: string;
    };
}
