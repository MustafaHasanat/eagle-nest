import { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type.js';
export declare function GetAllWrapper({ fieldsEnum }: {
    fieldsEnum: SwaggerEnumType;
}): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
