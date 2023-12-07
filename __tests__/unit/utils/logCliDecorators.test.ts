import {
    logCliError,
    logCliProcess,
    logCliTitle,
    logNewMessage,
} from "../../../utils/logCliDecorators";

const consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});

describe("testing logCliTitle, logNewMessage, logCliProcess", () => {
    it("should log the correct text for logCliTitle", () => {
        logCliTitle("Title");
        expect(consoleLogSpy).toHaveBeenCalledWith(
            "\n-------- Title --------\n"
        );
    });

    it("should log the correct text for logNewMessage", () => {
        logNewMessage("thanks");
        expect(consoleLogSpy).toHaveBeenCalledWith("thanks\n");
    });

    it("should log the correct text for logCliProcess", () => {
        logCliProcess("Done");
        expect(consoleLogSpy).toHaveBeenCalledWith("\n>>> Done ...\n");
    });
});

describe("testing logCliError", () => {
    it("should log the correct text for logCliError on RUNTIME", () => {
        logCliError("This is the wrong input", "RUNTIME");
        expect(consoleLogSpy).toHaveBeenCalledWith(
            "\n!!! RUNTIME ERROR !!!\nThis is the wrong input\n"
        );
    });

    it("should log the correct text for logCliError on RUNTIME with a scope", () => {
        logCliError("This is the wrong input", "RUNTIME", "myFunction");
        expect(consoleLogSpy).toHaveBeenCalledWith(
            "\n!!! RUNTIME ERROR (myFunction) !!!\nThis is the wrong input\n"
        );
    });

    it("should log the correct text for logCliError on LOGICAL", () => {
        logCliError("This is the wrong input", "LOGICAL");
        expect(consoleLogSpy).toHaveBeenCalledWith(
            "\n!!! LOGICAL ERROR !!!\nThis is the wrong input\n"
        );
    });

    it("should log the correct text for logCliError on LOGICAL with a scope", () => {
        logCliError("This is the wrong input", "LOGICAL", "myFunction");
        expect(consoleLogSpy).toHaveBeenCalledWith(
            "\n!!! LOGICAL ERROR (myFunction) !!!\nThis is the wrong input\n"
        );
    });

    it("should log the correct text for logCliError on TOOL MISUSE", () => {
        logCliError("This is the wrong input", "TOOL MISUSE");
        expect(consoleLogSpy).toHaveBeenCalledWith(
            "\n!!! TOOL MISUSE ERROR !!!\nThis is the wrong input\n"
        );
    });

    it("should log the correct text for logCliError on TOOL MISUSE with a scope", () => {
        logCliError("This is the wrong input", "TOOL MISUSE", "myFunction");
        expect(consoleLogSpy).toHaveBeenCalledWith(
            "\n!!! TOOL MISUSE ERROR (myFunction) !!!\nThis is the wrong input\n"
        );
    });
});
