module.exports = {
  testEnvironment: "node",
  transform: {},
  moduleFileExtensions: ["js", "mjs"],
  testMatch: ["**/__tests__/**/*.test.mjs"],
  collectCoverageFrom: [
    "src/**/*.js",
    "src/**/*.mjs",
    "!src/**/*.test.js",
    "!src/**/*.test.mjs",
    "!src/index.js",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
