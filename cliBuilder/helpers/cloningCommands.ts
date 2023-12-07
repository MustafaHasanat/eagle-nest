import CloneTemplate from "../../types/cloneTemplate";

interface CreateTableProps {
    paths: {
        entitiesPath: string;
        dtoPath: string;
        schemasPath: string;
    };
    nameVariants: {
        camelCaseName: string;
        upperCaseName: string;
        pluralLowerCaseName: string;
        pluralUpperCaseName: string;
    };
}

export default {
    createMain: (mainDist: string, name: string): CloneTemplate[] => [
        {
            target: "/templates/base/typescript/app/main-file.txt",
            dest: mainDist,
            newFileName: "main.ts",
            replacements: [
                {
                    oldString: "PROJECT_NAME",
                    newString: name,
                },
            ],
        },
    ],
    createLandingPage: (dest: string, name: string): CloneTemplate[] => [
        {
            target: "templates/base/html/landing-page.txt",
            dest,
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
            dest,
            newFileName: "styles.css",
        },
    ],
    createAppFiles: (dest: string): CloneTemplate[] => [
        {
            target: "templates/base/typescript/app/module-file.txt",
            dest,
            newFileName: "app.module.ts",
        },
        {
            target: "templates/base/typescript/app/controller-file.txt",
            dest,
            newFileName: "app.controller.ts",
        },
        {
            target: "templates/base/typescript/app/service-file.txt",
            dest,
            newFileName: "app.service.ts",
        },
    ],
    database: (entitiesDist: string, enumsDist: string): CloneTemplate[] => [
        {
            target: "templates/base/typescript/db/entities-file.txt",
            dest: entitiesDist,
            newFileName: "index.ts",
        },
        {
            target: "templates/base/typescript/enum/tables-columns.txt",
            dest: enumsDist,
            newFileName: "tables-columns.enum.ts",
        },
    ],
    createTable: ({
        paths: { entitiesPath, dtoPath, schemasPath },
        nameVariants: {
            camelCaseName,
            upperCaseName,
            pluralLowerCaseName,
            pluralUpperCaseName,
        },
    }: CreateTableProps): CloneTemplate[] => {
        return [
            {
                target: "templates/base/typescript/db/entity.txt",
                dest: entitiesPath,
                newFileName: camelCaseName + ".entity.ts",
                replacements: [
                    {
                        oldString: "TABLE_UPPER_NAME",
                        newString: upperCaseName,
                    },
                ],
            },
            {
                target: "templates/base/typescript/dto/create-dto.txt",
                dest: dtoPath,
                newFileName: `create-${camelCaseName}.dto.ts`,
                replacements: [
                    {
                        oldString: "TABLE_UPPER_NAME",
                        newString: upperCaseName,
                    },
                ],
            },
            {
                target: "templates/base/typescript/dto/update-dto.txt",
                dest: dtoPath,
                newFileName: `update-${camelCaseName}.dto.ts`,
                replacements: [
                    {
                        oldString: "TABLE_UPPER_NAME",
                        newString: upperCaseName,
                    },
                    {
                        oldString: "TABLE_LOWER_NAME",
                        newString: camelCaseName,
                    },
                ],
            },
            {
                target: "templates/base/typescript/table/module-file.txt",
                dest: schemasPath,
                newFileName: `${pluralLowerCaseName}.module.ts`,
                replacements: [
                    {
                        oldString: "TABLE_LOWER_NAME",
                        newString: camelCaseName,
                    },
                    {
                        oldString: "TABLE_UPPER_NAME",
                        newString: upperCaseName,
                    },
                    {
                        oldString: "TABLE_PLURAL_UPPER_NAME",
                        newString: pluralUpperCaseName,
                    },
                    {
                        oldString: "TABLE_PLURAL_LOWER_NAME",
                        newString: pluralLowerCaseName,
                    },
                ],
            },
            {
                target: "templates/base/typescript/table/controller-file.txt",
                dest: schemasPath,
                newFileName: `${pluralLowerCaseName}.controller.ts`,
                replacements: [
                    {
                        oldString: "TABLE_UPPER_NAME",
                        newString: upperCaseName,
                    },
                    {
                        oldString: "TABLE_LOWER_NAME",
                        newString: camelCaseName,
                    },
                    {
                        oldString: "TABLE_PLURAL_UPPER_NAME",
                        newString: pluralUpperCaseName,
                    },
                    {
                        oldString: "TABLE_PLURAL_LOWER_NAME",
                        newString: pluralLowerCaseName,
                    },
                ],
            },
            {
                target: "templates/base/typescript/table/service-file.txt",
                dest: schemasPath,
                newFileName: `${pluralLowerCaseName}.service.ts`,
                replacements: [
                    {
                        oldString: "TABLE_UPPER_NAME",
                        newString: upperCaseName,
                    },
                    {
                        oldString: "TABLE_LOWER_NAME",
                        newString: camelCaseName,
                    },
                    {
                        oldString: "TABLE_PLURAL_UPPER_NAME",
                        newString: pluralUpperCaseName,
                    },
                    {
                        oldString: "TABLE_PLURAL_LOWER_NAME",
                        newString: pluralLowerCaseName,
                    },
                ],
            },
        ];
    },
};
