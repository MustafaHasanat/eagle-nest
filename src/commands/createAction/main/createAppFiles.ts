import { join } from "path";
import { CloneTemplate } from "../../../types/cloneTemplate.js";
import { InjectTemplate } from "../../../types/injectTemplate.js";
import { generateJWTSecret } from "../../../utils/helpers/filesHelpers.js";

interface CreateAppFilesProps {
    appDest: string;
    rootDir: string;
    isUserGuard: boolean;
    isFormat: boolean;
}

const createAppFilesCloning = ({
    appDest,
    isUserGuard,
    isFormat,
    rootDir,
}: CreateAppFilesProps): CloneTemplate[] => [
    {
        target: "templates/base/typescript/app/module-file.txt",
        destination: appDest,
        newFileName: "app.module.ts",
    },
    {
        target: "templates/base/typescript/app/controller-file.txt",
        destination: appDest,
        newFileName: "app.controller.ts",
    },
    {
        target: "templates/base/typescript/app/service-file.txt",
        destination: appDest,
        newFileName: "app.service.ts",
    },
    ...(isUserGuard
        ? [
              {
                  target: "templates/base/typescript/jwt/auth-guard-file.txt",
                  destination: join(appDest, "guards"),
                  newFileName: "user-auth.guard.ts",
              },
              {
                  target: "templates/base/typescript/enum/user-role.txt",
                  destination: join(appDest, "enums"),
                  newFileName: "user-role.enum.ts",
              },
          ]
        : []),
    ...(isFormat
        ? [
              {
                  target: "templates/base/others/prettierrc-file.txt",
                  destination: rootDir,
                  newFileName: ".prettierrc",
              },
              {
                  target: "templates/base/others/eslintrc-file.txt",
                  destination: rootDir,
                  newFileName: ".eslintrc.js",
              },
          ]
        : []),
];

const createAppFilesInjection = ({
    appDest,
    rootDir,
    isUserGuard,
    isFormat,
}: CreateAppFilesProps): InjectTemplate[] =>
    [
        ...(isFormat
            ? [
                  {
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
                                  base: "templates/components/typescript/jwt/main-configs.txt",
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
    ] as InjectTemplate[];

export { createAppFilesInjection, createAppFilesCloning };
