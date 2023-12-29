import { CloneTemplate } from "../../types/cloneTemplate.js";
import { InjectTemplate } from "../../types/injectTemplate.js";

const installInitCloning = (): CloneTemplate[] => [
    {
        signature: "memo.json",
        target: "base/others/memo-json.txt",
        destination: ".",
        newFileName: "memo.json",
    },
];

const installInitInjection = (): InjectTemplate[] => [
    {
        signature: ".gitignore",
        injectable: ".gitignore",
        additions: [
            {
                keyword: "*",
                addition: {
                    base: "memo.json\n\n",
                    additionIsFile: false,
                },
            },
        ],
    },
];

export { installInitCloning, installInitInjection };
