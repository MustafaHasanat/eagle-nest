import { tableNameValidator } from "../../../../src/utils/validators/stringValidators.js";

describe("Testing tableNameValidator", () => {
  it("should return true if the name is valid", () => {
    expect(tableNameValidator("user")).toEqual(true);
    expect(tableNameValidator("users")).toEqual(true);
  });

  it("should return an error message if the name is invalid", () => {
    const [error1, error2, error3] = [
      "Name shouldn't contain any space",
      "Name should only contain letters and/or numbers",
      "Name shouldn't start with an uppercase letter",
    ];

    expect(tableNameValidator("user list")).toEqual(error1);
    expect(tableNameValidator("user1")).toEqual(error2);
    expect(tableNameValidator("user*")).toEqual(error2);
    expect(tableNameValidator("user)")).toEqual(error2);
    expect(tableNameValidator("user+")).toEqual(error2);
    expect(tableNameValidator("User")).toEqual(error3);
  });
});
