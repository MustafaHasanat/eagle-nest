const receiverConstants = {
    installer: {
        confirmation: (packageName) => ({
            name: "confirmation",
            message: `Package ${packageName} isn't installed, do you want us to take care of this?`,
            type: "confirm",
            default: true,
        }),
    },
};
export default receiverConstants;
//# sourceMappingURL=receiverConstants.js.map