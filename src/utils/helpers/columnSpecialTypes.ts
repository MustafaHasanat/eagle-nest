import { InjectTemplate } from "../../types/injectTemplate";
import { ColumnTypeChoice } from "../../enums/columns";
import inquirer from "inquirer";
import replaceStrings from "./replaceStrings";
import constants from "../../utils/constants/builderConstants.js";

// --- interfaces ---

interface AddSpecialItemsProps {
    columnType: ColumnTypeChoice;
    entityProperties: string | null;
    dtoProperties: string | null;
    decorators: {
        decoratorsValues: string | null;
        decoratorsImports: string | null;
    };
}

// --- methods ---

const appendItem = (original: string | null, item: string): string => {
    if (!original || original === "") return item;
    else return `${original}, ${item}`;
};

const addSpecialItems = async ({
    columnType,
    entityProperties,
    dtoProperties,
    decorators: { decoratorsValues, decoratorsImports },
}: AddSpecialItemsProps): Promise<{
    fullEntityProperties: string | null;
    fullDtoProperties: string | null;
    fullDecorators: {
        decoratorsValues: string | null;
        decoratorsImports: string | null;
    };
    specialInjections: InjectTemplate[];
}> => {
    const fullEntityProperties = entityProperties;
    const fullDtoProperties = dtoProperties;
    const fullDecorators = { decoratorsValues, decoratorsImports };

    if (decoratorsValues) {
        if (decoratorsValues.indexOf("MIN_LENGTH") !== -1) {
            await inquirer
                .prompt([constants.createColumn.stringLength])
                .then(async ({ stringLength }) => {
                    const [minimum, maximum] = stringLength.split(",");
                    await replaceStrings({
                        contents: decoratorsValues,
                        items: [
                            {
                                oldString: "MIN_LENGTH",
                                newString: Number(minimum).toString(),
                            },
                            {
                                oldString: "MAX_LENGTH",
                                newString: Number(maximum).toString(),
                            },
                        ],
                    });
                });
        }
    }

    switch (columnType) {
        case ColumnTypeChoice.DATE:
            appendItem(fullEntityProperties, "type: 'date'");
            break;
        case ColumnTypeChoice.TIME:
            appendItem(
                fullEntityProperties,
                "type: 'time', default: new Date().toLocaleTimeString()"
            );
            break;

        default:
            break;
    }

    return {
        fullEntityProperties,
        fullDtoProperties,
        fullDecorators,
        specialInjections: [],
    };
};

export { addSpecialItems };
