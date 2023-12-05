import {
    firstCharToLower,
    firstCharToUpper,
    pluralize,
} from "../cliBuilder/helpers/filesHelpers.js";

export const getTableNameVariants = (tableName: string) => {
    const camelCaseName = tableName;
    const upperCaseName = firstCharToUpper(tableName);
    const pluralName = pluralize(tableName);
    const pluralUpperCaseName = firstCharToUpper(pluralName);
    const pluralLowerCaseName = firstCharToLower(pluralName);

    return {
        camelCaseName,
        upperCaseName,
        pluralName,
        pluralUpperCaseName,
        pluralLowerCaseName,
    };
};
