#! /usr/bin/env node
"use strict";

import { AdminsOnly } from "./src/external/decorators/admins.js";
import ControllerWrapper from "./src/external/decorators/controller-wrapper.js";
import EditorsWrapper from "./src/external/decorators/editors-wrapper.js";
import { MembersOnly } from "./src/external/decorators/members.js";
import { FilterOperator, SortDirection } from "./src/external/enums/filters.js";
import { filteredGetQuery } from "./src/external/helpers/filters.js";
import {
    filterNullsArray,
    filterNullsObject,
} from "./src/external/helpers/filterNulls.js";
import {
    foundRes,
    notFoundRes,
    createUpdateRes,
    forbiddenRes,
    deletedRes,
    errorRes,
} from "./src/external/responses/crudResponse.js";
import {
    validRes,
    invalidRes,
    validationError,
} from "./src/external/responses/validationResponse.js";
import CustomResponseType from "./src/external/types/customResponseType.js";
import {
    FilteredTermDataType,
    GetConditionsProps,
    GetAllProps,
    GetQueryProps,
} from "./src/external/types/getOperators.js";
import GetAllWrapper from "./src/external/decorators/get-all-wrapper.js";
import {
    validateNewInstance,
    validateGetConditions,
} from "./src/external/helpers/validators.js";

import { Command } from "commander";
import InitAction from "./src/actions/index.js";

// Initialize the cli-tool app
const app = new Command();
InitAction(app);

export {
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
    createUpdateRes,
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
