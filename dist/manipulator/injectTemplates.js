import { join } from "path";
import { readFile, writeFile } from "fs/promises";
import replaceStrings from "../utils/replaceStrings.js";
const injectString = (props) => {
    const { original, keyword, replacement } = props;
    const injectPosition = keyword === "*" ? 0 : original.indexOf(keyword) + keyword.length;
    const [leftSide, rightSide] = [
        original.slice(0, injectPosition),
        original.slice(injectPosition),
    ];
    return leftSide + replacement + rightSide;
};
const injectionAction = async ({ injectable, actions, injectablePath, injectableContents, }) => {
    if (!actions.length) {
        return injectableContents;
    }
    const { target, keyword, replacements = [], targetIsFile = true, } = actions[0];
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
const injectTemplates = async (files) => {
    files.forEach(async (file) => {
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
            console.log(`Great!! .. file '${file.injectable}' has been modified successfully!`);
        }
        catch (error) {
            console.log(`Error occurred at the injectTemplate: ${error}`);
        }
    });
};
export default injectTemplates;
//# sourceMappingURL=injectTemplates.js.map