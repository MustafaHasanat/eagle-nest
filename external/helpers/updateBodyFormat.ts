export function updateBodyFormat(createBody: {
    consumes: any;
    produces: any;
    schema: {
        type: any;
        required: any;
        properties: {
            [key: string]: {
                type: string;
                [key: string]: any;
            };
        };
    };
}) {
    const { required, type, properties } = createBody.schema;
    const { password, ...otherProperties } = properties;

    const newProperties: { [field: string]: any } = {};

    Object.entries({ ...otherProperties }).map(
        (pair: [field: string, options: any]) => {
            const [field, options] = pair;
            newProperties[field] = { ...options, default: undefined };
        }
    );

    return {
        ...createBody,
        schema: {
            type,
            properties: newProperties,
        },
    };
}
