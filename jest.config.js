const { join } = require('path');
const getPackages = require('./scripts/utils/getPackages');

const pkgList = getPackages();

const moduleNameMapper = {
  '\\.(css|less|sass|scss)$': require.resolve('identity-obj-proxy'),
};

pkgList.forEach((shortName) => {
  const name = `@vis/${shortName}`;
  moduleNameMapper[name] = join(__dirname, `./packages/${shortName}/src`);
});

module.exports = {
  collectCoverageFrom: [
    'packages/**/src/**/*.{ts,tsx}',
  ],
  testEnvironment: 'jsdom',
  moduleNameMapper,
  transform: {
    '\\.(t|j)sx?$': require.resolve('./tests/jsTransformer'),
  },
  unmockedModulePathPatterns: ['node_modules/react/'],
  testURL: 'http://localhost',
  verbose: true,
  setupFiles: ['./tests/setupTests.js'],
  globals: {
    VIS_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: false,
  },
  testPathIgnorePatterns: ["/node_modules/", '/packages/', '/src/']
};
