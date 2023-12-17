import { join } from "path";
import { CreateTableProps } from "../../../interfaces/cliBuilder.js";
import { InjectTemplate } from "../../../types/injectTemplate.js";
import { CloneTemplate } from "../../../types/cloneTemplate.js";

const createTableCloning = ({
    paths: { entitiesPath, dtoPath, schemasPath },
    nameVariant: {
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
};

const createTableInjection = ({
    paths: { entitiesPath, mainPath: appModulePath, enumsPath },
    nameVariant: {
        camelCaseName,
        upperCaseName,
        pluralUpperCaseName,
        pluralLowerCaseName,
    },
}: CreateTableProps): InjectTemplate[] => [
    {
        injectable: join(entitiesPath, "index.ts"),
        additions: [
            {
                addition: {
                    base: `import { ${upperCaseName} } from "./${camelCaseName}.entity";\n`,
                    additionIsFile: false,
                },
                keyword: "*",
            },
            {
                addition: {
                    base: `\n${upperCaseName},\n`,
                    additionIsFile: false,
                },
                keyword: "entities = [",
            },
        ],
    },
    {
        injectable: join(appModulePath, "app.module.ts"),
        additions: [
            {
                addition: {
                    base: `import { ${pluralUpperCaseName}Module } from "./schemas/${pluralLowerCaseName}/${pluralLowerCaseName}.module";\n`,
                    additionIsFile: false,
                },
                keyword: "*",
            },
            {
                addition: {
                    base: `\n${pluralUpperCaseName}Module,`,
                    additionIsFile: false,
                },
                keyword: "// --- tables ---",
            },
        ],
    },
    {
        injectable: join(enumsPath, "tables-columns.enum.ts"),
        additions: [
            {
                addition: {
                    base: `enum ${upperCaseName}Fields {}\n\n`,
                    additionIsFile: false,
                },
                keyword: "*",
            },
            {
                addition: {
                    base: `${upperCaseName}Fields | `,
                    additionIsFile: false,
                },
                keyword: "AllTablesColumns = ",
            },
            {
                addition: {
                    base: ` ${upperCaseName}Fields, `,
                    additionIsFile: false,
                },
                keyword: "export {",
            },
        ],
    },
];

export { createTableInjection, createTableCloning };
