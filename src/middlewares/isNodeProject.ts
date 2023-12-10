import { execSync } from "child_process";
import { logCliError } from "../utils/helpers/logCliDecorators.js";

const isNodeProject = () => {
    // check if this is a node project
    const isNodeProject = execSync("ls")
        .toString()
        .split("\n")
        .includes("package.json");

    if (!isNodeProject) {
        logCliError("This is not a Node.js project!", "TOOL MISUSE");
        process.exit(1);
    }
};

export { isNodeProject };
