import type { Config } from 'jest'

const config: Config = {
  roots: ['<rootDir>/src'],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/node_modules/',
    '!<rootDir>/src/**/index.ts'
  ],
  moduleDirectories: ['node_modules', '<rootDir>/src', '<rootDir>/.jest'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}

export default config
