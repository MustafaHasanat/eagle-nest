import { InjectTemplate } from "../../types/injectTemplate.js";
interface DatabaseProps {
    appModuleLocation: string;
    envLocation: string;
    pathToEntities: string;
}
interface CreateTableProps {
    paths: {
        entitiesPath: string;
        appModulePath: string;
    };
    nameVariants: {
        camelCaseName: string;
        upperCaseName: string;
        pluralLowerCaseName: string;
        pluralUpperCaseName: string;
    };
}
declare const _default: {
    createMain: (envLocation: string) => InjectTemplate[];
    database: ({ appModuleLocation, envLocation, pathToEntities, }: DatabaseProps) => InjectTemplate[];
    createTable: ({ paths: { entitiesPath, appModulePath }, nameVariants: { camelCaseName, upperCaseName, pluralUpperCaseName, pluralLowerCaseName, }, }: CreateTableProps) => InjectTemplate[];
};
export default _default;
