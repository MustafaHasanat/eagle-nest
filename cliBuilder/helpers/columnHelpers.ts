// maps  ---

const propertiesEntityMapObject: {
    [property: string]: string;
} = {
    isUnique: "unique: true",
    isRequired: "nullable: false",
    enum: "type: 'enum',\nenum: ENUM_OBJECT",
};

const decoratorsEntityMapObject: {
    [decorator: string]: {
        name: string;
        usage: string;
    };
} = {
    isUUID: { name: "IsUUID", usage: "@IsUUID()" },
    length: { name: "Length", usage: "@Length(3, 25)" },
    isEmail: { name: "IsEmail", usage: "@IsEmail()" },
    isStrongPassword: {
        name: "IsStrongPassword",
        usage: "@IsStrongPassword()",
    },
    isPhoneNumber: { name: "IsPhoneNumber", usage: "@IsPhoneNumber()" },
};

const propertiesDtoMapObject: {
    [property: string]: string | null;
} = {
    isUnique: null,
    isRequired: "required: true",
    enum: "enum: ENUM_OBJECT",
};

// interfaces ---

interface DecoratorsEntityMapProps {
    decoratorsArr: string[];
    importsArr: string[];
}

// methods ---

const propertiesEntityMap = (attributes: string[]): string | null => {
    if (attributes.length === 0) return null;
    return `${attributes
        .map((attribute) => propertiesEntityMapObject[attribute])
        .join(",\n")}`;
};

const decoratorsEntityMap = (
    decorators: string[]
): { decoratorsValues: string | null; decoratorsImports: string | null } => {
    if (decorators.length === 0)
        return {
            decoratorsValues: null,
            decoratorsImports: null,
        };

    const { decoratorsArr, importsArr }: DecoratorsEntityMapProps =
        decorators.reduce(
            (
                { decoratorsArr, importsArr }: DecoratorsEntityMapProps,
                attribute: string
            ) => {
                const { name, usage } = decoratorsEntityMapObject[attribute];
                return {
                    decoratorsArr: [...decoratorsArr, usage],
                    importsArr: [...importsArr, name],
                };
            },
            { decoratorsArr: [], importsArr: [] }
        );

    const decoratorsValues = decoratorsArr.join("\n");
    const decoratorsImports = `import { ${importsArr.join(
        ", "
    )} } from 'class-validator';`;

    return { decoratorsValues, decoratorsImports };
};

const propertiesDtoMap = (properties: string[]): string | null => {
    if (properties.length === 0) return null;
    return `${properties
        .reduce((acc: string[], property: string) => {
            const mapped = propertiesDtoMapObject[property];
            if (mapped) {
                return [...acc, mapped];
            }
            return acc;
        }, [])
        .join(",\n")}`;
};

export { propertiesEntityMap, decoratorsEntityMap, propertiesDtoMap };
