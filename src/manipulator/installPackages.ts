import inquirer from "inquirer";
import { execSync } from "child_process";
import constants from "../utils/constants/creatorConstants.js";
import {
    logCliProcess,
    logCliTitle,
} from "../utils/helpers/logCliDecorators.js";
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

export default installPackages;
