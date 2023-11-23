declare const _default: {
    foundRes: <DataType>(message: string, data: DataType) => {
        message: string;
        data: DataType;
        status: number;
    };
    notFoundRes: (message: string) => {
        message: string;
        data: null;
        status: number;
    };
    createUpdateRes: <DataType_1>(message: string, data: DataType_1) => {
        message: string;
        data: DataType_1;
        status: number;
    };
    forbiddenRes: (message: string) => {
        message: string;
        data: null;
        status: number;
    };
    deletedRes: <DataType_2>(message: string, data: DataType_2) => {
        message: string;
        data: DataType_2;
        status: number;
    };
};
export default _default;
