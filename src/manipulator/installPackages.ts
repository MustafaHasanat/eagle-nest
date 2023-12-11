import inquirer from "inquirer";
import { execSync } from "child_process";
import constants from "../utils/constants/creatorConstants.js";
import specialLog from "../utils/helpers/specialLog.js";
import { FullDependencies, PackageType } from "../interfaces/constants.js";

const getUninstalledPackages = ({
    installedDeps,
    neededDeps,
}: FullDependencies) =>
    neededDeps.reduce(
        (
            acc: {
                uninstalledPackages: PackageType[];
                simpleList: string[];
            },
            packageData
        ) => {
            if (!installedDeps.includes(packageData.packageName)) {
                return {
                    uninstalledPackages: [
                        ...acc.uninstalledPackages,
                        packageData,
                    ],
                    simpleList: [...acc.simpleList, packageData.packageName],
                };
            }
            return { ...acc };
        },
        {
            uninstalledPackages: [],
            simpleList: [],
        }
    );

const installPackages = async ({
    installedDeps,
    neededDeps,
}: FullDependencies) => {
    const { uninstalledPackages, simpleList } = getUninstalledPackages({
        installedDeps,
        neededDeps,
    });

    if (uninstalledPackages.length > 0) {
        await inquirer
            .prompt([constants.installer.confirmation(simpleList)])
            .then(({ confirmation }) => {
                if (confirmation) {
                    specialLog({
                        message: "Installing dependencies",
                        situation: "PROCESS",
                    });
                    uninstalledPackages.forEach(
                        ({ packageName, commandType }) => {
                            specialLog({
                                message: `${packageName} is done`,
                                situation: "RESULT",
                            });
                            console.log(
                                execSync(
                                    `npm install ${commandType} ${packageName}`
                                ).toString()
                            );
                        }
                    );
                    specialLog({
                        message: "Process done",
                        situation: "RESULT",
                    });
                } else {
                    specialLog({
                        message:
                            "Process is canceled! (no dependencies have ben installed)",
                        situation: "ERROR",
                    });
                }
            });
    } else {
        specialLog({
            message: "You have all the required dependencies",
            situation: "MESSAGE",
        });
    }
};

export default installPackages;
