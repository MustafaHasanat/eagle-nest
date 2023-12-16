import { CloneTemplate } from "../../types/cloneTemplate.js";
import { DatabaseProps } from "../../interfaces/cliBuilder.js";
import { InjectTemplate } from "../../types/injectTemplate.js";

const createDatabaseCloning = (
    entitiesDist: string,
    enumsDist: string
): CloneTemplate[] => [
    {
        target: "templates/base/typescript/db/entities-file.txt",
        destination: entitiesDist,
        newFileName: "index.ts",
    },
    {
        target: "templates/base/typescript/enum/tables-columns.txt",
        destination: enumsDist,
        newFileName: "tables-columns.enum.ts",
    },
];

const createDatabaseInjection = ({
    appModuleLocation,
    envLocation,
    pathToEntities,
}: DatabaseProps): InjectTemplate[] => [
    {
        injectable: appModuleLocation,
        additions: [
            {
                addition: {
                    base: "templates/components/typescript/app/db/config.txt",
                },
                keyword: "imports: [",
            },
            {
                addition: {
                    base: "templates/components/typescript/app/db/imports.txt",
                },
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
        additions: [
            {
                addition: {
                    base: "templates/components/others/db-env.txt",
                },
                keyword: "*",
            },
        ],
    },
];

export { createDatabaseInjection, createDatabaseCloning };
