const fs = require('fs');
const path = require('path');
const execa = require('./utils/exec');
const chalk = require('chalk');
const inquirer = require('inquirer');
const getProjects = require('./utils//getProject');
const _ = require('lodash')
async function execHandler () {
  const tailPkgs = getProjects()
  inquirer
  .prompt([
    {
      type: 'checkbox',
      message: '😊：请选择dev的project',
      name: 'name',
      choices: [
        new inquirer.Separator('-----  我是分割线  -----'),
        ...tailPkgs.map(i => ({ name: i }))
      ],
      validate(answer) {
        if (answer.length !== 1) {
          return '🙅：你只能选择一个项目！';
        }
        return true;
      },
    },
  ])
  .then(async(answers) => {
    package = answers.name[0];
    if(!package || !tailPkgs.includes(package)) {
      throw new Error('未找到对应项目,请重试！')
    }
    console.log(chalk.greenBright('😄开启成功！'));
    const reloadDir = path.resolve(__dirname, `../projects/${package}/src/`)
    execa('npm',['run', 'dev'], {
      cwd: path.resolve(reloadDir, '../'),
      stdio: 'inherit',
    })
  });
}

execHandler()
