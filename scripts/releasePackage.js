const fs = require('fs');
const path = require('path');
const execa = require('./utils/exec');
const chalk = require('chalk')

// 增加版本号，在这之前我们已经单独打包过了
const filePath = path.resolve(__dirname, '../', '.temp');
try {
  let packageName = fs.readFileSync(filePath).toString();
  if (packageName) {
    const packagePath = path.resolve(__dirname, '../', `packages/${packageName}/package.json`);
    const packageStr = fs.readFileSync(packagePath).toString();
    const packageJson = JSON.parse(packageStr);
    const curVersion = packageJson.version;
    const nums = curVersion.split('.').map((i) => Number(i));
    nums[nums.length - 1]++;
    const nextVersion = nums.join('.');
    fs.unlinkSync(packagePath);
    fs.writeFileSync(packagePath, packageStr.replace(curVersion, nextVersion));
    execa('npm', ['publish'], {
      // 执行发布
      cwd: path.resolve(__dirname, '../', `packages/${packageName}`),
    });
    fs.unlinkSync(filePath);
  } else {
    console.log(`${chalk.red('>> 未读取到单独打包的包名:')} }`);
  }
} catch (error) {}
