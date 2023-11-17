export default {
    error: function error(error: any) {
        return { message: "Error occurred", data: error, status: 500 };
    },
};
