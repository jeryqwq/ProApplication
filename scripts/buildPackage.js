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
      message: '😊：请选择需要单独打包的package',
      name: 'names',
      choices: [
        new inquirer.Separator('-----  我是分割线  -----'),
        ...package.map(i => ({ name: i }))
      ],
      validate(answer) {
        if (answer.length < 1) {
          return '🙅：你必须选择一个包！';
        }
        return true;
      },
    },
  ])
  .then(async(answers) => {
    answers.names.forEach(pkgName => {
      console.log(chalk.greenBright(`开始打包${pkgName}，请稍后...`));
      execa('npm',['run', 'build'], {
        cwd: path.resolve(__dirname, `../packages/${pkgName}/`),
        stdio: 'inherit',
      })
    })
  });
