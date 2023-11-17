import { join } from "path";
import { InjectTemplate } from "../types/injectTemplate.js";
import { readFile, writeFile } from "fs/promises";
import replaceStrings from "../utils/replaceStrings.js";

type InjectStringProps = {
    original: string;
    keyword: string;
    replacement: string;
};

const injectString = (props: InjectStringProps): string => {
    const { original, keyword, replacement } = props;
    const injectPosition =
        keyword === "*" ? 0 : original.indexOf(keyword) + keyword.length;

    const [leftSide, rightSide] = [
        original.slice(0, injectPosition),
        original.slice(injectPosition),
    ];

    return leftSide + replacement + rightSide;
};

const injectionAction = async ({
    injectable,
    actions,
    injectablePath,
    injectableContents,
}: InjectTemplate & {
    injectablePath: string;
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
        replacement: modifiedTarget,
    });

    return await injectionAction({
        injectable,
        actions: actions.slice(1),
        injectablePath,
        injectableContents: modifiedInjectable,
    });
};

/**
 *
 * @param files
 */
const injectTemplates = async (files: InjectTemplate[]) => {
    files.forEach(async (file: InjectTemplate) => {
        try {
            const injectablePath = join(process.cwd(), file.injectable);
            const injectableContents = await readFile(injectablePath, "utf8");

            const modifiedInjectable = await injectionAction({
                actions: file.actions,
                injectable: file.injectable,
                injectablePath,
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
