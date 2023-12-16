import { join } from "path";
import {
    InjectTemplate,
    InjectionAdditionAction,
    InjectionDeletionAction,
} from "../types/injectTemplate.js";
import { readFile, writeFile } from "fs/promises";
import { replaceStrings } from "../utils/helpers/stringsHelpers.js";
import { missingFiles } from "../utils/helpers/filesHelpers.js";
import { logNumberedList, specialLog } from "../utils/helpers/logHelpers.js";
import { getCurrentRelativePath } from "../utils/helpers/pathHelpers.js";

/**
 * Injects the 'addition' string at the 'keyword' index inside the 'original' string
 *
 * @param original The original string
 * @param keyword The injection string to be found (inject at the start if equals one star '*', and at the end if equals two stars '**')
 * @param addition The content string to be added to the original file
 * @param supposedToBeThere If a string was provided, abort the injection action IF the string was found in the original string
 * @returns The resultant string
 */
const injectString = ({
    original,
    keyword,
    addition: {
        base,
        conditional: { type, data } = {
            type: "NONE",
            data: null,
        },
    },
    replica,
}: InjectionAdditionAction & {
    original: string;
}): string => {
    // abort the injection action if:
    // - the conditional type was 'SUPPOSED_TO_BE_THERE' and was found in the original string
    // - or the 'base' was found in the original string
    if (
        (type === "SUPPOSED_TO_BE_THERE" &&
            original.indexOf(`${data}`) !== -1) ||
        (original.indexOf(base) !== -1 && !replica)
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

    return leftSide + base + rightSide;
};

/**
 * Recursively inject the targets into the injectable string
 *
 * @param actions[] A list of injection objects (check the injectTemplates function for more details)
 * @param injectableContents The accumulated result of the original content after injecting all the action objects
 * @returns The final result of the file after injecting all the contents
 */
const additionAction = async ({
    additions,
    injectableContents,
}: {
    additions: InjectionAdditionAction[];
    injectableContents: string;
}): Promise<string> => {
    if (!additions.length) {
        return injectableContents;
    }
    if (additions[0] === null) {
        return await additionAction({
            additions: additions.slice(1),
            injectableContents,
        });
    }

    const {
        addition: {
            base,
            additionIsFile = true,
            conditional: { type, data } = {
                type: "NONE",
                data: null,
            },
        },
        keyword,
        replacements = [],
        replica = false,
    } = additions[0];

    if (!additionIsFile && replacements.length > 0) {
        specialLog({
            message:
                "You shouldn't have items in 'replacements' while 'additionIsFile' is false!",
            situation: "ERROR",
            scope: "tool misuse",
        });
        return await additionAction({
            additions: additions.slice(1),
            injectableContents,
        });
    }

    if (type === "SUPPOSED_TO_BE_THERE" && replica) {
        specialLog({
            message:
                "You can't have a value for 'SUPPOSED_TO_BE_THERE' and set 'replica' to true!",
            situation: "ERROR",
            scope: "tool misuse",
        });
        return await additionAction({
            additions: additions.slice(1),
            injectableContents,
        });
    }

    // read the contents of the file (if it was a file)
    const additionContents = additionIsFile
        ? await readFile(join(getCurrentRelativePath("../.."), base), "utf8")
        : base;

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
        addition: {
            base: modifiedAddition,
            conditional: {
                type,
                data,
            },
        },
        replica,
    });

    // recursively apply all the actions on teh original file
    return await additionAction({
        additions: additions.slice(1),
        injectableContents: modifiedInjectable,
    });
};

const deletionAction = async ({
    deletions,
    injectableContents,
}: {
    deletions: InjectionDeletionAction[];
    injectableContents: string;
}): Promise<string> => {
    if (!deletions.length) {
        return injectableContents;
    }
    if (deletions[0] === null) {
        return await deletionAction({
            deletions: deletions.slice(1),
            injectableContents,
        });
    }

    const { target } = deletions[0];

    const modifiedInjectable = await replaceStrings({
        contents: injectableContents,
        items: [
            {
                oldString: target,
                newString: "",
            },
        ],
    });

    // recursively apply all the actions on teh original file
    return await deletionAction({
        deletions: deletions.slice(1),
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
            files.map(
                async ({
                    injectable,
                    additions,
                    deletions,
                }: InjectTemplate) => {
                    const injectablePath = join(process.cwd(), injectable);
                    const injectableContents = await readFile(
                        injectablePath,
                        "utf8"
                    );

                    const modifiedStage1 = await additionAction({
                        additions,
                        injectableContents,
                    });

                    const modifiedStage2 = await deletionAction({
                        deletions: deletions || [],
                        injectableContents: modifiedStage1,
                    });

                    await writeFile(injectablePath, modifiedStage2, "utf8");

                    specialLog({
                        message: `File '${injectable}' has been modified successfully`,
                        situation: "MESSAGE",
                    });
                }
            )
        );

        specialLog({
            message: "Injection is done",
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
