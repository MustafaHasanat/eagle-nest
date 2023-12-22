import { CloneTemplate } from "../../../types/cloneTemplate.js";
import { DatabaseProps } from "../../../interfaces/builder.js";
import { InjectTemplate } from "../../../types/injectTemplate.js";

const createDatabaseCloning = (
    entitiesDest: string,
    enumsDest: string
): CloneTemplate[] => [
    {
        target: "templates/base/typescript/db/entities-file.txt",
        destination: entitiesDest,
        newFileName: "index.ts",
    },
    {
        target: "templates/base/typescript/enum/tables-columns.txt",
        destination: enumsDest,
        newFileName: "tables-columns.enum.ts",
    },
];

const createDatabaseInjection = ({
    appModuleDest,
    envLocation,
    pathToEntities,
}: DatabaseProps): InjectTemplate[] => [
    {
        injectable: appModuleDest,
        additions: [
            {
                addition: {
                    base: "templates/components/typescript/db/config.txt",
                },
                keyword: "// ===== configs =====",
            },
            {
                addition: {
                    base: "templates/components/typescript/db/imports.txt",
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
