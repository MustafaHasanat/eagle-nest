import { join, dirname } from "path";
/**
 * Returns the root path for the project
 * This is used to get to the root dir of the package installed in another device so we can reach the static files
 *
 * @param relativePathToRoot The path to the root from the calling file (it will be something like this: "../../..")
 * @returns The root dir of this project regardless of the device
 */
const getRelativePath = (relativePathToRoot) => {
    const currentModuleDir = dirname(new URL(import.meta.url).pathname);
    const rootDir = join(currentModuleDir, relativePathToRoot);
    return rootDir;
};
export default getRelativePath;
//# sourceMappingURL=getRelativePath.js.map