import { existsSync } from "fs";
const pathConvertor = (dest, suffix) => `${dest || ""}${dest ? "/" : ""}${suffix}`;
const filesExist = (files) => {
    const results = [];
    files.forEach((file) => {
        if (!existsSync(file)) {
            results.push(file);
        }
    });
    return results;
};
const firstCharToUpper = (string) => {
    if (string.length < 2) {
        throw new Error("The string is too short!");
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
};
const firstCharToLower = (string) => {
    if (string.length < 2) {
        throw new Error("The string is too short!");
    }
    return string.charAt(0).toLocaleLowerCase() + string.slice(1);
};
const pluralize = (string) => {
    // const pluralRegex = /(?:[aeiou]ss|[^aeiou]s)$/i;
    // const isPlural = pluralRegex.test(word);
    // if (isPlural) return word;
    const endWithYRegex = /[^aeiou]y$/i;
    const isEndWithY = endWithYRegex.test(string);
    if (isEndWithY) {
        return string.replace(/y$/i, "ies");
    }
    const specialCasesRegex = /(o|s|x|z|ch|sh)$/i;
    const isSpecialCase = specialCasesRegex.test(string);
    if (isSpecialCase) {
        return string + "es";
    }
    return string + "s";
};
export { pathConvertor, filesExist, firstCharToUpper, firstCharToLower, pluralize, };
//# sourceMappingURL=filesHelpers.js.map