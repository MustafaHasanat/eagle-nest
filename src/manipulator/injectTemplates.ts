import { join } from "path";
import { InjectTemplate, InjectionAction } from "../types/injectTemplate.js";
import { readFile, writeFile } from "fs/promises";
import { replaceStrings } from "../utils/helpers/stringsHelpers.js";
import { missingFiles } from "../utils/helpers/filesHelpers.js";
import { logNumberedList, specialLog } from "../utils/helpers/logHelpers.js";
import { getCurrentRelativePath } from "../utils/helpers/pathHelpers.js";

type InjectStringProps = {
    original: string;
    keyword: string;
    addition: string;
    replica: boolean;
    supposedToBeThere: string | null;
};

/**
 * Injects the 'addition' string at the 'keyword' index inside the 'original' string
 *
 * @param original The original string
 * @param keyword The injection string to be found (inject at the start if equals one star '*', and at the end if equals two stars '**')
 * @param addition The content string to be added to the original file
 * @param supposedToBeThere If a string was provided, abort the injection action IF the string was found in the original string
 * @returns The resultant string
 */
const injectString = (props: InjectStringProps): string => {
    const { original, keyword, addition, supposedToBeThere, replica } = props;

    // abort the injection action if:
    // - the 'supposedToBeThere' wasn't a null and was found in the original string
    // - or the 'addition' was found in the original string
    if (
        (supposedToBeThere && original.indexOf(supposedToBeThere) !== -1) ||
        (original.indexOf(addition) !== -1 && !replica)
    ) {
        return original;
    }

    const index = original.indexOf(keyword);
    if (index === -1 && !["*", "**"].includes(keyword)) {
        specialLog({
            message: `'keyword=${keyword}' doesn't exist in the 'original' string`,
            situation: "ERROR",
            scope: "mismatch",
        });
        return original;
    }
    let injectPosition;
    if (keyword === "*") injectPosition = 0;
    else if (keyword === "**") injectPosition = original.length;
    else injectPosition = index + keyword.length;

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
    if (actions[0] === null) {
        return await injectionAction({
            actions: actions.slice(1),
            injectableContents,
        });
    }

    const {
        addition,
        keyword,
        replacements = [],
        additionIsFile = true,
        supposedToBeThere = null,
        replica = false,
    } = actions[0];

    if (!additionIsFile && replacements.length > 0) {
        specialLog({
            message:
                "You shouldn't have items in 'replacements' while 'additionIsFile' is false!",
            situation: "ERROR",
            scope: "tool misuse",
        });
        return await injectionAction({
            actions: actions.slice(1),
            injectableContents,
        });
    }

    if (supposedToBeThere && replica) {
        specialLog({
            message:
                "You can't have a value for 'supposedToBeThere' and set 'replica' to true!",
            situation: "ERROR",
            scope: "tool misuse",
        });
        return await injectionAction({
            actions: actions.slice(1),
            injectableContents,
        });
    }

    // read the contents of the file (if it was a file)
    const additionContents = additionIsFile
        ? await readFile(
              join(getCurrentRelativePath("../.."), addition),
              "utf8"
          )
        : addition;

    // apply all the replacements on the contents
    const modifiedAddition = additionIsFile
        ? await replaceStrings({
              contents: additionContents,
              items: replacements,
          })
        : additionContents;

    // inject the final result into the original file's contents
    const modifiedInjectable = injectString({
        original: injectableContents,
        keyword,
        addition: modifiedAddition,
        supposedToBeThere,
        replica,
    });

    // recursively apply all the actions on teh original file
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
 *          @param addition The source file that has the text to be injected
 *          @param keyword A string indicating where in the injectable file do we want to add the new text
 *          @param additionIsFile A boolean indication if we need to treat the addition as a file or as a simple string
 *          @param supposedToBeThere If a string was provided, abort the injection action IF the string was found in the original string
 *          @param replacements[] A list of pairs to be replaced in the addition file before injection
 *              @param oldString The old string
 *              @param newString The new string
 * @usage
 * await manipulator.injectTemplates(
 *      [
 *          {
 *              injectable: appModuleLocation,
 *              actions: [
 *                 {
 *                     addition: "templates/components/typescript/app/db/config.txt",
 *                     keyword: "imports: [",
 *                 },
 *                 {
 *                     addition: "templates/components/typescript/app/db/imports.txt",
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
const injectTemplates = async (files: InjectTemplate[]): Promise<boolean> => {
    specialLog({
        message: "Injecting templates",
        situation: "PROCESS",
    });
    const injectableFiles = files.reduce(
        (acc: string[], { injectable }) => [
            ...acc,
            join(process.cwd(), injectable),
        ],
        []
    );

    const missingFilesRes = missingFiles(injectableFiles);
    if (missingFilesRes.length > 0) {
        specialLog({
            message: "You must have these files first so we can modify them:",
            situation: "ERROR",
        });
        logNumberedList(missingFilesRes);
        return false;
    }

    try {
        await Promise.all(
            files.map(async ({ injectable, actions }: InjectTemplate) => {
                const injectablePath = join(process.cwd(), injectable);
                const injectableContents = await readFile(
                    injectablePath,
                    "utf8"
                );

                const modifiedInjectable = await injectionAction({
                    actions: actions,
                    injectableContents,
                });

                await writeFile(injectablePath, modifiedInjectable, "utf8");

                specialLog({
                    message: `File '${injectable}' has been modified successfully`,
                    situation: "MESSAGE",
                });
            })
        );

        specialLog({
            message: "Injection is done!",
            situation: "RESULT",
            isBreak: true,
        });
        return true;
    } catch (error) {
        specialLog({
            message: `Error occurred at the injectTemplate: ${error}`,
            situation: "ERROR",
        });
        return false;
    }
};

export default injectTemplates;
