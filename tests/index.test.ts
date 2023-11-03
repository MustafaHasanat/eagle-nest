import { expect, test } from "@jest/globals";
import eagle from "../src/index";

test("should first", () => {
    expect(eagle()).toEqual(true);
});
