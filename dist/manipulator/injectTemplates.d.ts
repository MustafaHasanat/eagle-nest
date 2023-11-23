import { InjectTemplate } from "../types/injectTemplate.js";
/**
 * Inject one or more texts or templates in a single injectable file
 *
 * @param files[] A list of object to be addressed
 *      @param injectable The existing file to be modified
 *      @param actions[] A list of injection objects
 *          @param target The source file that has the text to be injected
 *          @param targetIsFile A boolean indication if we need to treat the target as a file or as a simple string
 *          @param keyword A string indicating where in the injectable file do we want to add the new text
 *          @param replacements[] A list of pairs to be replaced in the target file before injection
 *              @param oldString The old string
 *              @param newString The new string
 * @usage
 * await manipulator.injectTemplates(
 *      [
 *          {
 *              injectable: appModuleLocation,
 *              actions: [
 *                 {
 *                    target: "templates/components/typescript/app-module/db/config.txt",
 *                     keyword: "imports: [",
 *                 },
 *                 {
 *                     target: "templates/components/typescript/app-module/db/imports.txt",
 *                     keyword: "*",
 *                     replacements: [
 *                         {
 *                             oldString: "PATH_TO_ENTITIES",
 *                             newString: dest,
 *                         },
 *                     ],
 *                 },
 *             ],
 *         },
 *      ]
 * )
 */
declare const injectTemplates: (files: InjectTemplate[]) => Promise<boolean>;
export default injectTemplates;
