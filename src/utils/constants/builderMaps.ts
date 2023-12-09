const propertiesEntityMapObject: {
    [property: string]: string;
} = {
    isUnique: "unique: true",
    isRequired: "nullable: false",
    enum: "type: 'enum',\nenum: ENUM_OBJECT",
};

const propertiesDtoMapObject: {
    [property: string]: string | null;
} = {
    isUnique: null,
    isRequired: "required: true",
    enum: "enum: ENUM_OBJECT",
};

const decoratorsMapObject: {
    [decorator: string]: {
        name: string;
        usage: string;
    };
} = {
    isUUID: { name: "IsUUID", usage: "@IsUUID()" },
    length: { name: "Length", usage: "@Length(MIN_LENGTH, MAX_LENGTH)" },
    isEmail: { name: "IsEmail", usage: "@IsEmail()" },
    isStrongPassword: {
        name: "IsStrongPassword",
        usage: "@IsStrongPassword()",
    },
    isPhoneNumber: { name: "IsPhoneNumber", usage: "@IsPhoneNumber()" },
    isDecimal: { name: "isDecimal", usage: "@isDecimal()" },
};

export {
    propertiesEntityMapObject,
    propertiesDtoMapObject,
    decoratorsMapObject,
};
