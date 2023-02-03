---
title: VsCode 配置
order: 2.5
group:
  path: /
---

为了统一的研发环境和更好的开发体验，我们推荐你使用一些相关配置来增强项目功能。

## IDE 配置

建议升级到最新版本的 vscode，适配更多配置

开发过程中自动将相关配置文件折叠，避免文件列表过长，修改相关配置文件频率极低[参考 vscode-file-nesting-config](https://github.com/antfu/vscode-file-nesting-config)。

```json
  "editor.stickyScroll.enabled": true, // 开启滚动折叠，可以查看到当前滚动代码的所在函数或者组件
  "editor.stickyScroll.maxLineCount": 5,
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.expand": false,
  "explorer.fileNesting.patterns": { // 文件折叠
    "*.js": "$(capture).js.map, $(capture).*.js, $(capture)_*.js",
    "*.jsx": "$(capture).js, $(capture).*.jsx, $(capture)_*.js, $(capture)_*.jsx",
    "*.module.ts": "$(capture).resolver.ts, $(capture).controller.ts, $(capture).service.ts",
    "*.ts": "$(capture).js, $(capture).d.ts.map, $(capture).*.ts, $(capture)_*.js, $(capture)_*.ts",
    "*.tsx": "$(capture).ts, $(capture).*.tsx, $(capture)_*.ts, $(capture)_*.tsx",
    ".env": "*.env, .env.*, .envrc, env.d.ts",
    "package.json": ".dumirc.ts, .gitignore,build.*,.umirc.*,.browserslist*, .circleci*, .codecov, .commitlint*, .cz-config.js, .czrc, .editorconfig, .eslint*, .firebase*, .flowconfig, .github*, .gitlab*, .gitpod*, .huskyrc*, .jslint*, .lighthouserc.*, .lintstagedrc*, .markdownlint*, .mocha*, .node-version, .nodemon*, .npm*, .nvmrc, .pm2*, .pnp.*, .pnpm*, .prettier*, .releaserc*, .sentry*, .stackblitz*, .styleci*, .stylelint*, .tazerc*, .textlint*, .tool-versions, .travis*, .versionrc*, .vscode*, .watchman*, .xo-config*, .yamllint*, .yarnrc*, Procfile, api-extractor.json, apollo.config.*, appveyor*, ava.config.*, azure-pipelines*, bower.json, build.config.*, commitlint*, crowdin*, cypress.*, dangerfile*, dprint.json, firebase.json, grunt*, gulp*, jasmine.*, jenkins*, jest.config.*, jsconfig.*, karma*, lerna*, lighthouserc.*, lint-staged*, nest-cli.*, netlify*, nodemon*, nx.*, package-lock.json, package.nls*.json, phpcs.xml, playwright.config.*, pm2.*, pnpm*, prettier*, pullapprove*, puppeteer.config.*, pyrightconfig.json, release-tasks.sh, renovate*, rollup.config.*, stylelint*, tsconfig.*, tsdoc.*, tslint*, tsup.config.*, turbo*, typedoc*, unlighthouse*, vercel*, vetur.config.*, vitest.config.*, webpack*, workspace.json, xo.config.*, yarn*",
  }
  "npm.packageManager": "pnpm", // 使用pnpm运行命令
  "editor.formatOnSave": true, // 自动保存
  "prettier.enable": true, // 开启prettier
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.tabSize": 2,
  "prettier.requireConfig": false, // Prettier 配置方案文件（如 .prettierrc）必须存在。即使该项被设置 true，未命名文件仍会使用 VS Code 的 setting.json 中的配置方案进行格式化
  "prettier.singleQuote": true // 使用单引号
```

<img src="https://user-images.githubusercontent.com/11247099/157142238-b00deecb-8d56-424f-9b20-ef6a6f5ddf99.png"/>

## 插件

### monorepos workspace

安装该辅助插件后，会对所有的包和子应用单独抽离到工作目录，针对需要的应用进行开发即可，且在 git 记录和暂存区中也能更直观的看到该修改是哪个包的调整。

<img src="https://github.com/folke/vscode-monorepo-workspace/raw/master/images/explorer.png"/>

项目图标配置：

此配置为用户配置，放在 vscode 的 setting.json 里

```json
"monorepoWorkspace.folders.custom": [
    {
      "regex": "charts",
      "prefix": "📈 "
    },
    {
      "regex": "common",
      "prefix": "💡 "
    },
    {
      "regex": "components",
      "prefix": "🤔 "
    },
    {
      "regex": "decorator",
      "prefix": "💄 "
    },
    {
      "regex": "test",
      "prefix": "🎯 "
    },
    {
      "regex": "utils",
      "prefix": "🤸‍♀️ "
    },
    {
      "regex": "dashboard",
      "prefix": "🌕 "
    },
    {
      "regex": "dataModel",
      "prefix": "🌗 "
    },
    {
      "regex": "template",
      "prefix": "🌘 "
    },
    {
      "regex": "visForm",
      "prefix": "🌑 "
    },
    {
      "regex": "visVisual",
      "prefix": "🌒 "
    }
    // ,
    // {
    //   "regex": "xxx",
    //   "prefix": "🌓"
    // }
  ],
```

### unocss

为所有定义的 antd5.x token 提供代码提示和预览功能

### prettier

固执已见(零配置)的美化代码插件
