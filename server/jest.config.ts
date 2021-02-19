export default {
  clearMocks: true,
  testEnvironment: "node",
  modulePathIgnorePatterns: [
    "build/"
  ],
  roots: [
    "<rootDir>/src",
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  coverageDirectory: "coverage",
  "collectCoverage": true,
  "collectCoverageFrom": [
    "src/**/*.ts"
  ],
  coveragePathIgnorePatterns: [
    "node_modules",
    "build"
  ],
  verbose: true,
};
