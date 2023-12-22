import { CloneTemplate } from "types/cloneTemplate";
import { InjectTemplate } from "../types/injectTemplate.js";
import { logNumberedList, specialLog } from "../utils/helpers/logHelpers.js";
import injectTemplates from "./injector.js";
import cloneTemplates from "./cloner.js";
import { missingFiles } from "../utils/helpers/filesHelpers.js";
import { join } from "path";
import { execSync } from "child_process";
import { MemorizerProps, memorizer } from "./memorizer.js";

interface ManipulatorProps {
    injectionCommands?: InjectTemplate[];
    cloningCommands?: CloneTemplate[];
    memo?: MemorizerProps;
}

export default async function manipulator({
    cloningCommands = [],
    injectionCommands = [],
    memo,
}: ManipulatorProps): Promise<boolean> {
    try {
        memo && (await memorizer(memo));

        const injectableFiles = injectionCommands.reduce(
            (acc: string[], { injectable }) => [
                ...acc,
                join(process.cwd(), injectable),
            ],
            []
        );

        const missingFilesRes = missingFiles(injectableFiles);
        if (missingFilesRes.length > 0) {
            specialLog({
                message:
                    "You must have these files first so we can modify them",
                situation: "ERROR",
            });
            logNumberedList(missingFilesRes);
            return false;
        }

        // apply the cloning commands
        const isCloneDone =
            cloningCommands.length > 0
                ? await cloneTemplates(cloningCommands)
                : true;
        if (!isCloneDone) return false;

        // apply the injection commands - only if the cloning stage was successful
        const isInjectDone =
            injectionCommands.length > 0
                ? await injectTemplates(injectionCommands)
                : true;

        // format the entire app using Prettier - only if the injection stage was successful
        if (isInjectDone) {
            execSync("npx prettier --write .");
            specialLog({
                situation: "RESULT",
                message: "All processes are done",
            });
            return true;
        }
        return false;
    } catch (error) {
        specialLog({ situation: "ERROR", message: `${error}` });
        return false;
    }
}
