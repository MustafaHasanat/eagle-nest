import { FilterOperator } from "external/enums/filters.js";
export declare enum FilteredTermDataType {
    STRING = "string",
    NUMBER = "number"
}
export type GetConditionsProps<FieldType> = {
    filteredTerm: {
        dataType: FilteredTermDataType;
        value: string | number;
    };
    filterOperator: FilterOperator;
    field: FieldType;
};
export type GetAllProps<FieldType> = {
    conditions: GetConditionsProps<FieldType>[];
    sortBy?: FieldType;
    reverse?: boolean;
    page?: number;
};
export type GetQueryProps<FieldType> = {
    sortBy: FieldType;
    reverse: string;
    page: number;
    conditions: string[];
};
