/* eslint-disable prefer-const */
function filterNullsObject<DataType>(object: any): DataType {
    try {
        if (!object) return {} as DataType;

        let newObject: { [key: string]: any } = {};

        Object.entries(object).forEach((entry) => {
            const [key, value] = entry;

            if (value) {
                newObject[`${key}`] = value;
            }
        });

        return newObject as DataType;
    } catch (error) {
        console.log(error);
        return {} as DataType;
    }
}

const filterNullsArray = (array: any[]) => {
    try {
        if (!array) return [];

        const newArray = array.reduce((acc, item) => {
            const newItem = item ? [item] : [];
            return [...acc, ...newItem];
        }, []);

        return newArray;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export { filterNullsObject, filterNullsArray };
