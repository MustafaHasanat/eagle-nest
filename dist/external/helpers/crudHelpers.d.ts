import { FindManyOptions } from "typeorm";
import { GetAllProps, GetConditionsProps } from "../../external/types/getOperators.js";
import CustomResponseType from "external/types/customResponseType.js";
declare function validateGetConditions<FieldType>(conditions: any): GetConditionsProps<FieldType>[];
declare function filteredGetQuery({ sortBy, reverse, page, conditions, }: GetAllProps<any>): {
    message: string;
    data: FindManyOptions;
    status: number;
};
declare function validateCreateUpdate({ dto, data, }: {
    dto: any;
    data: any;
}): Promise<CustomResponseType<string[]>>;
export { filteredGetQuery, validateCreateUpdate, validateGetConditions };
