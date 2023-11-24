function foundRes<DataType>(message: string, data: DataType) {
    return {
        message,
        data,
        status: 200,
    };
}

function notFoundRes(message: string) {
    return {
        message,
        data: null,
        status: 404,
    };
}

function createUpdateRes<DataType>(message: string, data: DataType) {
    return {
        message,
        data,
        status: 201,
    };
}

function forbiddenRes(message: string) {
    return {
        message,
        data: null,
        status: 401,
    };
}

function deletedRes<DataType>(message: string, data: DataType) {
    return {
        message,
        data,
        status: 200,
    };
}

export { foundRes, notFoundRes, createUpdateRes, forbiddenRes, deletedRes };
