import {
  propertiesDtoMap,
  propertiesEntityMap,
  decoratorsMap,
} from "../../../../src/utils/helpers/columnHelpers.js";

describe("Testing propertiesEntityMap", () => {
  it("should return null if the array is empty", () => {
    expect(propertiesEntityMap([])).toBe(null);
  });

  it("should return the correct mapped properties when given an array of properties", () => {
    const entityProperties = propertiesEntityMap([
      "isUnique",
      "isRequired",
      "enum",
    ]);

    expect(entityProperties).toBe(
      "unique: true,\nnullable: false,\ntype: 'enum',\nenum: ENUM_OBJECT"
    );
  });
});

describe("Testing propertiesDtoMap", () => {
  it("should return null if the array is empty", () => {
    expect(propertiesDtoMap([])).toBe(null);
  });

  it("should return the correct mapped properties when given an array of properties", () => {
    const dtoProperties = propertiesDtoMap(["isUnique", "isRequired", "enum"]);

    expect(dtoProperties).toBe("required: true,\nenum: ENUM_OBJECT");
  });
});

describe("Testing decoratorsMap", () => {
  it("should return nulls if the array is empty", () => {
    expect(decoratorsMap([])).toEqual({
      decoratorsValues: null,
      decoratorsImports: null,
    });
  });

  it("should return the correct mapped object when given an array of decorators", () => {
    const decorators = decoratorsMap([
      "isUUID",
      "isEmail",
      "length",
      "isStrongPassword",
      "isPhoneNumber",
      "isDecimal",
      "isInt",
    ]);

    expect(decorators).toEqual({
      decoratorsValues:
        "@IsUUID()\n@IsEmail()\n@Length(MIN_LENGTH, MAX_LENGTH)\n@IsStrongPassword()\n@IsPhoneNumber()\n@isDecimal()\n@isInt()",
      decoratorsImports:
        "import { IsUUID, IsEmail, Length, IsStrongPassword, IsPhoneNumber, isDecimal, isInt } from 'class-validator';",
    });
  });
});
