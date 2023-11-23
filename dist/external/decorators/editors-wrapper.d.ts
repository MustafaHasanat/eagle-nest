import { NestInterceptor, Type } from '@nestjs/common';
export declare function EditorsWrapper(dto: any, requestBody: {
    consumes: string[];
    produces: string[];
    schema: any;
}, summary: string, interceptor?: Type<NestInterceptor<any, any>>): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
