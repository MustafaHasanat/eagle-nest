import {
    firstCharToLower,
    firstCharToUpper,
    pluralize,
} from "./filesHelpers.js";

export const getTableNameVariants = (tableName: string) => {
    const camelCaseName = tableName;
    const upperCaseName = firstCharToUpper(tableName);
    const upperSnakeCaseName = tableName.replace(/([a-z])([A-Z])/g, "$1_$2").toUpperCase();
    const pluralName = pluralize(tableName);
    const pluralUpperCaseName = firstCharToUpper(pluralName);
    const pluralLowerCaseName = firstCharToLower(pluralName);

    return {
        camelCaseName,
        upperCaseName,
        upperSnakeCaseName,
        pluralName,
        pluralUpperCaseName,
        pluralLowerCaseName,
    };
};
