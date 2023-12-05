import inquirer from "inquirer";
import { execSync } from "child_process";
import constants from "../constants/receiverConstants.js";
import { logCliProcess, logCliTitle } from "../utils/logCliDecorators.js";

type PackageType = {
    packageName: string;
    commandType: "--save" | "--save-dev";
};

export class Installer {
    constructor(isNeedDeps: boolean) {
        // get a copy from the installed dependencies of the project
        // (only if the option needs some dependencies)
        if (isNeedDeps) {
            logCliProcess("Checking your dependencies");
            const deps = execSync("npm ls --depth=0").toString();
            this.dependencies = deps
                .split(" ")
                .slice(2)
                .map((item) => item.slice(0, item.lastIndexOf("@")));
        }
    }
    dependencies: string[] = [];

    private getUninstalledPackages = (packages: PackageType[]) =>
        packages.reduce(
            (
                acc: {
                    uninstalledPackages: PackageType[];
                    simpleList: string[];
                },
                packageData
            ) => {
                if (!this.dependencies.includes(packageData.packageName)) {
                    return {
                        uninstalledPackages: [
                            ...acc.uninstalledPackages,
                            packageData,
                        ],
                        simpleList: [
                            ...acc.simpleList,
                            packageData.packageName,
                        ],
                    };
                }
                return { ...acc };
            },
            {
                uninstalledPackages: [],
                simpleList: [],
            }
        );

    installPackages = async (packages: PackageType[]) => {
        const { uninstalledPackages, simpleList } =
            this.getUninstalledPackages(packages);

        if (uninstalledPackages.length > 0) {
            await inquirer
                .prompt([constants.installer.confirmation(simpleList)])
                .then(({ confirmation }) => {
                    if (confirmation) {
                        logCliProcess("Installing dependencies");
                        uninstalledPackages.forEach(
                            ({ packageName, commandType }) => {
                                logCliTitle(packageName);
                                console.log(
                                    execSync(
                                        `npm install ${commandType} ${packageName}`
                                    ).toString()
                                );
                            }
                        );
                        logCliTitle("Process done!");
                    } else {
                        logCliTitle(
                            "Process is canceled! (no dependencies have ben installed)"
                        );
                    }
                });
        } else {
            logCliTitle("You have all the required dependencies!");
        }
    };
}
