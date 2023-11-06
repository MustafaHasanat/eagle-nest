import { readFile, writeFile, existsSync, mkdirSync } from "fs";
import { join } from "path";
import CloneTemplate from "../types/cloneTemplate.js";
import confirm from "@inquirer/confirm";
import InjectTemplate from "types/injectTemplate.js";

type ReplaceStringsProps = {
    contents: string;
    items: {
        oldString: string;
        newString: string;
    }[];
};

type InjectStringProps = {
    original: string;
    keyword: string;
    replacement: string;
};

export default class Manipulator {
    enterKey = `
    
    `;

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
    private createPathsIfNotExist(path: string, prefix: string = "") {
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
     * @param items An array of items to be replaced in the contents, each of them has 'oldString' and 'newString'
     * @returns
     */
    private replaceStrings(props: ReplaceStringsProps): string {
        const { contents, items } = props;
        let modifiedContent = contents;

        for (let i = 0; i < items.length; i++) {
            const { oldString, newString } = items[i];
            const regexPattern = new RegExp(oldString, "g");
            modifiedContent = contents.replace(regexPattern, newString);
        }

        return modifiedContent;
    }

    private injectString(props: InjectStringProps): string {
        const { original, keyword, replacement } = props;
        const injectPosition = keyword === "*" ? 0 : original.indexOf(keyword) + keyword.length;

        const [leftSide, rightSide] = [
            original.slice(0, injectPosition),
            original.slice(injectPosition),
        ];

        return leftSide + replacement + rightSide;
    }
    /**
     * Create a copy of a template file with replacing the placeholders by a specific text 
     * 
     * @param target The relative path for the template file 
     * @param dest The destination path 
     * @param newFileName The new name for the created file
     * @param placeholder The placeholder presented in the target file (always written in snake uppercase format)
     * @param replacement The new text that will replace the placeholder
     * 
     * @usage
     * await getCopy([
     *      "src/templates/html/landingPage.html",
            "src/assets/html",
            "output.html",
            "PROJECT_NAME",
            "Test Project"
        ]);
     */
    async cloneTemplates(files: CloneTemplate[]) {
        const answer = await confirm({
            message: `May we overwrite the files if they exist at the directory?`,
            default: true,
        });

        if (!answer) {
            console.log(
                "You have to allow us to overwrite so we can make changes!"
            );
            return;
        }

        await Promise.all(
            files.map(
                async ({
                    target,
                    dest,
                    newFileName,
                    replacements = [],
                }: CloneTemplate) => {
                    try {
                        const inputFilePath = join(process.cwd(), target);
                        const outputFilePath = join(
                            process.cwd(),
                            dest,
                            newFileName
                        );

                        readFile(
                            inputFilePath,
                            "utf8",
                            async (error, data: string) => {
                                if (error) {
                                    console.error(
                                        `Error reading the input file: ${error}`
                                    );
                                    return;
                                }

                                this.createPathsIfNotExist(dest);
                                const modifiedFile = this.replaceStrings({
                                    contents: data,
                                    items: replacements,
                                });

                                writeFile(
                                    outputFilePath,
                                    modifiedFile,
                                    "utf8",
                                    (error) => {
                                        if (error) {
                                            console.error(
                                                `Error writing the output file: ${error}`
                                            );
                                        } else {
                                            console.log(
                                                `Great!! .. file '${newFileName}' has been saved successfully at '${process.cwd()}/${dest}'`
                                            );
                                        }
                                    }
                                );
                            }
                        );
                    } catch (error) {
                        console.log(`Error occurred at the getCopy: ${error}`);
                    }
                }
            )
        );
    }

    async injectTemplate(files: InjectTemplate[]) {
        const answer = await confirm({
            message: `May we overwrite the files if they exist at the directory?`,
            default: true,
        });

        if (!answer) {
            console.log(
                "You have to allow us to overwrite so we can make changes!"
            );
            return;
        }

        await Promise.all(
            files.map(
                async ({
                    target,
                    injectable,
                    keyword,
                    replacements = [],
                }: InjectTemplate) => {
                    try {
                        const targetPath = join(process.cwd(), target);
                        const injectablePath = join(process.cwd(), injectable);

                        readFile(
                            targetPath,
                            "utf8",
                            async (error, targetData: string) => {
                                if (error) {
                                    console.error(
                                        `Error reading the input file: ${error}`
                                    );
                                    return;
                                }

                                const modifiedTarget = this.replaceStrings({
                                    contents: targetData,
                                    items: replacements,
                                });

                                readFile(
                                    injectablePath,
                                    "utf8",
                                    async (error, injectableData: string) => {
                                        if (error) {
                                            console.error(
                                                `Error reading the input file: ${error}`
                                            );
                                            return;
                                        }

                                        const modifiedInjectable =
                                            this.injectString({
                                                original: injectableData,
                                                keyword,
                                                replacement: modifiedTarget,
                                            });

                                        writeFile(
                                            injectablePath,
                                            modifiedInjectable,
                                            "utf8",
                                            (error) => {
                                                if (error) {
                                                    console.error(
                                                        `Error writing the output file: ${error}`
                                                    );
                                                } else {
                                                    console.log(
                                                        `Great!! .. file '${injectable}' has been modified successfully!`
                                                    );
                                                }
                                            }
                                        );
                                    }
                                );
                            }
                        );
                    } catch (error) {
                        console.log(`Error occurred at the getCopy: ${error}`);
                    }
                }
            )
        );
    }
}
