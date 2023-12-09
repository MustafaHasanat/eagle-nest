import { join } from "path";
import { InjectTemplate } from "../../types/injectTemplate.js";
import {
    CreateColumnProps,
    CreateRelationProps,
    CreateTableProps,
    DatabaseProps,
} from "../../interfaces/cliBuilder.js";

// maps -----------

const columnTypeDefaultMap: {
    [type: string]: {
        dtoCreate: string | null;
        dtoUpdate: string | null;
        entityType: string;
        dtoType: string;
    };
} = {
    string: {
        dtoCreate: "default: 'placeholder',\nexample: 'placeholder'",
        dtoUpdate: "required: false,\nexample: 'placeholder'",
        entityType: "string",
        dtoType: "string",
    },
    boolean: {
        dtoCreate: "default: false,\nexample: false",
        dtoUpdate: "required: false,\nexample: false",
        entityType: "boolean",
        dtoType: "boolean",
    },
    number: {
        dtoCreate: "default: 0,\nexample: 0",
        dtoUpdate: "required: false,\nexample: 0",
        entityType: "number",
        dtoType: "number",
    },
    date: {
        dtoCreate: "default: new Date(),\nexample: new Date()",
        dtoUpdate: "required: false,\nexample: new Date()",
        entityType: "Date",
        dtoType: "Date",
    },
    time: {
        dtoCreate: "default: new Date(),\nexample: new Date()",
        dtoUpdate: "required: false,\nexample: new Date()",
        entityType: "Date",
        dtoType: "Date",
    },
    array: {
        dtoCreate: "default: new Date(),\nexample: new Date()",
        dtoUpdate: "required: false,\nexample: new Date()",
        entityType: "[]",
        dtoType: "[]",
    },
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

    createAppFiles: ({
        mainDest,
        envDest,
        rolesGuard,
    }: {
        mainDest: string;
        envDest: string;
        rolesGuard: boolean;
    }): InjectTemplate[] =>
        !rolesGuard
            ? []
            : [
                  {
                      injectable: `${mainDest}/app.module.ts`,
                      actions: [
                          {
                              keyword: "*",
                              addition:
                                  "import { UserAuthGuard } from './guards/user-auth.guard'\nimport { APP_GUARD } from '@nestjs/core';\nimport { JwtModule } from '@nestjs/jwt';",
                              additionIsFile: false,
                          },
                          {
                              keyword: "imports: [",
                              addition:
                                  "templates/components/typescript/app/jwt/main-configs.txt",
                          },
                          {
                              keyword: "providers: [",
                              addition:
                                  "\n{\nprovide: APP_GUARD,\nuseClass: UserAuthGuard,\n},\n",
                              additionIsFile: false,
                          },
                      ],
                  },
                  {
                      injectable: `${envDest}/.env`,
                      actions: [
                          {
                              keyword: "*",
                              addition: "JWT_SECRET=*******\n\n",
                              additionIsFile: false,
                              supposedToBeThere: "JWT_SECRET",
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
            dtoProperties,
            decorators: { decoratorsValues, decoratorsImports },
        },
        paths: { entitiesPath, dtoPath },
        nameVariants: { camelCaseName },
        specialInjections,
    }: CreateColumnProps): InjectTemplate[] => {
        const { dtoCreate, dtoUpdate, entityType, dtoType } =
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
                            }\n})\n${columnName}: ${entityType};\n`,
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
                        addition: `${decoratorsImports}\n"import { ApiProperty } from '@nestjs/swagger';\n`,
                        additionIsFile: false,
                    },
                    {
                        keyword: "Dto {",
                        addition: `\n${
                            decoratorsValues || ""
                        }\n@ApiProperty({\n${
                            dtoProperties ? dtoProperties + "," : ""
                        }\n${
                            dtoCreate || ""
                        }\n})\n${columnName}: ${dtoType};\n`,
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
                            dtoUpdate || ""
                        } })\n${columnName}?: ${dtoType};\n`,
                        additionIsFile: false,
                    },
                ],
            },
            ...specialInjections,
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
            schemasPath1,
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
                            supposedToBeThere: "OneToMany",
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
                    injectable: `${schemasPath2}/${pluralLowerCaseName2}.module.ts`,
                    actions: [
                        {
                            keyword: "*",
                            addition: `import { ${pluralUpperCaseName1}Module } from '../${pluralLowerCaseName1}/${pluralLowerCaseName1}.module';\n`,
                            additionIsFile: false,
                        },
                        {
                            keyword: "imports: [",
                            addition: `${pluralUpperCaseName1}Module,\n`,
                            additionIsFile: false,
                        },
                    ],
                },
                {
                    injectable: `${schemasPath2}/${pluralLowerCaseName2}.service.ts`,
                    actions: [
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
                                "templates/components/typescript/table/getRows-x-By-y-Id-service-file.txt",
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
                                "templates/components/typescript/table/getRows-x-By-y-Id-controller-file.txt",
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
        // OneToOne relation
        else if (relationType === "OneToOne")
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
                            addition: ", OneToOne, JoinColumn",
                            additionIsFile: false,
                            supposedToBeThere: "OneToOne",
                        },
                        {
                            keyword: "// --- relations ---",
                            addition: `\n@OneToOne(() => ${upperCaseName2}, (${camelCaseName2}) => ${camelCaseName2}.${camelCaseName1}), {cascade: true,})\n@JoinColumn()\n${camelCaseName2}: ${upperCaseName2};\n\n`,
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
                            addition: ", OneToOne",
                            additionIsFile: false,
                        },
                        {
                            keyword: "// --- relations ---",
                            addition: `\n@OneToOne(() => ${upperCaseName1}, (${camelCaseName1}) => ${camelCaseName1}.${camelCaseName2})\n${camelCaseName1}: ${upperCaseName1};\n\n`,
                            additionIsFile: false,
                        },
                    ],
                },
                {
                    injectable: `${schemasPath1}/${pluralLowerCaseName1}.service.ts`,
                    actions: [
                        {
                            keyword: "// --- Relational REST APIs ---",
                            addition:
                                "templates/components/typescript/table/getRow-x-By-y-Id-service-file.txt",
                            replacements: [
                                {
                                    oldString: "TABLE_LOWER_NAME_X",
                                    newString: camelCaseName1,
                                },
                                {
                                    oldString: "TABLE_UPPER_NAME_X",
                                    newString: upperCaseName1,
                                },
                                {
                                    oldString: "TABLE_PLURAL_LOWER_NAME_X",
                                    newString: pluralLowerCaseName1,
                                },
                                {
                                    oldString: "TABLE_LOWER_NAME_Y",
                                    newString: camelCaseName2,
                                },
                                {
                                    oldString: "TABLE_UPPER_NAME_Y",
                                    newString: upperCaseName2,
                                },
                            ],
                        },
                    ],
                },
                {
                    injectable: `${schemasPath1}/${pluralLowerCaseName1}.controller.ts`,
                    actions: [
                        {
                            keyword: "// --- Relational REST endpoints ---",
                            addition:
                                "templates/components/typescript/table/getRow-x-By-y-Id-controller.txt",
                            replacements: [
                                {
                                    oldString: "TABLE_LOWER_NAME_X",
                                    newString: camelCaseName1,
                                },
                                {
                                    oldString: "TABLE_UPPER_NAME_X",
                                    newString: upperCaseName1,
                                },
                                {
                                    oldString: "TABLE_PLURAL_LOWER_NAME_X",
                                    newString: pluralLowerCaseName1,
                                },
                                {
                                    oldString: "TABLE_LOWER_NAME_Y",
                                    newString: camelCaseName2,
                                },
                                {
                                    oldString: "TABLE_UPPER_NAME_Y",
                                    newString: upperCaseName2,
                                },
                            ],
                        },
                    ],
                },
                {
                    injectable: `${schemasPath2}/${pluralLowerCaseName2}.module.ts`,
                    actions: [
                        {
                            keyword: "*",
                            addition: `import { ${pluralUpperCaseName1}Module } from '../${pluralLowerCaseName1}/${pluralLowerCaseName1}.module';\n`,
                            additionIsFile: false,
                        },
                        {
                            keyword: "imports: [",
                            addition: `${pluralUpperCaseName1}Module,\n`,
                            additionIsFile: false,
                        },
                    ],
                },
                {
                    injectable: `${schemasPath2}/${pluralLowerCaseName2}.service.ts`,
                    actions: [
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
                            keyword: "// --- Relational REST APIs ---",
                            addition:
                                "templates/components/typescript/table/getRow-x-By-y-Id-service-file.txt",
                            replacements: [
                                {
                                    oldString: "TABLE_LOWER_NAME_X",
                                    newString: camelCaseName2,
                                },
                                {
                                    oldString: "TABLE_UPPER_NAME_X",
                                    newString: upperCaseName2,
                                },
                                {
                                    oldString: "TABLE_PLURAL_LOWER_NAME_X",
                                    newString: pluralLowerCaseName2,
                                },
                                {
                                    oldString: "TABLE_LOWER_NAME_Y",
                                    newString: camelCaseName1,
                                },
                                {
                                    oldString: "TABLE_UPPER_NAME_Y",
                                    newString: upperCaseName1,
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
                                "templates/components/typescript/table/getRow-x-By-y-Id-controller.txt",
                            replacements: [
                                {
                                    oldString: "TABLE_LOWER_NAME_X",
                                    newString: camelCaseName2,
                                },
                                {
                                    oldString: "TABLE_UPPER_NAME_X",
                                    newString: upperCaseName2,
                                },
                                {
                                    oldString: "TABLE_PLURAL_LOWER_NAME_X",
                                    newString: pluralLowerCaseName2,
                                },
                                {
                                    oldString: "TABLE_LOWER_NAME_Y",
                                    newString: camelCaseName1,
                                },
                                {
                                    oldString: "TABLE_UPPER_NAME_Y",
                                    newString: upperCaseName1,
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
        else return [];
    },
};
