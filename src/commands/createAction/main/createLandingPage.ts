import { CloneTemplate } from "types/cloneTemplate.js";

const createLandingPageCloning = (
    mainDest: string,
    name: string
): CloneTemplate[] => [
    {
        target: "templates/base/html/landing-page.txt",
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
        target: "templates/base/css/landing-page.txt",
        destination: mainDest,
        newFileName: "styles.css",
    },
];

export { createLandingPageCloning };
