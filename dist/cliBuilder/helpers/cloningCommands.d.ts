import CloneTemplate from "../../types/cloneTemplate.js";
interface CreateTableProps {
    paths: {
        entitiesPath: string;
        dtoPath: string;
        enumPath: string;
        schemasPath: string;
    };
    nameVariants: {
        camelCaseName: string;
        upperCaseName: string;
        pluralLowerCaseName: string;
        pluralUpperCaseName: string;
    };
}
declare const _default: {
    createMain: (mainDist: string, name: string) => CloneTemplate[];
    createLandingPage: (dest: string, name: string) => CloneTemplate[];
    createAppFiles: (dest: string) => CloneTemplate[];
    database: (dest: string) => CloneTemplate[];
    createTable: ({ paths: { entitiesPath, dtoPath, enumPath, schemasPath }, nameVariants: { camelCaseName, upperCaseName, pluralLowerCaseName, pluralUpperCaseName, }, }: CreateTableProps) => CloneTemplate[];
};
export default _default;
