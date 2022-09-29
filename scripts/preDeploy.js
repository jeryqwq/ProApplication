const { existsSync, readdirSync } = require('fs');
const { join } = require('path');
const getPkgs = require('./utils/getPackages');

(async () => {
  const pkgs = getPkgs()

  pkgs.forEach((shortName) => {
    const distPath = join(__dirname, '..', 'packages', shortName, 'dist');
    const distExists = existsSync(distPath);
    if (!distExists || !existsSync(join(__dirname, '..', 'packages', shortName, 'es'))) {
      console.error('Please execute "npm build-lib && npm build-dist" first!');
      process.exit(1);
    }
  });
})();
