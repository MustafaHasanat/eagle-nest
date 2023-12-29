import { CloneTemplate } from "../../../types/cloneTemplate.js";

const createLandingPageCloning = (
    mainDest: string,
    name: string
): CloneTemplate[] => [
    {
        signature: "public/index.html",
        target: "base/html/landing-page.txt",
        destination: mainDest,
        newFileName: "index.html",
        replacements: [
            {
                oldString: "PROJECT_NAME",
                newString: name,
            },
        ],
    },
    {
        signature: "public/styles.css",
        target: "base/css/landing-page.txt",
        destination: mainDest,
        newFileName: "styles.css",
    },
];

export { createLandingPageCloning };
