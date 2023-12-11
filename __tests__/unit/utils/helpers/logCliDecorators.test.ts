import { RGB } from "../../../../src/enums/rgb.js";
import specialLog from "../../../../src/utils/helpers/specialLog";
import constants from "../../../../src/utils/constants/coloringConstants.js";
import { getColoredText } from "../../../../src/utils/helpers/coloringLog.js";

const { colors } = constants;

const consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
const stdoutSpy = jest.fn();
const getColoredTextSpy = jest.fn(getColoredText);

const originalStdoutWrite = process.stdout.write;

describe("testing specialLog", () => {
    beforeAll(() => {
        process.stdout.write = stdoutSpy;
    });
    afterAll(() => {
        process.stdout.write = originalStdoutWrite;
    });

    it("should log the correct message if a situation was RESULT", () => {
        specialLog({ message: "This is a result", situation: "RESULT" });

        // expect(getColoredTextSpy).toHaveBeenCalledWith(
        //     "\n| RESULT : ",
        //     colors.green
        // );

        // expect(consoleLogSpy).toHaveBeenCalledWith("This is a result !\n");
        // expect(stdoutSpy).toHaveBeenCalledWith("\n| RESULT : ");
    });
});
