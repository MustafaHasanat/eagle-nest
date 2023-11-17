export default {
    validRes: function validRes(message, data) {
        return { message, data, status: 200 };
    },
    invalidRes: function invalidRes(message, data) {
        return { message, data, status: 400 };
    },
    validationError: function validationError(message, errors) {
        return { message, data: null, status: 500, errors };
    },
};
//# sourceMappingURL=validationResponse.js.map