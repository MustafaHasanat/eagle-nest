import { CreateTableProps } from "../../../interfaces/builder.js";
import { InjectTemplate } from "../../../types/injectTemplate.js";
import { CloneTemplate } from "../../../types/cloneTemplate.js";
import { CreateSpecialArgument } from "../../../enums/actions.js";

const createSpecialTableCloning = ({
    nameVariant: { camelCaseName, pluralLowerCaseName },
    paths: { entitiesPath, dtoPath, enumsPath, schemasPath },
    tableName,
}: CreateTableProps & {
    tableName: CreateSpecialArgument;
}): CloneTemplate[] => {
    const sharedClones = (dirName: string): CloneTemplate[] => [
        {
            target: `templates/base/typescript/table/${dirName}/entity.txt`,
            destination: entitiesPath,
            newFileName: camelCaseName + ".entity.ts",
        },
        {
            target: `templates/base/typescript/table/${dirName}/createDto.txt`,
            destination: dtoPath,
            newFileName: `create-${camelCaseName}.dto.ts`,
        },
        {
            target: `templates/base/typescript/table/${dirName}/updateDto.txt`,
            destination: dtoPath,
            newFileName: `update-${camelCaseName}.dto.ts`,
        },
        {
            target: `templates/base/typescript/table/${dirName}/module.txt`,
            destination: schemasPath,
            newFileName: `${pluralLowerCaseName}.module.ts`,
        },
        {
            target: `templates/base/typescript/table/${dirName}/controller.txt`,
            destination: schemasPath,
            newFileName: `${pluralLowerCaseName}.controller.ts`,
        },
        {
            target: `templates/base/typescript/table/${dirName}/service.txt`,
            destination: schemasPath,
            newFileName: `${pluralLowerCaseName}.service.ts`,
        },
    ];

    if (tableName === CreateSpecialArgument.USER)
        return [
            ...sharedClones("specialUser"),
            {
                target: "templates/base/typescript/table/specialUser/loginDto.txt",
                destination: dtoPath,
                newFileName: "login-user.dto.ts",
            },
            {
                target: "templates/base/typescript/table/specialUser/enums.txt",
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

const createSpecialTableInjection = ({}: CreateTableProps & {
    tableName: CreateSpecialArgument;
}): InjectTemplate[] => [];

export { createSpecialTableCloning, createSpecialTableInjection };
