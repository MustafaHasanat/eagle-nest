import CustomResponseType from "../types/customResponseType.js";
import { SentMessageInfo } from "nodemailer";
import { ISendMailOptions, MailerService } from "@nestjs-modules/mailer";
import { FilteredTermDataType } from "../types/getOperators.js";
import { FilterOperator } from "../enums/filters.js";

async function checkForUniqueness<TableFields, TableEntity>(
    getterFunc: ({
        conditions,
    }: {
        conditions: any;
    }) => Promise<CustomResponseType<TableEntity[]>>,
    items: {
        field: TableFields;
        filteredTerm: {
            dataType: FilteredTermDataType;
            value: any;
        };
        filterOperator: FilterOperator;
    }[]
): Promise<void> {
    const result: any[] = [];

    await Promise.all(
        items.map(async (item) => {
            if (!item) return;

            const obj = await getterFunc({
                conditions: [item],
            });

            if (obj?.status !== 200) {
                result.push(item.field);
            }
        })
    );

    if (result.length > 0) {
        throw new Error(`${result[0]} is already assigned to another user`);
    }
}

const sendEmail = async (
    options: ISendMailOptions,
    mailerService: MailerService
): Promise<CustomResponseType<SentMessageInfo>> => {
    try {
        const response: SentMessageInfo = await mailerService.sendMail(options);

        return {
            message: "Email has been send",
            data: response,
            status: 200,
        };
    } catch (error) {
        console.log(error);
        return {
            message: "Error occurred",
            data: error,
            status: 500,
        };
    }
};

export { sendEmail, checkForUniqueness };
