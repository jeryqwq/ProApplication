const exec = require('child_process').execSync;
const fs = require('fs');
const path = require('path');
// 创建当前版本历史更新日志，自动写入文档
const getChangelog = (content, version) => {
  const lines = content.split('\n');
  const changeLog = [];
  const startPattern = new RegExp(`^## ${version}`);
  const stopPattern = /^## /; // 前一个版本
  const skipPattern = /^`/; // 日期
  let begin = false;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (begin && stopPattern.test(line)) {
      break;
    }
    if (begin && line && !skipPattern.test(line)) {
      changeLog.push(line);
    }
    if (!begin) {
      begin = startPattern.test(line);
    }
  }
  return changeLog.join('\n');
};

const getMds = async (allVersion = false) => {
  const docDir = path.join(__dirname, '..', 'docs');
  const mdFils = fs.readdirSync(docDir).filter((name) => name.includes('changelog.md'));
  mdFils.map((mdFile) => {
    const pkg = mdFile.replace('.changelog.md', '');
    const content = fs
      .readFileSync(path.join(__dirname, '..', `/packages/${pkg}/CHANGELOG.md`))
      .toString();
    // dumi路由相关信息
    const _content = `---
    title: vis/${pkg} - 更新日志
    nav:
      title: Changelog
      path: /changelog
    group:
      path: /
---`;
    // let versions = [
    //   require(path.join(path.join(__dirname, '..', 'packages', pkg, 'package.json'))).version,
    // ];
    const filePath = path.join(__dirname, '..', `docs/${pkg}.changelog.md`);
    fs.unlinkSync(filePath);
    fs.writeFileSync(
      filePath,
      `${_content}
      
${content}
    `,
    );
    // if (allVersion) {
    //   versions = exec('git tag')
    //     .toString()
    //     .split('\n')
    //     .filter((tag) => tag.includes(pkg))
    //     .map((tag) => tag.split('@').pop());
    // }
    // versions.map(async (version) => {
    //   const versionPkg = `@vis/${pkg}@${version}`;
    //   const changeLog = getChangelog(content, versionPkg);
    //   if (!changeLog) {
    //     return;
    //   }
    // });
  });
};

getMds();
