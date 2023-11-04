import { readFile, writeFile, existsSync, mkdirSync } from "fs";
import { join } from "path";

export default class Manipulator {
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
    createPathsIfNotExist(path: string, prefix: string = "") {
        const segments = path.split("/");

        const newPath = prefix + (prefix ? "/" : "") + segments[0];
        if (!existsSync(newPath)) {
            mkdirSync(newPath);
        }

        if (segments.length > 1) {
            this.createPathsIfNotExist(segments.slice(1).join("/"), newPath);
        } else if (segments.length === 1) {
            return;
        }
    }

    /**
     * Replace all occurrences of the the string with the new ones
     *
     * @param contents The parsed contents of the file
     * @param oldString The old text to be found
     * @param newString The new string to be added
     * @returns
     */
    replaceStrings(contents: string, oldString: string, newString: string) {
        const regexPattern = new RegExp(oldString, "g");
        const modifiedContent = contents.replace(regexPattern, newString);
        return modifiedContent;
    }

    /**
     * Create a copy of a template file with replacing the placeholders by a specific text 
     * 
     * @param target The relative path for the template file 
     * @param dist The destination path 
     * @param newFileName The new name for the created file
     * @param placeholder The placeholder presented in the target file (always written in snake uppercase format)
     * @param replacement The new text that will replace the placeholder
     * 
     * @usage
     * await getCopy(
     *      "src/templates/html/landingPage.html",
            "src/assets/html",
            "output.html",
            "PROJECT_NAME",
            "Test Project"
        );
     */
    async cloneTemplate(
        target: string,
        dist: string,
        newFileName: string,
        placeholder: string,
        replacement: string
    ) {
        try {
            const inputFilePath = join(process.cwd(), target);
            const outputFilePath = join(process.cwd(), dist, newFileName);

            readFile(inputFilePath, "utf8", async (error, data: string) => {
                if (error) {
                    console.error(`Error reading the input file: ${error}`);
                    return;
                }

                this.createPathsIfNotExist(dist);

                const modifiedFile = this.replaceStrings(
                    data,
                    placeholder,
                    replacement
                );

                writeFile(outputFilePath, modifiedFile, "utf8", (error) => {
                    if (error) {
                        console.error(
                            `Error writing the output file: ${error}`
                        );
                    } else {
                        console.log(
                            `File ${newFileName} has been saved successfully at ${process.cwd()}/${dist}`
                        );
                    }
                });
            });
        } catch (error) {
            console.log(`Error occurred at the getCopy: ${error}`);
        }
    }
}
