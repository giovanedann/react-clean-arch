import type { Config } from 'jest'

const config: Config = {
  roots: ['<rootDir>/src'],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/node_modules/',
    '!<rootDir>/src/**/index.ts',
    '!**/*.d.ts'
  ],
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy'
  },
  moduleDirectories: ['node_modules', '<rootDir>/src', '<rootDir>/.jest'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  }
}

export default config
