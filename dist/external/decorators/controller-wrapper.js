import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
export const ControllerWrapper = (section) => {
    const capitalized = section.charAt(0).toUpperCase() + section.slice(1);
    return (target) => {
        Controller(section)(target);
        ApiTags(capitalized)(target);
        ApiBearerAuth()(target);
    };
};
//# sourceMappingURL=controller-wrapper.js.map