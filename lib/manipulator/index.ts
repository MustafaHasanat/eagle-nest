import { CloneTemplate } from "../types/cloneTemplate";
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
    overwrite: string[];
}

export default async function manipulator({
    cloningCommands = [],
    injectionCommands = [],
    memo,
    overwrite,
}: ManipulatorProps): Promise<boolean> {
    try {
        // memorize the selections
        memo && (await memorizer(memo));
        // check for missing files to inject. if any, terminate the command
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
        // filter the cloning and injecting commands based on the user selection
        const filteredCloningCommands = cloningCommands.filter(
            ({ signature }) => overwrite.includes(signature)
        );
        const filteredInjectionCommands = injectionCommands.filter(
            ({ signature }) => overwrite.includes(signature)
        );
        // apply the cloning commands
        const isCloneDone =
            filteredCloningCommands.length > 0
                ? await cloneTemplates(filteredCloningCommands)
                : true;
        if (!isCloneDone) return false;
        // apply the injection commands - only if the cloning stage was successful
        const isInjectDone =
            filteredInjectionCommands.length > 0
                ? await injectTemplates(filteredInjectionCommands)
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
