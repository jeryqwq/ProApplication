---
title: VsCode 配置
order: 2.5
group:
  path: /
---

为了统一的研发环境和更好的开发体验，我们推荐你使用一些相关配置来增强项目功能。

## IDE 配置

#### 多文件折叠

开发过程中自动将相关配置文件折叠，避免文件列表过长，修改相关配置文件频率极低[参考 vscode-file-nesting-config](https://github.com/antfu/vscode-file-nesting-config)。

```json
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.expand": false,
  "explorer.fileNesting.patterns": {
    "*.js": "$(capture).js.map, $(capture).*.js, $(capture)_*.js",
    "*.jsx": "$(capture).js, $(capture).*.jsx, $(capture)_*.js, $(capture)_*.jsx",
    "*.module.ts": "$(capture).resolver.ts, $(capture).controller.ts, $(capture).service.ts",
    "*.ts": "$(capture).js, $(capture).d.ts.map, $(capture).*.ts, $(capture)_*.js, $(capture)_*.ts",
    "*.tsx": "$(capture).ts, $(capture).*.tsx, $(capture)_*.ts, $(capture)_*.tsx",
    ".env": "*.env, .env.*, .envrc, env.d.ts",
    "package.json": ".dumirc.ts, .gitignore,build.*,.umirc.*,.browserslist*, .circleci*, .codecov, .commitlint*, .cz-config.js, .czrc, .editorconfig, .eslint*, .firebase*, .flowconfig, .github*, .gitlab*, .gitpod*, .huskyrc*, .jslint*, .lighthouserc.*, .lintstagedrc*, .markdownlint*, .mocha*, .node-version, .nodemon*, .npm*, .nvmrc, .pm2*, .pnp.*, .pnpm*, .prettier*, .releaserc*, .sentry*, .stackblitz*, .styleci*, .stylelint*, .tazerc*, .textlint*, .tool-versions, .travis*, .versionrc*, .vscode*, .watchman*, .xo-config*, .yamllint*, .yarnrc*, Procfile, api-extractor.json, apollo.config.*, appveyor*, ava.config.*, azure-pipelines*, bower.json, build.config.*, commitlint*, crowdin*, cypress.*, dangerfile*, dprint.json, firebase.json, grunt*, gulp*, jasmine.*, jenkins*, jest.config.*, jsconfig.*, karma*, lerna*, lighthouserc.*, lint-staged*, nest-cli.*, netlify*, nodemon*, nx.*, package-lock.json, package.nls*.json, phpcs.xml, playwright.config.*, pm2.*, pnpm*, prettier*, pullapprove*, puppeteer.config.*, pyrightconfig.json, release-tasks.sh, renovate*, rollup.config.*, stylelint*, tsconfig.*, tsdoc.*, tslint*, tsup.config.*, turbo*, typedoc*, unlighthouse*, vercel*, vetur.config.*, vitest.config.*, webpack*, workspace.json, xo.config.*, yarn*",
  }
```

<img src="https://user-images.githubusercontent.com/11247099/157142238-b00deecb-8d56-424f-9b20-ef6a6f5ddf99.png"/>

## 代码自动格式化

## monorepos workspace 插件

安装该辅助插件后，会对所有的包和子应用单独抽离到工作目录，针对需要的应用进行开发即可，且在 git 记录和暂存区中也能更直观的看到该修改是哪个包的调整。

<img src="https://github.com/folke/vscode-monorepo-workspace/raw/master/images/explorer.png"/>
