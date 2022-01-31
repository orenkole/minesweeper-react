/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress', 'dashboard'],
  testRunner: 'jest',
  coverageAnalysis: 'perTest',
  thresholds: { high: 0, low: 0, break: 0 },
  mutate: [
    'src/**/*.ts?(x)',
    '!src/**/*@(.test|.spec|Spec|stories|styled).ts?(x)',
    '!src/**/__mocks__/**/*',
  ],
  // Unknown memory leak 🤷‍♀️
  maxTestRunnerReuse: 20,
};
