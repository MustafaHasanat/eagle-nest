import { join } from "path";
import { InjectTemplate, InjectionAction } from "../types/injectTemplate.js";
import { readFile, writeFile } from "fs/promises";
import replaceStrings from "../utils/replaceStrings.js";

/**
 * Type for the injectString function
 */
type InjectStringProps = {
    original: string;
    keyword: string;
    addition: string;
};

/**
 * Injects the 'addition' string at the 'keyword' index inside the 'original' string
 *
 * @param original The original string
 * @param keyword The injection string to be found (inject at the start if equals a star: *)
 * @param addition The content string to be added to the original file
 * @returns The resultant string
 */
const injectString = (props: InjectStringProps): string => {
    const { original, keyword, addition } = props;
    const index = original.indexOf(keyword);
    if (index === -1) {
        throw new Error(
            `'keyword=${keyword}' doesn't exist ing the 'original' string`
        );
    }

    const injectPosition = keyword === "*" ? 0 : index + keyword.length;
    const [leftSide, rightSide] = [
        original.slice(0, injectPosition),
        original.slice(injectPosition),
    ];

    return leftSide + addition + rightSide;
};

/**
 * Recursively inject the targets into the injectable string
 *
 * @param actions[] A list of injection objects (check the injectTemplates function for more details)
 * @param injectableContents The accumulated result of the original content after injecting all the action objects 
 * @returns The final result of the file after injecting all the contents
 */
const injectionAction = async ({
    actions,
    injectableContents,
}: {
    actions: InjectionAction[];
    injectableContents: string;
}): Promise<string> => {
    if (!actions.length) {
        return injectableContents;
    }
    const {
        target,
        keyword,
        replacements = [],
        targetIsFile = true,
    } = actions[0];

    const targetContents = targetIsFile
        ? await readFile(join(process.cwd(), target), "utf8")
        : target;

    const modifiedTarget = await replaceStrings({
        contents: targetContents,
        items: replacements,
    });

    const modifiedInjectable = injectString({
        original: injectableContents,
        keyword,
        addition: modifiedTarget,
    });

    return await injectionAction({
        actions: actions.slice(1),
        injectableContents: modifiedInjectable,
    });
};

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
const injectTemplates = async (files: InjectTemplate[]) => {
    files.forEach(async (file: InjectTemplate) => {
        try {
            const injectablePath = join(process.cwd(), file.injectable);
            const injectableContents = await readFile(injectablePath, "utf8");

            const modifiedInjectable = await injectionAction({
                actions: file.actions,
                injectableContents,
            });

            await writeFile(injectablePath, modifiedInjectable, "utf8");

            console.log(
                `Great!! .. file '${file.injectable}' has been modified successfully!`
            );
        } catch (error) {
            console.log(`Error occurred at the injectTemplate: ${error}`);
        }
    });
};

export default injectTemplates;
