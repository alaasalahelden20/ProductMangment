// jest.config.js
module.exports = {
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.js'],
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  };
  