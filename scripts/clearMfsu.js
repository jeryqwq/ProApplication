const getProjects = require('./utils/getProject');
const { join } = require('path');
const fs = require('fs')
const { removeDir } = require('./utils/file')
const chalk = require('chalk')
async function exec () {// 删除umi的mfsu缓存，不然组件无法更新
  const pkgs =  getProjects()
  try {
    const mainMfsuFolder = join(__dirname, '../node_modules/.cache/mfsu/')
    fs.existsSync(mainMfsuFolder) && removeDir(mainMfsuFolder);
  } catch (error) {
    console.log(chalk.greenBright(`😣 主应用未找到mfsu文件夹，删除失败!!!`), error);
  }
  pkgs.forEach(i => {
    try {
      const folderPath = join(__dirname, `../projects/${i}/node_modules/.cache/mfsu`)
      const isExist = fs.existsSync(folderPath)
      isExist && removeDir(folderPath);
    } catch (error) {
      console.log(chalk.greenBright(`😣 子应用${i}mfsu缓存文件夹删除失败!!!`), error);
    }
  })
}
exec()
