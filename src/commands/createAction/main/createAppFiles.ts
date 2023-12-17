import { join } from "path";
import { CloneTemplate } from "../../../types/cloneTemplate.js";
import { InjectTemplate } from "../../../types/injectTemplate.js";

interface CreateAppFilesProps {
    mainDest: string;
    envDest: string;
    rolesGuard: boolean;
}

const createAppFilesCloning = (
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
                    target: "templates/base/typescript/enum/user-role.txt",
                    destination: join(mainDest, "enums"),
                    newFileName: "user-role.enum.ts",
                },
            ]
        );

    return result;
};

const createAppFilesInjection = ({
    mainDest,
    envDest,
    rolesGuard,
}: CreateAppFilesProps): InjectTemplate[] =>
    !rolesGuard
        ? []
        : [
              {
                  injectable: `${mainDest}/app.module.ts`,
                  additions: [
                      {
                          keyword: "*",
                          addition: {
                              base: "import { UserAuthGuard } from './guards/user-auth.guard'\nimport { APP_GUARD } from '@nestjs/core';\nimport { JwtModule } from '@nestjs/jwt';",
                              additionIsFile: false,
                          },
                      },
                      {
                          keyword: "imports: [",
                          addition: {
                              base: "templates/components/typescript/app/jwt/main-configs.txt",
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
                  injectable: `${envDest}/.env`,
                  additions: [
                      {
                          keyword: "*",
                          addition: {
                              base: "JWT_SECRET=*******\n\n",
                              additionIsFile: false,
                              conditional: {
                                  type: "SUPPOSED_TO_BE_THERE",
                                  data: "JWT_SECRET",
                              },
                          },
                      },
                  ],
              },
          ];

export { createAppFilesInjection, createAppFilesCloning };
