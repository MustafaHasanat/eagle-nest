#! /usr/bin/env node
"use strict";

import { AdminsOnly } from "./lib/external/decorators/admins.js";
import ControllerWrapper from "./lib/external/decorators/controller-wrapper.js";
import EditorsWrapper from "./lib/external/decorators/editors-wrapper.js";
import { MembersOnly } from "./lib/external/decorators/members.js";
import { FilterOperator, SortDirection } from "./lib/external/enums/filters.js";
import {
    filteredGetQuery,
    filterNullsObject,
    filterNullsArray,
} from "./lib/external/helpers/filters.js";
import {
    foundRes,
    notFoundRes,
    newInstanceRes,
    forbiddenRes,
    deletedRes,
    errorRes,
} from "./lib/external/responses/restResponse.js";
import {
    validRes,
    invalidRes,
    validationError,
} from "./lib/external/responses/validationResponse.js";
import CustomResponseType from "./lib/external/types/customResponseType.js";
import {
    FilteredTermDataType,
    GetConditionsProps,
    GetAllProps,
    GetQueryProps,
} from "./lib/external/types/getOperators.js";
import GetAllWrapper from "./lib/external/decorators/get-all-wrapper.js";
import {
    validateNewInstance,
    validateGetConditions,
    emailValidator,
} from "./lib/external/helpers/validators.js";
import {
    sendEmail,
    checkForUniqueness,
} from "./lib/external/helpers/services.js";
import { mailing } from "./lib/external/constants/services.js";
import InitAction from "./lib/actions/index.js";

InitAction();

export {
    mailing,
    sendEmail,
    checkForUniqueness,
    emailValidator,
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
