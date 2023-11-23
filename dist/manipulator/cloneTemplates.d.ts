import CloneTemplate from "../types/cloneTemplate.js";
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
declare const cloneTemplates: (files: CloneTemplate[]) => Promise<boolean>;
export default cloneTemplates;
