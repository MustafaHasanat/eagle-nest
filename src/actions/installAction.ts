import { execSync } from "child_process";
import specialLog from "../utils/helpers/specialLog.js";
import constants from "../utils/constants/newActionConstants.js";

const installAction = async () => {
    try {
        specialLog({
            message: "Installing dependencies",
            situation: "PROCESS",
        });
        execSync(`npm i --save ${constants.nestDependencies.join(" ")}`);

        specialLog({
            message: "Installing dev-dependencies",
            situation: "PROCESS",
        });
        execSync(`npm i --save-dev ${constants.nestDevDependencies.join(" ")}`);
    } catch (error) {
        specialLog({
            message: `${error}`,
            situation: "ERROR",
            scope: "newAction",
        });
        return;
    }
};

export default installAction;
