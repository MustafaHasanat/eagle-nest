import {
    Equal,
    FindManyOptions,
    LessThan,
    LessThanOrEqual,
    Like,
    MoreThan,
    MoreThanOrEqual,
} from "typeorm";
import { plainToClass } from "class-transformer";
// import { validate } from "class-validator";

import {
    GetAllProps,
    GetConditionsProps,
} from "../../external/types/getOperators.js";
import { FilterOperator, SortDirection } from "external/enums/filters.js";
import CustomResponseType from "external/types/customResponseType.js";

const mappedOperators = (value: any) => {
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

const mappingMethod = (
    field: any,
    value: number | string,
    filterOperator: FilterOperator
) => {
    return {
        [field]: mappedOperators(value)[`${filterOperator}`],
    };
};

function validateGetConditions<FieldType>(
    conditions: any
): GetConditionsProps<FieldType>[] {
    if (conditions) {
        try {
            return conditions.map((condition: string) =>
                JSON.parse(condition)
            ) as GetConditionsProps<FieldType>[];
        } catch (error) {
            return [
                JSON.parse(`${conditions}`),
            ] as GetConditionsProps<FieldType>[];
        }
    } else {
        return [];
    }
}

function filteredGetQuery({
    sortBy,
    reverse,
    page = 1,
    conditions,
}: GetAllProps<any>): {
    message: string;
    data: FindManyOptions;
    status: number;
} {
    try {
        const whereQuery: { [key: string]: any } = {};

        if (page < 0) {
            return {
                message: "Page number must be a positive integer or a zero",
                data: {},
                status: 400,
            };
        }

        conditions.forEach((condition) => {
            const {
                field,
                filterOperator,
                filteredTerm: { dataType, value },
            } = condition;

            const isNumber = ![
                FilterOperator.CONTAINS,
                FilterOperator.STRING_EQUALS,
            ].includes(filterOperator);

            if (isNumber && dataType === "string") {
                return {
                    message:
                        "The inputs (field, filterOperator, filteredTerm.dataType, filteredTerm.value) must be consistent",
                    data: null,
                    status: 400,
                };
            }

            const where = mappingMethod(
                field,
                isNumber ? (value as number) : value,
                filterOperator
            );

            whereQuery[field] = where[field];
        });

        const pageOptions =
            page === 0
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
    } catch (error: any) {
        console.log(error);
        return {
            message: "Error occurred",
            data: error,
            status: 500,
        };
    }
}

async function validateCreateUpdate({
    dto,
    data,
}: {
    dto: any;
    data: any;
}): Promise<CustomResponseType<string[]>> {
    try {
        // const dtoClass = plainToClass(dto, data);
        // const errors = await validate(dtoClass);
        const errors: any = [];

        const errorsArray: string[] = [];
        errors.map((error: any) => {
            if (error.constraints) {
                Object.entries(error.constraints).map((constrain) => {
                    const [key, value] = constrain;
                    errorsArray.push(`${error.property} -> ${key}: ${value}`);
                });
            }
        });

        return {
            message:
                errorsArray.length === 0
                    ? "No errors"
                    : "Validation error occurred",
            data: [],
            status: errorsArray.length === 0 ? 200 : 500,
            errors: errorsArray,
        };
    } catch (error: any) {
        console.log(error);
        return {
            message: "Error occurred",
            status: 500,
            data: error,
        };
    }
}

export { filteredGetQuery, validateCreateUpdate, validateGetConditions };
