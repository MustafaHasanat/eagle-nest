import { join, dirname } from "path";
/**
 * Returns the root path for the project
 * This is used to get to the root dir of the package installed in another device so we can reach the static files
 *
 * @param relativePathToRoot The path to the root from the calling file (it will be something like this: "../../..")
 * @returns The root dir of this project regardless of the device
 */
const getCurrentRelativePath = (relativePathToRoot) => {
    const currentModuleDir = dirname(new URL(import.meta.url).pathname);
    const rootDir = join(currentModuleDir, relativePathToRoot);
    return rootDir;
};
const getRelativePathFromDirs = (srcDir, distDir) => {
    const srcDirs = srcDir.split("/");
    const distDirs = distDir.split("/");
    [...srcDirs].forEach((srcElement) => {
        if (distDirs.includes(srcElement)) {
            delete srcDirs[0];
            delete distDirs[0];
        }
    });
    console.log(srcDirs);
    console.log(distDirs);
    return (srcDirs.reduce((acc, curr) => acc + "../", "") +
        distDirs.join("/"));
};
export { getCurrentRelativePath, getRelativePathFromDirs };
//# sourceMappingURL=pathHelpers.js.map