import { CloneTemplate } from "../../../types/cloneTemplate.js";
import { InjectTemplate } from "../../../types/injectTemplate.js";

const createMainCloning = (mainDest: string, name: string): CloneTemplate[] => [
    {
        target: "/templates/base/typescript/app/main-file.txt",
        destination: mainDest,
        newFileName: "main.ts",
        replacements: [
            {
                oldString: "PROJECT_NAME",
                newString: name,
            },
        ],
    },
];

const createMainInjection = (envLocation: string): InjectTemplate[] => [
    {
        injectable: envLocation,
        additions: [
            {
                addition: {
                    base: "/templates/components/others/app-env.txt",
                },
                keyword: "*",
            },
        ],
    },
];

export { createMainCloning, createMainInjection };
