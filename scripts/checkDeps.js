/* eslint-disable no-param-reassign */
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const glob = require('glob');
const slash = require('slash');
const fs = require('fs');
const { join, posix } = require('path');


const peerDependencies = ['antd', 'react', 'rc-field-form'];

/**
 * 替换文件中的 formatMessage
 *
 * @param {any} ast
 */
const checkDepsByAst = (ast, filePath) => {
  return new Promise((resolve) => {
    traverse.default(ast, {
      enter(path) {
        if (path.isImportDeclaration()) {
          const importPath = path.node.source.value;

          if (!importPath) return;

          if (importPath.includes('/src')) {
            resolve({
              success: false,
              message: 'import 不能包含 **/src/**',
            });
            return;
          }

          // if (importPath.startsWith('.')) {
          //   const importFile = slash(join(__dirname, '..', filePath, '..', importPath));
          //   if (importFile.split('.').length > 1) {
          //     if (fs.existsSync(`${importFile}`)) return;
          //     resolve({
          //       success: false,
          //       message: `${importFile} 路径错误，请检查大小写或路径错误`,
          //     });
          //     return;
          //   }
          //   if (
          //     !fs.existsSync(`${importFile}.ts`) &&
          //     !fs.existsSync(`${importFile}.tsx`) &&
          //     !fs.existsSync(`${importFile}/index.tsx`) &&
          //     !fs.existsSync(`${importFile}/index.ts`) &&
          //     !fs.existsSync(`${importFile}.d.ts`)
          //   ) {
          //     resolve({
          //       success: false,
          //       message: `${importFile} 路径错误，请检查大小写或路径错误`,
          //     });
          //     return;
          //   }
          // }
        }
      },
    });
    resolve({
      success: true,
    });
    return;
  });
};

const forEachFile = (code, filePath) => {
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript', 'dynamicImport', 'classProperties', 'decorators-legacy'],
  });
  return checkDepsByAst(ast, filePath);
};

const globList = (patternList, options) => {
  let fileList = [];
  patternList.forEach((pattern) => {
    fileList = [...fileList, ...glob.sync(pattern, options)];
  });

  return fileList;
};
const checkDeps = ({ cwd }) => {
  console.log(cwd);
  // 寻找项目下的所有 ts
  console.log('🕵️‍  find all code files')
  const tsFiles = globList(['packages/**/src/**/*.tsx', 'packages/**/src/**/*.tsx'], {
    cwd,
    ignore: [
      '**/*.d.ts',
      '**/demos/**',
      '**/dist/**',
      '**/public/**',
      '**/locales/**',
      '**/node_modules/**',
      '**/.*.ts'
    ],
  });

  const getFileContent = (path) => fs.readFileSync(slash(path), 'utf-8');


  tsFiles.forEach(async (path) => {
    const source = getFileContent(slash(join(cwd, path)));
    if (source.includes('import')) {
      const result = await forEachFile(source, path).catch(() => {});
      if (result.success === false) {
        console.log(`😂 ${path} 发现了错误：\n ${result.message}`);
        process.exit(2);
      }
    }
  });
};

/** 检查所有的根目录文件 */
checkDeps({
  cwd: slash(join(__dirname, '..')),
});
