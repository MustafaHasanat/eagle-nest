import { QuestionCollection } from "inquirer";
declare const receiverConstants: {
    installer: {
        confirmation: (packages: string[]) => QuestionCollection;
    };
};
export default receiverConstants;
