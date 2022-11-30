const chalk = require('chalk');

async function exec () {
  const ver = process.version
  const version = Number(ver.split('.')[0].slice(1, 3));
  let errorStr = ''
  if(version <= 15) {
    const err = `🙅 当前node版本不匹配, 需要16+， 您当前版本:${ver},请升级后重试
    `
    errorStr += err
    console.log(chalk.redBright(err));
  }
  if(errorStr) {
    process.exit(1)
  }
}
exec()
