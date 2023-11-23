/**
 * Assure that a path exists, then create it with all its descendant sub-paths
 *
 * @param path The path to be checked
 * @param prefix Used to accumulate the path recursively (internal use only)
 *
 * @usage
 * createPathsIfNotExist("src/assets/html");
 *
 * > then 3 folders will be created if any of them doesn't exist
 * --> src/
 * --> src/assets/
 * --> src/assets/html/
 */
declare const pathCreator: (paths: string[], prefix?: string) => void;
export default pathCreator;
