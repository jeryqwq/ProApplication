const chalk = require('chalk');

async function exec () {
  const ver = process.version
  const version = Number(ver.split('.')[0].slice(1, 3));
  let errorStr = ''
  if(version <= 15) {
    const err = `π ε½εnodeηζ¬δΈεΉι, ιθ¦16+οΌ ζ¨ε½εηζ¬:${ver},θ―·εηΊ§ειθ―
    `
    errorStr += err
    console.log(chalk.redBright(err));
  }
  if(errorStr) {
    process.exit(1)
  }
}
exec()
