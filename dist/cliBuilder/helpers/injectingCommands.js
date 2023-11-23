import { join } from "path";
export default {
    createMain: (envLocation) => [
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
    database: ({ appModuleLocation, envLocation, pathToEntities, }) => [
        {
            injectable: appModuleLocation,
            actions: [
                {
                    target: "templates/components/typescript/app-module/db/config.txt",
                    keyword: "imports: [",
                },
                {
                    target: "templates/components/typescript/app-module/db/imports.txt",
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
    createTable: ({ paths: { entitiesPath, appModulePath }, nameVariants: { camelCaseName, upperCaseName, pluralUpperCaseName, pluralLowerCaseName, }, }) => {
        return [
            {
                injectable: join(entitiesPath, "entities.ts"),
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
                        target: `import { ${pluralUpperCaseName}Module } from "schemas/${pluralLowerCaseName}/${pluralLowerCaseName}.module.ts";\n`,
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
        ];
    },
};
//# sourceMappingURL=injectingCommands.js.map