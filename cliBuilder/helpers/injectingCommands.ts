import { InjectTemplate } from "../../types/injectTemplate.js";

interface DatabaseProps {
    appModuleLocation: string;
    dest: string;
}

interface CreateTableProps {
    paths: {
        entitiesPath: string;
    };
    nameVariants: {
        camelCaseName: string;
        upperCaseName: string;
    };
}

export default {
    database: ({
        appModuleLocation,
        dest,
    }: DatabaseProps): InjectTemplate[] => [
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

    createTable: ({
        paths: { entitiesPath },
        nameVariants: { camelCaseName, upperCaseName },
    }: CreateTableProps): InjectTemplate[] => {
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
