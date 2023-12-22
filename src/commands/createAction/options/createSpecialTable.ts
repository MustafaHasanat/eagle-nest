/* eslint-disable no-empty-pattern */
import { CreateTableProps } from "../../../interfaces/builder.js";
import { InjectTemplate } from "../../../types/injectTemplate.js";
import { CloneTemplate } from "../../../types/cloneTemplate.js";
import { CreateSpecialArgument } from "../../../enums/actions.js";
import { join } from "path";

const createSpecialTableCloning = ({
    nameVariant: { camelCaseName, pluralLowerCaseName },
    paths: { entitiesPath, dtoPath, enumsPath, schemasPath },
    tableName,
}: CreateTableProps & {
    tableName: CreateSpecialArgument;
}): CloneTemplate[] => {
    const sharedClones = (dirName: string): CloneTemplate[] => [
        {
            target: `base/typescript/table/${dirName}/entity.txt`,
            destination: entitiesPath,
            newFileName: camelCaseName + ".entity.ts",
        },
        {
            target: `base/typescript/table/${dirName}/createDto.txt`,
            destination: dtoPath,
            newFileName: `create-${camelCaseName}.dto.ts`,
        },
        {
            target: `base/typescript/table/${dirName}/updateDto.txt`,
            destination: dtoPath,
            newFileName: `update-${camelCaseName}.dto.ts`,
        },
        {
            target: `base/typescript/table/${dirName}/module.txt`,
            destination: schemasPath,
            newFileName: `${pluralLowerCaseName}.module.ts`,
        },
        {
            target: `base/typescript/table/${dirName}/controller.txt`,
            destination: schemasPath,
            newFileName: `${pluralLowerCaseName}.controller.ts`,
        },
        {
            target: `base/typescript/table/${dirName}/service.txt`,
            destination: schemasPath,
            newFileName: `${pluralLowerCaseName}.service.ts`,
        },
    ];

    if (tableName === CreateSpecialArgument.USER)
        return [
            ...sharedClones("specialUser"),
            {
                target: "base/typescript/table/specialUser/loginDto.txt",
                destination: dtoPath,
                newFileName: "login-user.dto.ts",
            },
            {
                target: "base/typescript/table/specialUser/enums.txt",
                destination: enumsPath,
                newFileName: "users.enum.ts",
            },
        ];
    else if (tableName === CreateSpecialArgument.PRODUCT)
        return sharedClones("specialProduct");
    else if (tableName === CreateSpecialArgument.NOTIFICATION)
        return sharedClones("specialNotification");
    else return [];
};

const createSpecialTableInjection = ({
    nameVariant: {
        camelCaseName,
        upperCaseName,
        pluralUpperCaseName,
        pluralLowerCaseName,
    },
    paths: { mainPath, enumsPath, entitiesPath },
    tableName,
}: CreateTableProps & {
    tableName: CreateSpecialArgument;
}): InjectTemplate[] => {
    const sharedInjects: InjectTemplate[] = [
        {
            injectable: join(mainPath, "app.module.ts"),
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
                    keyword: "// ===== tables =====",
                },
            ],
        },
        {
            injectable: join(entitiesPath, "index.ts"),
            additions: [
                {
                    addition: {
                        base: `import { ${upperCaseName} } from "./${camelCaseName}.entity";\n`,
                        additionIsFile: false,
                        conditional: {
                            type: "SUPPOSED_TO_BE_THERE",
                            data: `import { ${upperCaseName} }`,
                        },
                    },
                    keyword: "*",
                },
                {
                    addition: {
                        base: `\n${upperCaseName},\n`,
                        additionIsFile: false,
                        conditional: {
                            type: "SUPPOSED_TO_BE_THERE",
                            data: `import { ${upperCaseName} }`,
                        },
                    },
                    keyword: "entities = [",
                },
            ],
        },
        {
            injectable: join(enumsPath, "tables-columns.enum.ts"),
            additions: [
                {
                    addition: {
                        base: `export enum ${upperCaseName}Fields {}\n\n`,
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
            ],
            deletions: [
                {
                    keyword: "| null",
                },
            ],
        },
    ];

    if (tableName === CreateSpecialArgument.USER) return sharedInjects;
    else if (tableName === CreateSpecialArgument.PRODUCT) return sharedInjects;
    else if (tableName === CreateSpecialArgument.NOTIFICATION)
        return sharedInjects;
    else return [];
};
export { createSpecialTableCloning, createSpecialTableInjection };
