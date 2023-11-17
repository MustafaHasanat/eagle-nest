/* eslint-disable prefer-const */
function filterNullsObject(object) {
    try {
        if (!object)
            return {};
        let newObject = {};
        Object.entries(object).forEach((entry) => {
            const [key, value] = entry;
            if (value) {
                newObject[`${key}`] = value;
            }
        });
        return newObject;
    }
    catch (error) {
        console.log(error);
        return {};
    }
}
const filterNullsArray = (array) => {
    try {
        if (!array)
            return [];
        const newArray = array.reduce((acc, item) => {
            const newItem = item ? [item] : [];
            return [...acc, ...newItem];
        }, []);
        return newArray;
    }
    catch (error) {
        console.log(error);
        return [];
    }
};
export { filterNullsObject, filterNullsArray };
//# sourceMappingURL=filterNulls.js.map