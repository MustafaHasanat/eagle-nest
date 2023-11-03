import { expect, test } from "@jest/globals";
import eagle from "../src/index";

test("should first", () => {
    expect(eagle("hi")).toEqual(false);
});

test("should first", () => {
    expect(eagle("true")).toEqual(true);
});
