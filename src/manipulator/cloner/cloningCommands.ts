import { join } from "path";
import CloneTemplate from "../../types/cloneTemplate.js";

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
    createMain: (mainDest: string, name: string): CloneTemplate[] => [
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
    ],

    createLandingPage: (mainDest: string, name: string): CloneTemplate[] => [
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
    ],

    createAppFiles: (
        mainDest: string,
        rolesGuard: boolean
    ): CloneTemplate[] => {
        const result = [
            {
                target: "templates/base/typescript/app/module-file.txt",
                destination: mainDest,
                newFileName: "app.module.ts",
            },
            {
                target: "templates/base/typescript/app/controller-file.txt",
                destination: mainDest,
                newFileName: "app.controller.ts",
            },
            {
                target: "templates/base/typescript/app/service-file.txt",
                destination: mainDest,
                newFileName: "app.service.ts",
            },
        ];
        if (rolesGuard)
            result.push(
                ...[
                    {
                        target: "templates/base/typescript/jwt/auth-guard-file.txt",
                        destination: join(mainDest, "guards"),
                        newFileName: "user-auth.guard.ts",
                    },
                    {
                        target: "src/templates/base/typescript/enum/user-role.txt",
                        destination: join(mainDest, "enums"),
                        newFileName: "user-role.enum.ts",
                    },
                ]
            );

        return result;
    },

    database: (entitiesDist: string, enumsDist: string): CloneTemplate[] => [
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
                destination: entitiesPath,
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
                destination: dtoPath,
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
                destination: dtoPath,
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
                destination: schemasPath,
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
                destination: schemasPath,
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
                destination: schemasPath,
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
