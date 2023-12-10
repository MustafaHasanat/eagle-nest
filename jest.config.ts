import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    rootDir: "./__tests__",
    verbose: true,
    collectCoverage: true,
    // collectCoverageFrom: ["src/**/*.{ts,js}"],
    testMatch: ["**/**/?(*.)+(spec|test).+(ts|tsx|js)"],
    moduleFileExtensions: ["ts", "js", "tsx", "jsx", "json", "node"],
    moduleNameMapper: {
        "(.+)\\.js": "$1",
    },
    transform: {
        "^.+\\.(t|j)sx?$": "ts-jest",
        // "^.+\\.tsx?$": "ts-jest",
        // "^.+\\.ts?$": "ts-jest",
    },
};
export default config;
