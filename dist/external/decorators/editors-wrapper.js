import { UseInterceptors, applyDecorators, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, } from '@nestjs/swagger';
export function EditorsWrapper(dto, requestBody, summary, interceptor = FileInterceptor('')) {
    return applyDecorators(ApiOkResponse({ type: dto }), ApiConsumes('multipart/form-data'), ApiConsumes('application/json'), ApiBody(requestBody), ApiOperation({ summary }), UseInterceptors(interceptor));
}
//# sourceMappingURL=editors-wrapper.js.map