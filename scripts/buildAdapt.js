const { utils } = require('umi');
const path = require('path')
const { execa } = utils;
execa(`pnpm`,['--filter', './packages/**',  '--filter', '!dashboard', 'build'], {
  cwd: path.resolve(__dirname, `../`),
  stdio: 'inherit',
})
