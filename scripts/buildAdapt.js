const execa = require('./utils/exec');
const os = require('os');

const path = require('path');
execa(
  `pnpm`,
  [
    '--filter',
    os.type() === 'Darwin' ? `'./packages/**'` : `./packages/**`,
    'build',
  ],
  {
    cwd: path.resolve(__dirname, `../`),
    stdio: 'inherit',
  },
);
