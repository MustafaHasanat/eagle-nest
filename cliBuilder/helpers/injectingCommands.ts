import { join } from "path";
import { InjectTemplate } from "../../types/injectTemplate";
import {
    CreateColumnProps,
    CreateRelationProps,
    CreateTableProps,
    DatabaseProps,
} from "../../interfaces/cliBuilder";

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
    }: CreateTableProps): InjectTemplate[] => [
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
                    addition: `import { ${pluralUpperCaseName}Module } from "./schemas/${pluralLowerCaseName}/${pluralLowerCaseName}.module";\n`,
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
    ],

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
                        keyword: "{ Entity",
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

    createRelation: ({
        relationType,
        entitiesPath,
        table1: {
            camelCaseName1,
            upperCaseName1,
            pluralLowerCaseName1,
            pluralUpperCaseName1,
        },
        table2: {
            camelCaseName2,
            upperCaseName2,
            pluralLowerCaseName2,
            pluralUpperCaseName2,
            dtoPath2,
            schemasPath2,
        },
    }: CreateRelationProps): InjectTemplate[] => {
        // OneToMany relation
        if (relationType === "OneToMany")
            return [
                {
                    injectable: join(
                        entitiesPath,
                        `${camelCaseName1}.entity.ts`
                    ),
                    actions: [
                        {
                            keyword: "*",
                            addition: `import { ${upperCaseName2} } from './${camelCaseName2}.entity';\n`,
                            additionIsFile: false,
                        },
                        {
                            keyword: "{ Entity",
                            addition: ", OneToMany",
                            additionIsFile: false,
                        },
                        {
                            keyword: "// --- relations ---",
                            addition: `\n@OneToMany(() => ${upperCaseName2}, (${camelCaseName2}) => ${camelCaseName2}.${camelCaseName1})\n${pluralLowerCaseName2}: ${upperCaseName2}[];\n\n`,
                            additionIsFile: false,
                        },
                    ],
                },
                {
                    injectable: join(
                        entitiesPath,
                        `${camelCaseName2}.entity.ts`
                    ),
                    actions: [
                        {
                            keyword: "*",
                            addition: `import { ${upperCaseName1} } from './${camelCaseName1}.entity';\n`,
                            additionIsFile: false,
                        },
                        {
                            keyword: "{ Entity",
                            addition: ", ManyToOne",
                            additionIsFile: false,
                        },
                        {
                            keyword: "// --- relations ---",
                            addition: `\n@ManyToOne(() => ${upperCaseName1}, (${camelCaseName1}) => ${camelCaseName1}.${pluralLowerCaseName2})\n${camelCaseName1}: ${upperCaseName1};\n\n`,
                            additionIsFile: false,
                        },
                    ],
                },
                {
                    injectable: `${schemasPath2}/${pluralLowerCaseName2}.service.ts`,
                    actions: [
                        {
                            keyword: "DeleteResult",
                            addition: ", In",
                            additionIsFile: false,
                        },
                        {
                            keyword: "*",
                            addition: `import { ${pluralUpperCaseName1}Service } from '../${pluralLowerCaseName1}/${pluralLowerCaseName1}.service';\n`,
                            additionIsFile: false,
                        },
                        {
                            keyword: `@InjectRepository(${upperCaseName2})`,
                            addition: `\nprivate readonly ${pluralLowerCaseName1}Service: ${pluralUpperCaseName1}Service,`,
                            additionIsFile: false,
                        },

                        {
                            keyword: "DUMMY_TABLE_NAME_CREATE",
                            addition: `, ${camelCaseName1}: ${camelCaseName1}Id`,
                            additionIsFile: false,
                        },
                        {
                            keyword: "DUMMY_TABLE_NAME_UPDATE",
                            addition: `, ${camelCaseName1}: ${camelCaseName1}Id`,
                            additionIsFile: false,
                            replica: true,
                        },
                        {
                            keyword: "// --- Table ID check - create ---",
                            addition:
                                "templates/components/typescript/table/tableIdCheck-service-file.txt",
                            replacements: [
                                {
                                    oldString: "TABLE_LOWER_NAME1",
                                    newString: camelCaseName1,
                                },
                                {
                                    oldString: "TABLE_UPPER_NAME1",
                                    newString: upperCaseName1,
                                },
                                {
                                    oldString: "TABLE_PLURAL_UPPER_NAME1",
                                    newString: pluralLowerCaseName1,
                                },
                                {
                                    oldString: "TABLE_LOWER_NAME2",
                                    newString: camelCaseName2,
                                },
                            ],
                        },
                        {
                            keyword: "// --- Table ID check - update ---",
                            addition:
                                "templates/components/typescript/table/tableIdCheck-service-file.txt",
                            replica: true,
                            replacements: [
                                {
                                    oldString: "TABLE_LOWER_NAME1",
                                    newString: camelCaseName1,
                                },
                                {
                                    oldString: "TABLE_UPPER_NAME1",
                                    newString: upperCaseName1,
                                },
                                {
                                    oldString: "TABLE_PLURAL_UPPER_NAME1",
                                    newString: pluralLowerCaseName1,
                                },
                                {
                                    oldString: "TABLE_LOWER_NAME2",
                                    newString: camelCaseName2,
                                },
                            ],
                        },
                        {
                            keyword: "// --- Relational REST APIs ---",
                            addition:
                                "templates/components/typescript/table/getTableById-service-file.txt",
                            replacements: [
                                {
                                    oldString: "TABLE_LOWER_NAME1",
                                    newString: camelCaseName1,
                                },
                                {
                                    oldString: "TABLE_UPPER_NAME1",
                                    newString: upperCaseName1,
                                },
                                {
                                    oldString: "TABLE_LOWER_NAME2",
                                    newString: camelCaseName2,
                                },
                                {
                                    oldString: "TABLE_UPPER_NAME2",
                                    newString: upperCaseName2,
                                },
                                {
                                    oldString: "TABLE_PLURAL_UPPER_NAME2",
                                    newString: pluralUpperCaseName2,
                                },
                            ],
                        },
                    ],
                },
                {
                    injectable: `${schemasPath2}/${pluralLowerCaseName2}.controller.ts`,
                    actions: [
                        {
                            keyword: "// --- Relational REST endpoints ---",
                            addition:
                                "templates/components/typescript/table/getTableById-controller-file.txt",
                            replacements: [
                                {
                                    oldString: "TABLE_LOWER_NAME1",
                                    newString: camelCaseName1,
                                },
                                {
                                    oldString: "TABLE_UPPER_NAME1",
                                    newString: upperCaseName1,
                                },
                                {
                                    oldString: "TABLE_UPPER_NAME2",
                                    newString: upperCaseName2,
                                },
                                {
                                    oldString: "TABLE_PLURAL_LOWER_NAME2",
                                    newString: pluralLowerCaseName2,
                                },
                                {
                                    oldString: "TABLE_PLURAL_UPPER_NAME2",
                                    newString: pluralUpperCaseName2,
                                },
                            ],
                        },
                    ],
                },
                {
                    injectable: `${dtoPath2}/create-${camelCaseName2}.dto.ts`,
                    actions: [
                        {
                            keyword: "*",
                            addition:
                                "import { ApiProperty } from '@nestjs/swagger';",
                            additionIsFile: false,
                            supposedToBeThere: "ApiProperty",
                        },
                        {
                            keyword: "// --- Relational fields ---",
                            addition: `\n@ApiProperty({ required: true })\n${camelCaseName1}: string;\n`,
                            additionIsFile: false,
                        },
                    ],
                },
                {
                    injectable: `${dtoPath2}/update-${camelCaseName2}.dto.ts`,
                    actions: [
                        {
                            keyword: "*",
                            addition:
                                "import { ApiProperty } from '@nestjs/swagger';",
                            additionIsFile: false,
                            supposedToBeThere: "ApiProperty",
                        },
                        {
                            keyword: "// --- Relational fields ---",
                            addition: `\n@ApiProperty({ required: false, default: '' })\n${camelCaseName1}?: string;\n`,
                            additionIsFile: false,
                        },
                    ],
                },
            ];
        // ManyToMany relation
        else if (relationType === "ManyToMany") return [];
        // OneToOne relation
        else return [];
    },
};
