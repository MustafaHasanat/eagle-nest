import { QuestionCollection } from "inquirer";

const receiverConstants = {
    installer: {
        confirmation: (packages: string[]): QuestionCollection => ({
            name: `confirmation`,
            message: `Some packages aren't installed (${packages.length} package/s), do you want us to take care of this?\n${packages}`,
            type: "confirm",
            default: true,
        }),
    },
};

export default receiverConstants;
