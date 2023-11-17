export default {
    foundRes: function foundRes(message, data) {
        return {
            message,
            data,
            status: 200,
        };
    },
    notFoundRes: function notFoundRes(message) {
        return {
            message,
            data: null,
            status: 404,
        };
    },
    createUpdateRes: function createUpdateRes(message, data) {
        return {
            message,
            data,
            status: 201,
        };
    },
    forbiddenRes: function forbiddenRes(message) {
        return {
            message,
            data: null,
            status: 401,
        };
    },
    deletedRes: function deletedRes(message, data) {
        return {
            message,
            data,
            status: 200,
        };
    },
};
//# sourceMappingURL=crudResponse.js.map