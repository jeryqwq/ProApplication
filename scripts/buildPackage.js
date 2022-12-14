const execa = require('./utils/exec');
const chalk = require('chalk')
const inquirer = require('inquirer');
const getPackages = require('./utils/getPackages');
const package = getPackages()
const path = require('path')
inquirer
  .prompt([
    {
      type: 'checkbox',
      message: 'ðï¼è¯·éæ©éè¦åç¬æåçpackage',
      name: 'names',
      choices: [
        new inquirer.Separator('-----  ææ¯åå²çº¿  -----'),
        ...package.map(i => ({ name: i }))
      ],
      validate(answer) {
        if (answer.length < 1) {
          return 'ðï¼ä½ å¿é¡»éæ©ä¸ä¸ªåï¼';
        }
        return true;
      },
    },
  ])
  .then(async(answers) => {
    answers.names.forEach(pkgName => {
      console.log(chalk.greenBright(`å¼å§æå${pkgName}ï¼è¯·ç¨å...`));
      execa('npm',['run', 'build'], {
        cwd: path.resolve(__dirname, `../packages/${pkgName}/`),
        stdio: 'inherit',
      })
    })
  });
