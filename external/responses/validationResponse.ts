export default {
    validRes: function validRes(message: string, data: string) {
        return { message, data, status: 200 };
    },

    invalidRes: function invalidRes(message: string, data: string) {
        return { message, data, status: 400 };
    },

    validationError: function validationError(
        message: string,
        errors: string[]
    ) {
        return { message, data: null, status: 500, errors };
    },
};
