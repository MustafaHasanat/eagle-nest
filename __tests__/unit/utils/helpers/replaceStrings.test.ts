import replaceStrings from "../../../../src/utils/helpers/replaceStrings.js";

describe("Testing replaceStrings", () => {
  it("should replace all the occurrences correctly", async () => {
    const modifiedString = await replaceStrings({
      contents: "This is a TEST_CASE for TEST_CASE the FUNCTION",
      items: [
        { oldString: "TEST_CASE", newString: "file case" },
        { oldString: "FUNCTION", newString: "functionality" },
      ],
    });

    expect(modifiedString).toBe(
      "This is a file case for file case the functionality"
    );
  });
});
