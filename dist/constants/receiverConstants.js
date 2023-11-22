const receiverConstants = {
    installer: {
        confirmation: (packages) => ({
            name: `confirmation`,
            message: `Some packages aren't installed (${packages.length} package/s), do you want us to take care of this?\n${packages}`,
            type: "confirm",
            default: true,
        }),
    },
};
export default receiverConstants;
//# sourceMappingURL=receiverConstants.js.map