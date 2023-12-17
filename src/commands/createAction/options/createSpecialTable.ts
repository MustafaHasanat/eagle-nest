import { CreateTableProps } from "../../../interfaces/cliBuilder.js";
import { InjectTemplate } from "../../../types/injectTemplate.js";
import { CloneTemplate } from "../../../types/cloneTemplate.js";

const createSpecialTableCloning = ({}: CreateTableProps): CloneTemplate[] => [];

const createSpecialTableInjection =
    ({}: CreateTableProps): InjectTemplate[] => [];

export { createSpecialTableCloning, createSpecialTableInjection };
