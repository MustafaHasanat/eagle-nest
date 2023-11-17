import inquirer from "inquirer";
import constants from "../constants/receiverConstants.js";
export class Installer {
    checkPackageIfExist = async (packageName) => {
        // TODO: check if the package is installed or not
        return false;
    };
    installPackage = async (packageName) => {
        let answer = false;
        await inquirer
            .prompt([constants.installer.confirmation(packageName)])
            .then(async (answers) => {
            if (answers.confirmation) {
                // TODO: install the package here
                answer = true;
            }
        });
        return answer;
    };
    installPackages = async (packages) => {
        for (let index = 0; index < packages.length; index++) {
            const packageName = packages[index];
            if (!(await this.checkPackageIfExist(packageName))) {
                const isInstalled = await this.installPackage(packageName);
            }
        }
    };
}
//# sourceMappingURL=installer.js.map