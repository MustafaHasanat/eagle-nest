function errorRes(error: any) {
    return { message: "Error occurred", data: error, status: 500 };
}

export { errorRes };
