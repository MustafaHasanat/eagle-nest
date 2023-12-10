import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    rootDir: "./__tests__",
    verbose: true,
    // collectCoverage: true,
    collectCoverageFrom: ["src/**/*.(ts|js)"],
    testMatch: ["**/**/?(*.)+(test).+(ts|js)"],
    moduleFileExtensions: ["ts", "js", "tsx", "jsx", "json", "node"],
    moduleNameMapper: {
        // '^@/(.*)$': './src/$1',
        "(.+)\\.(ts|js)": "$1",
    },
    transform: {
        "^.+\\.(t|j)sx?$": "ts-jest",
    },
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
export default config;
