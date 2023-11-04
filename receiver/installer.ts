import Constants from "../constants/index.js";
import inquirer from "inquirer";

export class Installer {
    constructor(constants: Constants) {
        this.constants = constants;
    }
    constants;

    checkPackageIfExist = async (packageName: string): Promise<boolean> => {
        // TODO: check if the package is installed or not
        return false;
    };

    installPackage = async (packageName: string): Promise<boolean> => {
        let answer = false;
        await inquirer
            .prompt([
                this.constants.receiver.installer.confirmation(packageName),
            ])
            .then(async (answers) => {
                if (answers.confirmation) {
                    // TODO: install the package here
                    answer = true;
                }
            });
        return answer;
    };

    installPackages = async (packages: string[]) => {
        for (let index = 0; index < packages.length; index++) {
            const packageName = packages[index];

            if (!(await this.checkPackageIfExist(packageName))) {
                const isInstalled = await this.installPackage(packageName);
            }
        }
    };
}
