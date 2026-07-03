// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
export default {
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress'],
  testRunner: 'vitest',
  vitest: {
    configFile: 'vitest.config.ts',
  },
  mutate: [
    'src/polling.ts',
    'src/petition.ts',
    'src/utils/format.ts',
    '!src/**/__tests__/**',
    '!src/test/**',
  ],
  // Exclude certain mutation categories that produce too many false positives
  // in UI/format code or are semantically equivalent
  mutator: {
    excludedMutations: ['StringLiteral'],
  },
  thresholds: {
    high: 80,
    low: 60,
    break: 50,
  },
  coverageAnalysis: 'perTest',
  disableBail: false,
  concurrency: 2,
  tempDirName: '.stryker-tmp',
  cleanTempDir: 'always',
}
