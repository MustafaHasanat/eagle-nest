import { join } from "path";
import { CloneTemplate } from "../../../types/cloneTemplate.js";
import { InjectTemplate } from "../../../types/injectTemplate.js";
import { generateJWTSecret } from "../../../utils/helpers/filesHelpers.js";

interface CreateAppFilesProps {
    appDest: string;
    rootDir: string;
    isUserGuard: boolean;
    isFormat: boolean;
    isAWS: boolean;
}

const createAppFilesCloning = ({
    appDest,
    isUserGuard,
    isFormat,
    rootDir,
    isAWS,
}: CreateAppFilesProps): CloneTemplate[] => [
    {
        signature: "app.module.ts",
        target: "base/typescript/app/module-file.txt",
        destination: appDest,
        newFileName: "app.module.ts",
    },
    {
        signature: "app.controller.ts",
        target: "base/typescript/app/controller-file.txt",
        destination: appDest,
        newFileName: "app.controller.ts",
    },
    {
        signature: "app.service.ts",
        target: "base/typescript/app/service-file.txt",
        destination: appDest,
        newFileName: "app.service.ts",
    },
    ...(isUserGuard
        ? [
              {
                  signature: "user-auth.guard.ts",
                  target: "base/typescript/jwt/auth-guard-file.txt",
                  destination: join(appDest, "guards"),
                  newFileName: "user-auth.guard.ts",
              },
          ]
        : []),
    ...(isFormat
        ? [
              {
                  signature: ".prettierrc",
                  target: "base/others/prettierrc-file.txt",
                  destination: rootDir,
                  newFileName: ".prettierrc",
              },
              {
                  signature: ".eslintrc.js",
                  target: "base/others/eslintrc-file.txt",
                  destination: rootDir,
                  newFileName: ".eslintrc.js",
              },
          ]
        : []),
    ...(isAWS
        ? [
              {
                  signature: "aws.module.ts",
                  target: "base/typescript/aws/aws.module.txt",
                  destination: join(appDest, "aws"),
                  newFileName: "aws.module.ts",
              },
              {
                  signature: "aws.controller.ts",
                  target: "base/typescript/aws/aws.controller.txt",
                  destination: join(appDest, "aws"),
                  newFileName: "aws.controller.ts",
              },
              {
                  signature: "aws.service.ts",
                  target: "base/typescript/aws/aws.service.txt",
                  destination: join(appDest, "aws"),
                  newFileName: "aws.service.ts",
              },
          ]
        : []),
];

const createAppFilesInjection = ({
    appDest,
    rootDir,
    isUserGuard,
    isFormat,
    isAWS,
}: CreateAppFilesProps): InjectTemplate[] =>
    [
        ...(isFormat
            ? [
                  {
                      signature: "package.json",
                      injectable: join(rootDir, "package.json"),
                      deletions: [
                          {
                              keyword: '"format"',
                              deletion: {
                                  isWholeLine: true,
                                  conditional: {
                                      type: "REPLACED_WITH",
                                      data: '"format": "prettier --write .",',
                                  },
                              },
                          },
                      ],
                  },
              ]
            : []),
        ...(isUserGuard
            ? [
                  {
                      signature: "app.module.ts",
                      injectable: join(appDest, "app.module.ts"),
                      additions: [
                          {
                              keyword: "*",
                              addition: {
                                  base: "import { UserAuthGuard } from './guards/user-auth.guard'\nimport { APP_GUARD } from '@nestjs/core';\nimport { JwtModule } from '@nestjs/jwt';",
                                  additionIsFile: false,
                              },
                          },
                          {
                              keyword: "// ===== services =====",
                              addition: {
                                  base: "components/typescript/jwt/main-configs.txt",
                              },
                          },
                          {
                              keyword: "providers: [",
                              addition: {
                                  base: "\n{\nprovide: APP_GUARD,\nuseClass: UserAuthGuard,\n},\n",
                                  additionIsFile: false,
                              },
                          },
                      ],
                  },
                  {
                      signature: ".env",
                      injectable: join(rootDir, ".env"),
                      additions: [
                          {
                              keyword: "*",
                              addition: {
                                  base: `JWT_SECRET=${generateJWTSecret()}\n`,
                                  additionIsFile: false,
                                  conditional: {
                                      type: "SUPPOSED_TO_BE_THERE",
                                      data: "JWT_SECRET",
                                  },
                              },
                          },
                      ],
                  },
              ]
            : []),
        ...(isAWS
            ? [
                  {
                      signature: "app.module.ts",
                      injectable: join(appDest, "app.module.ts"),
                      additions: [
                          {
                              addition: {
                                  base: 'import { S3Module } from "./aws/aws.module";\n',
                                  additionIsFile: false,
                              },
                              keyword: "*",
                          },
                          {
                              addition: {
                                  base: "\nS3Module,",
                                  additionIsFile: false,
                              },
                              keyword: "// ===== services =====",
                          },
                      ],
                  },
              ]
            : []),
    ] as InjectTemplate[];

export { createAppFilesInjection, createAppFilesCloning };
