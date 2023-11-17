export default {
    foundRes: function foundRes<DataType>(message: string, data: DataType) {
        return {
            message,
            data,
            status: 200,
        };
    },

    notFoundRes: function notFoundRes(message: string) {
        return {
            message,
            data: null,
            status: 404,
        };
    },

    createUpdateRes: function createUpdateRes<DataType>(
        message: string,
        data: DataType
    ) {
        return {
            message,
            data,
            status: 201,
        };
    },

    forbiddenRes: function forbiddenRes(message: string) {
        return {
            message,
            data: null,
            status: 401,
        };
    },

    deletedRes: function deletedRes<DataType>(message: string, data: DataType) {
        return {
            message,
            data,
            status: 200,
        };
    },
};
