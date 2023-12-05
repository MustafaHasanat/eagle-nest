import { join } from "path";
import { InjectTemplate } from "../../types/injectTemplate.js";

// interfaces -----------
interface DatabaseProps {
    appModuleLocation: string;
    envLocation: string;
    pathToEntities: string;
}

interface CreateTableProps {
    paths: {
        appModulePath: string;
        entitiesPath: string;
        enumsPath: string;
    };
    nameVariants: {
        camelCaseName: string;
        upperCaseName: string;
        pluralLowerCaseName: string;
        pluralUpperCaseName: string;
    };
}

interface CreateColumnProps {
    columnData: {
        columnName: string;
        columnType: string;
        entityProperties: string | null;
        entityDecorators: {
            decoratorsValues: string | null;
            decoratorsImports: string | null;
        };
        dtoProperties: string | null;
    };
    paths: {
        entitiesPath: string;
        dtoPath: string;
    };
    nameVariants: {
        camelCaseName: string;
    };
}

// maps -----------

const columnTypeDefaultMap: {
    [type: string]: { create: string | null; update: string | null };
} = {
    string: { create: "default: 'string placeholder'", update: "default: ''" },
    boolean: { create: "default: false", update: null },
    number: { create: "default: 0", update: null },
};

// functions -----------

export default {
    createMain: (envLocation: string): InjectTemplate[] => [
        {
            injectable: envLocation,
            actions: [
                {
                    addition: "/templates/components/others/app-env.txt",
                    keyword: "*",
                },
            ],
        },
    ],

    database: ({
        appModuleLocation,
        envLocation,
        pathToEntities,
    }: DatabaseProps): InjectTemplate[] => [
        {
            injectable: appModuleLocation,
            actions: [
                {
                    addition:
                        "templates/components/typescript/app/db/config.txt",
                    keyword: "imports: [",
                },
                {
                    addition:
                        "templates/components/typescript/app/db/imports.txt",
                    keyword: "*",
                    replacements: [
                        {
                            oldString: "PATH_TO_ENTITIES",
                            newString: pathToEntities,
                        },
                    ],
                },
            ],
        },
        {
            injectable: envLocation,
            actions: [
                {
                    addition: "templates/components/others/db-env.txt",
                    keyword: "*",
                },
            ],
        },
    ],

    createTable: ({
        paths: { entitiesPath, appModulePath, enumsPath },
        nameVariants: {
            camelCaseName,
            upperCaseName,
            pluralUpperCaseName,
            pluralLowerCaseName,
        },
    }: CreateTableProps): InjectTemplate[] => {
        return [
            {
                injectable: join(entitiesPath, "index.ts"),
                actions: [
                    {
                        addition: `import { ${upperCaseName} } from "./${camelCaseName}.entity";\n`,
                        additionIsFile: false,
                        keyword: "*",
                    },
                    {
                        addition: `\n${upperCaseName},\n`,
                        additionIsFile: false,
                        keyword: "entities = [",
                    },
                ],
            },
            {
                injectable: join(appModulePath, "app.module.ts"),
                actions: [
                    {
                        addition: `import { ${pluralUpperCaseName}Module } from "schemas/${pluralLowerCaseName}/${pluralLowerCaseName}.module";\n`,
                        additionIsFile: false,
                        keyword: "*",
                    },
                    {
                        addition: `\n${pluralUpperCaseName}Module,\n`,
                        additionIsFile: false,
                        keyword: "imports: [",
                    },
                ],
            },
            {
                injectable: join(enumsPath, "tables-columns.enum.ts"),
                actions: [
                    {
                        addition: `enum ${upperCaseName}Fields {}\n\n`,
                        additionIsFile: false,
                        keyword: "*",
                    },
                    {
                        addition: `\n, ${upperCaseName}Fields\n`,
                        additionIsFile: false,
                        keyword: "export { AllTablesColumns",
                    },
                ],
            },
        ];
    },

    createColumn: ({
        columnData: {
            columnName,
            columnType,
            entityProperties,
            entityDecorators: { decoratorsValues, decoratorsImports },
            dtoProperties,
        },
        paths: { entitiesPath, dtoPath },
        nameVariants: { camelCaseName },
    }: CreateColumnProps): InjectTemplate[] => {
        const { create: createDefault, update: updateDefault } =
            columnTypeDefaultMap[columnType];

        return [
            {
                injectable: join(entitiesPath, `${camelCaseName}.entity.ts`),
                actions: [
                    decoratorsImports
                        ? {
                              keyword: "*",
                              addition: `${decoratorsImports}\n`,
                              additionIsFile: false,
                          }
                        : null,
                    {
                        keyword: "--- columns ---",
                        addition:
                            `${decoratorsValues || ""}` +
                            `\n@Column({\n${
                                entityProperties || ""
                            }\n})\n${columnName}: ${columnType};\n`,
                        additionIsFile: false,
                    },
                    {
                        keyword: "Entity",
                        addition: ", Column",
                        additionIsFile: false,
                    },
                ],
            },
            {
                injectable: join(dtoPath, `create-${camelCaseName}.dto.ts`),
                actions: [
                    {
                        keyword: "*",
                        addition:
                            "import { ApiProperty } from '@nestjs/swagger';\n\n",
                        additionIsFile: false,
                    },
                    {
                        keyword: "Dto {",
                        addition: `\n\n@ApiProperty({\n${
                            dtoProperties ? dtoProperties + "," : ""
                        }\n${
                            createDefault || ""
                        }\n})\n${columnName}: ${columnType};\n`,
                        additionIsFile: false,
                    },
                ],
            },
            {
                injectable: join(dtoPath, `update-${camelCaseName}.dto.ts`),
                actions: [
                    {
                        keyword: "PartialType",
                        addition: ", ApiProperty ",
                        additionIsFile: false,
                    },
                    {
                        keyword: "Dto) {",
                        addition: `\n\n@ApiProperty({ ${
                            updateDefault || ""
                        } })\n${columnName}?: ${columnType};\n`,
                        additionIsFile: false,
                    },
                ],
            },
        ];
    },
};
