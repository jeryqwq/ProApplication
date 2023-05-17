const { existsSync, writeFileSync, readdirSync } = require('fs');
const { join } = require('path');
const { yParser } = require('@umijs/utils');
const getPkgs = require('./utils/getPackages');

(async () => {
  const args = yParser(process.argv);
  const version = '1.0.0';

  const pkgs = getPkgs()

  pkgs.forEach((shortName) => {
    const name = `@vis/${shortName}`;
    const pkgJSONPath = join(__dirname, '..', 'packages', shortName, 'package.json');
    const tsConfigPath = join(__dirname, '..', 'packages', shortName, 'tsconfig.json');
    const fatherBuildPath = join(__dirname, '..', 'packages', shortName, '.fatherrc.ts');

    const pkgJSONExists = existsSync(pkgJSONPath);
    let json;
    if (args.force || !pkgJSONExists) {
      json = {
        name,
        version,
        description: name,
        files: ['lib', 'src', 'dist', 'es'],
        repository: {
          type: 'git',
          url: 'https://10.28.184.132/ssa-vis/vis-components/Index/',
        },
        dependencies: {
          '@babel/runtime': '^7.16.3',
          antd: '>=4.0',
        },
        scripts: {
          "build": "cross-env BUILD_TYPE=es father-build",
        },
        browserslist: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11'],
        authors: ['chenjie <jery1997@foxmail.com> '],
        license: 'MIT',
        peerDependencies: {
          antd: '>=4.20.0',
          react: '>=16.9.0',
          'react-dom': '>=16.9.0',
        },
        "main": "dist/index.js",
        "module": "es/index.js",
        "types": "es/index.d.ts",
        publishConfig: {
          access: 'public',
          registry: "http://xxx.xxx.xxx.xxx:xxxx/"
        },
      };
      if (pkgJSONExists) {
        const pkg = require(pkgJSONPath);
        [
          'dependencies',
          'devDependencies',
          'peerDependencies',
          'bin',
          'version',
          'files',
          'authors',
          'types',
          'sideEffects',
          'main',
          'module',
          'description',
        ].forEach((key) => {
          if (pkg[key]) json[key] = pkg[key];
        });
      }
      writeFileSync(pkgJSONPath, `${JSON.stringify(json, null, 2)}\n`);
    }
    if (!existsSync(tsConfigPath)) {
      writeFileSync(tsConfigPath, `
{
  "skipLibCheck": true,
  "compilerOptions": {
    "target": "es6",
    "module": "esnext",
    "lib": ["dom", "esnext"],
    "importHelpers": true,
    "declaration": true,
    "sourceMap": true,
    "skipLibCheck": true,
    "rootDir": "./",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "node",
    "baseUrl": "./",
    "paths": {
      "*": ["src/*", "node_modules/*"]
    },
    "jsx": "react-jsx",
    "esModuleInterop": true
  },
  "include": [
    "src",
  ],
  "exclude": [
    "node_modules",
    "build",
    "public",
    "lib"
  ]
}
`);
    }

    if (!existsSync(fatherBuildPath)) {
      writeFileSync(fatherBuildPath, `
      const type = process.env.BUILD_TYPE;
      let config = {};
      
      if (type === 'lib') {
        config = {
          cjs: { type: 'babel', lazy: true },
          esm: false,
          runtimeHelpers: true,
          extraBabelPlugins: [
            [
              'babel-plugin-import',
              { libraryName: 'antd', libraryDirectory: 'lib', style: true },
              'antd',
            ],
          ],
        };
      }
      
      if (type === 'es') {
        config = {
          cjs: false,
          esm: {
            type: 'babel',
          },
          runtimeHelpers: true,
          extraBabelPlugins: [
            [require('./../../scripts/replaceLib')],
            ['babel-plugin-import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
          ],
        };
      }
      
      export default config;
      \n`);
    }

    const readmePath = join(__dirname, '..', 'packages', shortName, 'README.md');
    if (args.force || !existsSync(readmePath)) {
      writeFileSync(
        readmePath,
        `# ${name}

> ${json.description}.

## Install

Using npm:

\`\`\`bash
$ npm install --save ${name}  --registry http://xxx.xxx.xxx.xxx:xxxx/
\`\`\`

or using yarn:

\`\`\`bash
$ yarn add ${name} --registry http://xxx.xxx.xxx.xxx:xxxx/
\`\`\`
`,
      );
    }
  });
})();
