import { Equal, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, } from "typeorm";
import { FilterOperator, SortDirection } from "external/enums/filters.js";
const mappedOperators = (value) => {
    return {
        moreThan: MoreThan(value),
        moreThanOrEqual: MoreThanOrEqual(value),
        lessThan: LessThan(value),
        lessThanOrEqual: LessThanOrEqual(value),
        stringEquals: Equal(value),
        numberEquals: Equal(value),
        contains: Like(`%${value}%`),
    };
};
const mappingMethod = (field, value, filterOperator) => {
    return {
        [field]: mappedOperators(value)[`${filterOperator}`],
    };
};
function validateGetConditions(conditions) {
    if (conditions) {
        try {
            return conditions.map((condition) => JSON.parse(condition));
        }
        catch (error) {
            return [
                JSON.parse(`${conditions}`),
            ];
        }
    }
    else {
        return [];
    }
}
function filteredGetQuery({ sortBy, reverse, page = 1, conditions, }) {
    try {
        const whereQuery = {};
        if (page < 0) {
            return {
                message: "Page number must be a positive integer or a zero",
                data: {},
                status: 400,
            };
        }
        conditions.forEach((condition) => {
            const { field, filterOperator, filteredTerm: { dataType, value }, } = condition;
            const isNumber = ![
                FilterOperator.CONTAINS,
                FilterOperator.STRING_EQUALS,
            ].includes(filterOperator);
            if (isNumber && dataType === "string") {
                return {
                    message: "The inputs (field, filterOperator, filteredTerm.dataType, filteredTerm.value) must be consistent",
                    data: null,
                    status: 400,
                };
            }
            const where = mappingMethod(field, isNumber ? value : value, filterOperator);
            whereQuery[field] = where[field];
        });
        const pageOptions = page === 0
            ? {}
            : {
                take: 5,
                skip: 5 * (page - 1),
            };
        return {
            message: "Data retrieved successfully",
            data: {
                where: { ...whereQuery },
                order: {
                    [sortBy]: reverse ? SortDirection.DESC : SortDirection.ASC,
                },
                ...pageOptions,
            },
            status: 200,
        };
    }
    catch (error) {
        console.log(error);
        return {
            message: "Error occurred",
            data: error,
            status: 500,
        };
    }
}
async function validateCreateUpdate({ dto, data, }) {
    try {
        // const dtoClass = plainToClass(dto, data);
        // const errors = await validate(dtoClass);
        const errors = [];
        const errorsArray = [];
        errors.map((error) => {
            if (error.constraints) {
                Object.entries(error.constraints).map((constrain) => {
                    const [key, value] = constrain;
                    errorsArray.push(`${error.property} -> ${key}: ${value}`);
                });
            }
        });
        return {
            message: errorsArray.length === 0
                ? "No errors"
                : "Validation error occurred",
            data: [],
            status: errorsArray.length === 0 ? 200 : 500,
            errors: errorsArray,
        };
    }
    catch (error) {
        console.log(error);
        return {
            message: "Error occurred",
            status: 500,
            data: error,
        };
    }
}
export { filteredGetQuery, validateCreateUpdate, validateGetConditions };
//# sourceMappingURL=crudHelpers.js.map