export declare function updateBodyFormat(createBody: {
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
}): {
    schema: {
        type: any;
        properties: {
            [field: string]: any;
        };
    };
    consumes: any;
    produces: any;
};
