import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { GetConditionsProps } from "../../external/types/getOperators";
import CustomResponseType from "external/types/customResponseType";

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

async function validateNewInstance({
    dto,
    data,
}: {
    dto: any;
    data: any;
}): Promise<CustomResponseType<string[]>> {
    try {
        const dtoClass = plainToInstance(dto, data);
        const errors = await validate(dtoClass);

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

export { validateNewInstance, validateGetConditions };
