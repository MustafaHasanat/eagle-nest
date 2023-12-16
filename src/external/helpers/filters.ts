import {
    Equal,
    FindManyOptions,
    LessThan,
    LessThanOrEqual,
    Like,
    MoreThan,
    MoreThanOrEqual,
} from "typeorm";

import { GetAllProps } from "../types/getOperators";
import { FilterOperator, SortDirection } from "../enums/filters";

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

export { filteredGetQuery };
