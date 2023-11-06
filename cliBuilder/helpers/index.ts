import { existsSync } from "fs";

const pathConvertor = (dest: string, prefix: string) =>
    `${dest || ""}${dest ? "/" : ""}${prefix}`;

const filesExist = (files: string[]) => {
    const results: string[] = [];

    files.forEach((file) => {
        if (!existsSync(file)) {
            results.push(file);
        }
    });

    return results;
};

export { pathConvertor, filesExist };
