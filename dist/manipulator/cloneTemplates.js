import { join } from "path";
import { writeFile } from "fs/promises";
import pathCreator from "../utils/pathCreator.js";
import replaceStrings from "../utils/replaceStrings.js";
import { readFile } from "fs/promises";
import getRelativePath from "../utils/getRelativePath.js";
/**
 * Create a copy of a template file with replacing the placeholders by a specific text
 *
 * @param files[] A list of objects to be addressed, each on contains:
 *      @param target The relative path for the template file
 *      @param dest The destination path
 *      @param newFileName The new name for the created file
 *      @param replacements[] A list of pairs to be replaced
 *          @param oldString The old string
 *          @param newString The new string
 * @usage
 * await manipulator.cloneTemplates([
 *  {
 *      target: "templates/base/typescript/app/main-file.txt",
 *      dest: ".",
 *      newFileName: "main.ts",
 *      replacements: [
 *          {
 *              oldString: "PROJECT_NAME",
 *              newString: answers.projectName,
 *          },
 *      ],
 *  }
 * ]);
 */
const cloneTemplates = async (files) => {
    await Promise.all(files.map(async ({ target, dest, newFileName, replacements = [], }) => {
        try {
            const outputFilePath = join(process.cwd(), dest, newFileName);
            pathCreator([dest]);
            const contents = await readFile(join(getRelativePath("../.."), target), "utf8");
            const modifiedFile = await replaceStrings({
                contents,
                items: replacements,
            });
            await writeFile(outputFilePath, modifiedFile, "utf8");
            console.log(`Great!! .. file '${newFileName}' has been saved successfully at '${process.cwd()}/${dest}'`);
        }
        catch (error) {
            console.log(`Error occurred at the cloneTemplates: ${error}`);
        }
    }));
};
export default cloneTemplates;
//# sourceMappingURL=cloneTemplates.js.map