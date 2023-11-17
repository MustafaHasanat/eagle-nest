import {
    NestInterceptor,
    Type,
    UseInterceptors,
    applyDecorators,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import {
    ApiBody,
    ApiConsumes,
    ApiOkResponse,
    ApiOperation,
  } from '@nestjs/swagger';
  
  export function EditorsWrapper(
    dto: any,
    requestBody: {
      consumes: string[];
      produces: string[];
      schema: any;
    },
    summary: string,
    interceptor: Type<NestInterceptor<any, any>> = FileInterceptor(''),
  ) {
    return applyDecorators(
      ApiOkResponse({ type: dto }),
      ApiConsumes('multipart/form-data'),
      ApiConsumes('application/json'),
      ApiBody(requestBody),
      ApiOperation({ summary }),
      UseInterceptors(interceptor),
    );
  }