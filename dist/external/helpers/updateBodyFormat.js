export function updateBodyFormat(createBody) {
    const { required, type, properties } = createBody.schema;
    const { password, ...otherProperties } = properties;
    const newProperties = {};
    Object.entries({ ...otherProperties }).map((pair) => {
        const [field, options] = pair;
        newProperties[field] = { ...options, default: undefined };
    });
    return {
        ...createBody,
        schema: {
            type,
            properties: newProperties,
        },
    };
}
//# sourceMappingURL=updateBodyFormat.js.map