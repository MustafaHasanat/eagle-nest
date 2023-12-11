import { RGB } from "../../enums/rgb.js";
import constants from "../constants/coloringConstants.js";
import { getColoredText } from "./coloringLog.js";

const { colors } = constants;

const specialLog = ({
    message,
    situation,
    headerColor,
    scope,
}: {
    message: string;
    situation: "RESULT" | "PROCESS" | "MESSAGE" | "ERROR";
    headerColor?: RGB;
    scope?: string;
}) => {
    const mappedSituation: {
        [situation: string]: { head: string; trail: string; color: RGB };
    } = {
        MESSAGE: { head: "MESSAGE", color: colors.yellow, trail: "." },
        RESULT: { head: "RESULT", color: colors.green, trail: " !" },
        PROCESS: { head: "PROCESS", color: colors.orange, trail: " ..." },
        ERROR: { head: "ERROR", color: colors.red, trail: " !!!" },
    };

    const finalColor: RGB = headerColor || mappedSituation[situation].color;

    const header = `\n| ${mappedSituation[situation].head} ${
        scope ? `(${scope})` : ""
    }: `;

    process.stdout.write(getColoredText(header, finalColor));
    console.log(`${message}${mappedSituation[situation].trail}\n`);
};

export default specialLog;
