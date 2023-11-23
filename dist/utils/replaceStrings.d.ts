type ReplaceItem = {
    oldString: string;
    newString: string;
};
type ReplaceStringsProps = {
    contents: string;
    items: ReplaceItem[];
};
/**
 * Replace all occurrences of the the string with the new ones
 *
 * @param contents The parsed contents of the file
 * @param items An array of items to be replaced in the contents, each of them has 'oldString' and 'newString'
 * @returns
 */
declare const replaceStrings: ({ contents, items, }: ReplaceStringsProps) => Promise<string>;
export default replaceStrings;
