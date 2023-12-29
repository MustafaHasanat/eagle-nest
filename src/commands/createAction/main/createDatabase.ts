import { CloneTemplate } from "../../../types/cloneTemplate.js";
import { DatabaseProps } from "../../../interfaces/builder.js";
import { InjectTemplate } from "../../../types/injectTemplate.js";

const createDatabaseCloning = (
    entitiesDest: string,
    enumsDest: string
): CloneTemplate[] => [
    {
        target: "base/typescript/db/entities-file.txt",
        destination: entitiesDest,
        newFileName: "index.ts",
    },
    {
        target: "base/typescript/enum/tables-data.txt",
        destination: enumsDest,
        newFileName: "tables-data.enum.ts",
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
                    base: "components/typescript/db/config.txt",
                },
                keyword: "// ===== configs =====",
            },
            {
                addition: {
                    base: "components/typescript/db/imports.txt",
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
                    base: "components/others/db-env.txt",
                },
                keyword: "*",
            },
        ],
    },
];

export { createDatabaseInjection, createDatabaseCloning };
