import inquirer from "inquirer";
import { execSync } from "child_process";
import constants from "../constants/receiverConstants.js";

type PackageType = {
    packageName: string;
    commandType: "--save" | "--save-dev";
};

export class Installer {
    constructor() {
        console.log("Checking your dependencies ...\n");
        const deps = execSync("npm ls --depth=0").toString();
        this.dependencies = deps
            .split(" ")
            .slice(2)
            .map((item) => item.slice(0, item.lastIndexOf("@")));
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
                        console.log("\nInstalling dependencies ...\n");
                        uninstalledPackages.forEach(
                            ({ packageName, commandType }) => {
                                console.log(`-------- ${packageName} --------`);
                                console.log(
                                    execSync(
                                        `npm install ${commandType} ${packageName}`
                                    ).toString()
                                );
                            }
                        );
                    }
                });

            console.log("-------- Process done! --------\n");
        } else {
            console.log(
                "-------- You have all required dependencies! --------\n"
            );
        }
    };
}
