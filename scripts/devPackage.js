const fs = require('fs');
const path = require('path');
const execa = require('./utils/exec');
const chalk = require('chalk')
const inquirer = require('inquirer');
const getPackages = require('./utils/getPackages');
const _ = require('lodash')
async function execHandler () {
  const tailPkgs = getPackages()
  // const res = await inquirer.prompt([
  //   {
  //     type: 'input',
  //     name: 'package',
  //     message: '请输入需要热更新的包名',
  //   },
  // ]);
  inquirer
  .prompt([
    {
      type: 'checkbox',
      message: '😊：请选择需要开启热更新的package',
      name: 'name',
      choices: [
        new inquirer.Separator('-----  我是分割线  -----'),
        ...tailPkgs.map(i => ({ name: i }))
      ],
      validate(answer) {
        if (answer.length !== 1) {
          return '🙅：你只能选择一个包！';
        }
        return true;
      },
    },
  ])
  .then(async(answers) => {
    package = answers.name[0];
    if(!package || !tailPkgs.includes(package)) {
      throw new Error('未找到对应包名,请重试！')
    }
    console.log(chalk.greenBright('😄热更新开启成功！'));
    const reloadDir = path.resolve(__dirname, `../packages/${package}/src/`)
    const handle = _.debounce(function(filename) {
      console.log(`${chalk.greenBright(`visTip: libName: ${package}  >> save:`)} ${chalk.magenta.bold(filename)}, 正在热更新中...`);
      execa('npm',['run', 'build'], {
        cwd: path.resolve(reloadDir, '../'),
        stdio: 'inherit',
      })
    }, 500)
    fs.watch(reloadDir, { recursive: true },(event, filename) => {
      handle(filename)
    });
  });
}

execHandler()
