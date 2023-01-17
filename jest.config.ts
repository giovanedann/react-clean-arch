import type { Config } from "jest";

const config: Config = {
  roots: ["<rootDir>/src"],
  verbose: true,
  collectCoverageFrom: ["<rootDir>/src/**.*.{ts,tsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};

export default config;
