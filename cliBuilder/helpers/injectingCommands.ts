import { join } from "path";
import { InjectTemplate } from "../../types/injectTemplate.js";

interface DatabaseProps {
    appModuleLocation: string;
    envLocation: string;
    pathToEntities: string;
}

interface CreateTableProps {
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

export default {
    createMain: (envLocation: string): InjectTemplate[] => [
        {
            injectable: envLocation,
            actions: [
                {
                    target: "/templates/components/others/app-env.txt",
                    keyword: "*",
                },
            ],
        },
    ],

    database: ({
        appModuleLocation,
        envLocation,
        pathToEntities,
    }: DatabaseProps): InjectTemplate[] => [
        {
            injectable: appModuleLocation,
            actions: [
                {
                    target: "templates/components/typescript/app/db/config.txt",
                    keyword: "imports: [",
                },
                {
                    target: "templates/components/typescript/app/db/imports.txt",
                    keyword: "*",
                    replacements: [
                        {
                            oldString: "PATH_TO_ENTITIES",
                            newString: pathToEntities,
                        },
                    ],
                },
            ],
        },
        {
            injectable: envLocation,
            actions: [
                {
                    target: "templates/components/others/db-env.txt",
                    keyword: "*",
                },
            ],
        },
    ],

    createTable: ({
        paths: { entitiesPath, appModulePath, enumsPath },
        nameVariants: {
            camelCaseName,
            upperCaseName,
            pluralUpperCaseName,
            pluralLowerCaseName,
        },
    }: CreateTableProps): InjectTemplate[] => {
        return [
            {
                injectable: join(entitiesPath, "index.ts"),
                actions: [
                    {
                        target: `import { ${upperCaseName} } from "./${camelCaseName}.entity";\n`,
                        targetIsFile: false,
                        keyword: "*",
                    },
                    {
                        target: `\n${upperCaseName},\n`,
                        targetIsFile: false,
                        keyword: "entities = [",
                    },
                ],
            },
            {
                injectable: join(appModulePath, "app.module.ts"),
                actions: [
                    {
                        target: `import { ${pluralUpperCaseName}Module } from "schemas/${pluralLowerCaseName}/${pluralLowerCaseName}.module";\n`,
                        targetIsFile: false,
                        keyword: "*",
                    },
                    {
                        target: `\n${pluralUpperCaseName}Module,\n`,
                        targetIsFile: false,
                        keyword: "imports: [",
                    },
                ],
            },
            {
                injectable: join(enumsPath, "tables-columns.enum.ts"),
                actions: [
                    {
                        target: `enum ${upperCaseName}Fields {}\n\n`,
                        targetIsFile: false,
                        keyword: "*",
                    },
                    {
                        target: `\n, ${upperCaseName}Fields\n`,
                        targetIsFile: false,
                        keyword: "export { AllTablesColumns",
                    },
                ],
            },
        ];
    },
};
