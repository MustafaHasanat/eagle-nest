export default {
    database: (dest) => [
        {
            target: "templates/base/typescript/db/entities-file.txt",
            dest: dest,
            newFileName: "index.ts",
        },
    ],
    createTable: ({ paths: { entitiesPath, dtoPath, enumPath, schemasPath }, nameVariants: { camelCaseName, upperCaseName, pluralLowerCaseName, pluralUpperCaseName, }, }) => {
        return [
            {
                target: "templates/base/typescript/db/entity.txt",
                dest: entitiesPath,
                newFileName: camelCaseName + ".entity.ts",
                replacements: [
                    {
                        oldString: "TABLE_NAME",
                        newString: upperCaseName,
                    },
                ],
            },
            {
                target: "templates/base/typescript/dto/create-body.txt",
                dest: dtoPath,
                newFileName: `create-${camelCaseName}-body.ts`,
                replacements: [
                    {
                        oldString: "TABLE_NAME",
                        newString: upperCaseName,
                    },
                ],
            },
            {
                target: "templates/base/typescript/dto/create-dto.txt",
                dest: dtoPath,
                newFileName: `create-${camelCaseName}-dto.ts`,
                replacements: [
                    {
                        oldString: "TABLE_NAME",
                        newString: upperCaseName,
                    },
                ],
            },
            {
                target: "templates/base/typescript/dto/update-body.txt",
                dest: dtoPath,
                newFileName: `update-${camelCaseName}-body.ts`,
                replacements: [
                    {
                        oldString: "TABLE_NAME",
                        newString: upperCaseName,
                    },
                    {
                        oldString: "TABLE_LOWER_NAME",
                        newString: camelCaseName,
                    },
                ],
            },
            {
                target: "templates/base/typescript/dto/update-dto.txt",
                dest: dtoPath,
                newFileName: `update-${camelCaseName}-dto.ts`,
                replacements: [
                    {
                        oldString: "TABLE_NAME",
                        newString: upperCaseName,
                    },
                    {
                        oldString: "TABLE_LOWER_NAME",
                        newString: camelCaseName,
                    },
                ],
            },
            {
                target: "templates/base/typescript/enum/fields-enum.txt",
                dest: enumPath,
                newFileName: `${camelCaseName}-fields.enum.ts`,
                replacements: [
                    {
                        oldString: "TABLE_NAME",
                        newString: upperCaseName,
                    },
                ],
            },
            {
                target: "templates/base/typescript/table/module-file.txt",
                dest: schemasPath,
                newFileName: `${pluralLowerCaseName}.module.ts`,
                replacements: [
                    {
                        oldString: "TABLE_NAME",
                        newString: pluralUpperCaseName,
                    },
                    {
                        oldString: "TABLE_LOWER_NAME",
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
//# sourceMappingURL=cloningCommands.js.map