import type { Config } from 'jest'

const config: Config = {
  roots: ['<rootDir>/src'],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/node_modules/',
    '!<rootDir>/dist/**',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/main/**',
    '!**/*.d.ts'
  ],
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy'
  },
  moduleDirectories: ['node_modules', '<rootDir>/src', '<rootDir>/.jest'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  }
}

export default config
