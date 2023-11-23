/**
 * Returns the root path for the project
 * This is used to get to the root dir of the package installed in another device so we can reach the static files
 *
 * @param relativePathToRoot The path to the root from the calling file (it will be something like this: "../../..")
 * @returns The root dir of this project regardless of the device
 */
declare const getCurrentRelativePath: (relativePathToRoot: string) => string;
declare const getRelativePathFromDirs: (srcDir: string, distDir: string) => string;
export { getCurrentRelativePath, getRelativePathFromDirs };
