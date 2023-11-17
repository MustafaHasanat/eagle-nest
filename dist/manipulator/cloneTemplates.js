import { join } from "path";
import { readFile, writeFile } from "fs/promises";
import pathCreator from "../utils/pathCreator.js";
import replaceStrings from "../utils/replaceStrings.js";
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
const cloneTemplates = async (files) => {
    await Promise.all(files.map(async ({ target, dest, newFileName, replacements = [], }) => {
        try {
            const inputFilePath = join(process.cwd(), target);
            const outputFilePath = join(process.cwd(), dest, newFileName);
            const contents = await readFile(inputFilePath, "utf8");
            pathCreator([{ path: dest }]);
            const modifiedFile = await replaceStrings({
                contents,
                items: replacements,
            });
            await writeFile(outputFilePath, modifiedFile, "utf8");
            console.log(`Great!! .. file '${newFileName}' has been saved successfully at '${process.cwd()}/${dest}'`);
        }
        catch (error) {
            console.log(`Error occurred at the getCopy: ${error}`);
        }
    }));
};
export default cloneTemplates;
//# sourceMappingURL=cloneTemplates.js.map