export default {
    transform: {
      '^.+\\.m?js$': 'babel-jest',
    },
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./jest.setup.mjs'],
    moduleFileExtensions: ['mjs', 'js', 'json', 'node'],
    testMatch: [
      '**/__tests__/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[tj]s?(x)',
      '**/?(*.)+(spec|test).mjs'
    ],
  };
  