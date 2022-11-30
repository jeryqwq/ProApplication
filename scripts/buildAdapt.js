const execa = require('./utils/exec');
const path = require('path')
execa(`pnpm`,['--filter', `'./packages/**'`, 'build'], {
  cwd: path.resolve(__dirname, `../`),
  stdio: 'inherit',
})
