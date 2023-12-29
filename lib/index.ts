#! /usr/bin/env node
"use strict";

import { AdminsOnly } from "./external/decorators/admins.js";
import ControllerWrapper from "./external/decorators/controller-wrapper.js";
import EditorsWrapper from "./external/decorators/editors-wrapper.js";
import { MembersOnly } from "./external/decorators/members.js";
import { FilterOperator, SortDirection } from "./external/enums/filters.js";
import {
    filteredGetQuery,
    filterNullsObject,
    filterNullsArray,
} from "./external/helpers/filters.js";
import {
    foundRes,
    notFoundRes,
    newInstanceRes,
    forbiddenRes,
    deletedRes,
    errorRes,
} from "./external/responses/restResponse.js";
import {
    validRes,
    invalidRes,
    validationError,
} from "./external/responses/validationResponse.js";
import CustomResponseType from "./external/types/customResponseType.js";
import {
    FilteredTermDataType,
    GetConditionsProps,
    GetAllProps,
    GetQueryProps,
} from "./external/types/getOperators.js";
import GetAllWrapper from "./external/decorators/get-all-wrapper.js";
import {
    validateNewInstance,
    validateGetConditions,
    emailValidator,
} from "./external/helpers/validators.js";
import {
    sendEmail,
    passwordRemover,
    checkForUniqueness,
} from "./external/helpers/services.js";
import { EmailOptions } from "./external/types/services.js";
import { mailing } from "./external/constants/services.js";

export {
    mailing,
    sendEmail,
    passwordRemover,
    checkForUniqueness,
    emailValidator,
    EmailOptions,
    AdminsOnly,
    MembersOnly,
    ControllerWrapper,
    EditorsWrapper,
    GetAllWrapper,
    SortDirection,
    FilterOperator,
    filteredGetQuery,
    validateNewInstance,
    validateGetConditions,
    filterNullsObject,
    filterNullsArray,
    foundRes,
    notFoundRes,
    newInstanceRes,
    forbiddenRes,
    deletedRes,
    errorRes,
    validRes,
    invalidRes,
    validationError,
    CustomResponseType,
    FilteredTermDataType,
    GetConditionsProps,
    GetAllProps,
    GetQueryProps,
};
