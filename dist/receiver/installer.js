import inquirer from "inquirer";
import { execSync } from "child_process";
import constants from "../constants/receiverConstants.js";
export class Installer {
    constructor() {
        console.log("Checking your dependencies ...\n");
        const deps = execSync("npm ls --depth=0").toString();
        this.dependencies = deps
            .split(" ")
            .slice(2)
            .map((item) => item.slice(0, item.lastIndexOf("@")));
    }
    dependencies = [];
    getUninstalledPackages = (packages) => packages.reduce((acc, packageData) => {
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
    }, {
        uninstalledPackages: [],
        simpleList: [],
    });
    installPackages = async (packages) => {
        const { uninstalledPackages, simpleList } = this.getUninstalledPackages(packages);
        if (uninstalledPackages.length > 0) {
            await inquirer
                .prompt([constants.installer.confirmation(simpleList)])
                .then(({ confirmation }) => {
                if (confirmation) {
                    console.log("Installing dependencies ...");
                    uninstalledPackages.forEach(({ packageName, commandType }) => {
                        console.log(`-------- ${packageName} --------`);
                        console.log(execSync(`npm install ${commandType} ${packageName}`).toString());
                    });
                }
            });
            console.log("-------- Process done! --------\n");
        }
        else {
            console.log("-------- You have all required dependencies! --------\n");
        }
    };
}
//# sourceMappingURL=installer.js.map