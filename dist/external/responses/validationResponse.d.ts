declare const _default: {
    validRes: (message: string, data: string) => {
        message: string;
        data: string;
        status: number;
    };
    invalidRes: (message: string, data: string) => {
        message: string;
        data: string;
        status: number;
    };
    validationError: (message: string, errors: string[]) => {
        message: string;
        data: null;
        status: number;
        errors: string[];
    };
};
export default _default;
