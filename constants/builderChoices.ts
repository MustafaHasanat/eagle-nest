const columnTypeChoices = [
    {
        name: "string",
        value: "string",
        description: "create a simple string column",
    },
    {
        name: "number",
        value: "number",
        description: "create a numeric column (int, float)",
    },
    {
        name: "boolean",
        value: "boolean",
        description: "create a simple boolean column (true/false)",
    },
    {
        name: "enum",
        value: "ENUM_OBJECT",
        description: "create an enum colum (specified string values)",
    },
    {
        name: "date",
        value: "Date",
        description: "create a date-time column",
    },
    {
        name: "object",
        value: "{}",
        description: "create an object-shape column",
    },
    {
        name: "array",
        value: "[]",
        description: "create an array-shape column",
    },
    {
        name: "image",
        value: "image",
        description: "uploading an image",
    },
];

const columnPropertiesChoices = [
    {
        name: "isUnique",
        value: "isUnique",
        description: "a unique column will never accept duplicate rows",
    },
    {
        name: "isRequired",
        value: "isRequired",
        description: "required column can't be ignored or left empty",
    },
    {
        name: "enum",
        value: "enum",
        description: "a column that allows only specified values",
    },
];

const columnDecoratorsChoices = [
    {
        name: "isUUID",
        value: "isUUID",
        description: "",
    },
    {
        name: "length",
        value: "length",
        description: "",
    },
    {
        name: "isEmail",
        value: "isEmail",
        description: "",
    },
    {
        name: "isStrongPassword",
        value: "isStrongPassword",
        description: "",
    },
    {
        name: "isPhoneNumber",
        value: "isPhoneNumber",
        description: "",
    },
];

const relationChoices = [
    {
        name: "OneToOne",
        value: "OneToOne",
        description:
            "'one-to-one' relation: each record of this table may have a link to only one record from the foreign one",
    },
    {
        name: "OneToMany",
        value: "OneToMany",
        description:
            "'one-to-many' relation: each record of this table may have multiple linked records from the foreign one",
    },
    {
        name: "ManyToOne",
        value: "ManyToOne",
        description:
            "'many-to-one' relation:  multiple records of this table may have a link to only one record from the foreign one",
    },
];

export {
    columnTypeChoices,
    columnPropertiesChoices,
    relationChoices,
    columnDecoratorsChoices,
};
