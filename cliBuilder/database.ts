import inquirer from "inquirer";
import Utils from "../utils/index.js";
import Constants from "../constants/index.js";
import { filesExist, pathConvertor } from "./helpers/index.js";
import { join } from "path";

const databaseBuilder = async (constants: Constants, utils: Utils) => {
    inquirer
        .prompt([
            constants.builder.database.destination,
            constants.builder.database.appModuleLocation,
            constants.builder.database.dotEnvLocation,
        ])
        .then(async (answers) => {
            const isFilesExist = filesExist([
                join(
                    process.cwd(),
                    answers.appModuleLocation,
                    "app.module.txt"
                ),
                join(process.cwd(), answers.dotEnvLocation, ".env"),
            ]);
            if (isFilesExist.length > 0) {
                console.log("You must have these files to modify them:");
                isFilesExist.forEach((file) => {
                    console.log("\n1) " + file);
                });
                return;
            }

            await utils.manipulator.cloneTemplates([
                {
                    target: "templates/base/typescript/db/entities-file.txt",
                    dest: pathConvertor(answers.destination, "entities"),
                    newFileName: "index.ts",
                },
            ]);

            await utils.manipulator.injectTemplate([
                {
                    target: "templates/components/typescript/app-module/db/config.txt",
                    injectable: pathConvertor(
                        answers.appModuleLocation,
                        "app.module.txt"
                    ),
                    keyword: "imports: [",
                },
                // {
                //     target: "templates/components/typescript/app-module/db/imports.txt",
                //     injectable: this.pathConvertor(
                //         answers.appModuleLocation,
                //         "app.module.txt"
                //     ),
                //     keyword: "*",
                //     replacements: [
                //         {
                //             oldString: "PATH_TO_ENTITIES",
                //             newString: answers.destination,
                //         },
                //     ],
                // },
                {
                    target: "templates/components/others/db-env.txt",
                    injectable: pathConvertor(answers.dotEnvLocation, ".env"),
                    keyword: "*",
                },
            ]);
        });
};
export default databaseBuilder;
