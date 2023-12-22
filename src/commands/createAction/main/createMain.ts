import { CloneTemplate } from "../../../types/cloneTemplate.js";
import { InjectTemplate } from "../../../types/injectTemplate.js";

const createMainCloning = (mainDest: string, name: string): CloneTemplate[] => [
    {
        target: "base/typescript/app/main-file.txt",
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
                keyword: "*",
                addition: {
                    base: "components/others/app-env.txt",
                    conditional: {
                        type: "SUPPOSED_TO_BE_THERE",
                        data: "PORT=8000",
                    },
                },
            },
        ],
    },
];

export { createMainCloning, createMainInjection };
