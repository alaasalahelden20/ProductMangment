// module.exports = {
//     preset: "@vue/cli-plugin-unit-jest",
//     testEnvironment: 'jsdom',
//     transform: {
//       '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
//     },
//     transformIgnorePatterns: ['<rootDir>/node_modules/(?!axios)'],
//     moduleNameMapper: {
//       '^.+\\.(css|less|sass|scss|styl|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest/fileTransformer.js',
//       '^@/(.*)$': '<rootDir>/src/$1',
//       '^axios$': '<rootDir>/node_modules/axios/index', // Ensure correct path resolution
//     }}

module.exports = {
        setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
        transformIgnorePatterns: ['f:/ACPC-project/frontend/node_modules/axios/index'],

        testEnvironment: 'jsdom',
        transform: {
          '^.+\\.jsx?$': 'babel-jest',
        },
        moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
        moduleNameMapper: {
                  '^.+\\.(css|less|sass|scss|styl|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest/fileTransformer.js',
                  '^@/(.*)$': '<rootDir>/src/$1',
                  "^axios$": "axios/dist/node/axios.cjs" // Ensure correct path resolution
                }
      };