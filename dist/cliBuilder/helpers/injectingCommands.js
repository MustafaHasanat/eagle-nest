export default {
    database: ({ appModuleLocation, dest, }) => [
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
                            newString: dest,
                        },
                    ],
                },
            ],
        },
        {
            injectable: dest,
            actions: [
                {
                    target: "templates/components/others/db-env.txt",
                    keyword: "*",
                },
            ],
        },
    ],
    createTable: ({ paths: { entitiesPath }, nameVariants: { camelCaseName, upperCaseName }, }) => {
        return [
            {
                injectable: entitiesPath,
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
        ];
    },
};
//# sourceMappingURL=injectingCommands.js.map