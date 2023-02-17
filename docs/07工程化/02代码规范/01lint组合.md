# Lint 组合

> eslint —— 用来检查代码规范性
> prettier —— 用来格式化代码
> stylelint —— 用来检查 css
> commitlint —— 用来检查 commit 信息
> commitizen —— 用来规范化提交 commit 信息
> husky —— git 的钩子，在 git 的 hook 中执行一些命令
> lint-staged —— 对 git 暂存的文件进行 lint 检查
> vite 的 eslint 和 stylelint 插件 —— 用来开发运行时检查

## eslint

```bash
npm i eslint -D
npx eslint --init
# 选择 To check syntax and find problems
# 选择 JavaScript modules
# 选择 Vue.js TypeScript
# 选择 Browser
# 选择 配置文件格式为 JavaScript
# 生成 .eslintrc.js 配置文件
```

因为要使用到 node 的一些语法，例如 path、env 等,
所以给配置文件的 env 中加上 node:true

需要解析 vue 文件的能力，所以在 parserOptions 前面一行加上 parser: "vue-eslint-parser"

配置 eslint 忽略文件 .eslintignore

```yaml
/dist // TODO 这里似乎需要修改
/node_modules
/.vscode
wxcomponents # 不检查uni项目小程序语法组件的目录
```

package.json 添加命令

```json
"eslint": "eslint . --ext .js,.jsx,.ts,.tsx,.vue",
"eslint:fix": "eslint . --fix --ext .js,.jsx,.ts,.tsx,.vue"
```

配置 eslint 忽略部分代码
忽略检查

1. 跳过某个片段 `/* eslint-disable */` + `/* eslint-enable */`
2. 跳过当前行 `/* eslint-disable-line */`
3. 跳过下一行 `/* eslint-disable-next-line */`

## prettier

```bash
npm i prettier -D
# 处理 prettier 与 eslint 冲突
npm i eslint-config-prettier -D
```

package.json 添加命令

```json
format": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\"",
```

## stylelint

如果是 less 项目，则下面的 scss 全部换成 less

```bash
npm i stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order -D
```

各依赖说明：
stylelint: css 样式 lint 工具, 用户检测样式文件(.css 文件)
postcss: 转换 css 代码工具
postcss-scss: 识别 scss 语法的插件
postcss-html: 识别 html/vue 中的 style 标签中的样式
stylelint-config-standard: Stylelint 的标准可共享配置规则，详细可查看官方文档
stylelint-config-prettier: 关闭所有不必要或可能与 Prettier 冲突的规则
stylelint-config-recommended-scss: scss 的推荐可共享配置规则，详细可查看官方文档
stylelint-config-standard-vue: lint.vue 文件的样式配置
stylelint-scss: stylelint-config-recommended-scss 的依赖，scss 的 stylelint 规则集合
stylelint-order: 指定样式书写的顺序，在 .stylelintrc.js 中 order/properties-order 指定顺序

package.json 添加命令

```json
"lint": "npm run eslint & npm run stylelint",
"lint:fix": "npm run eslint:fix & npm run stylelint:fix",
"stylelint": "stylelint \"./**/*.{css,scss,sass,vue,html}\"",
"stylelint:fix": "stylelint \"./**/*.{css,scss,sass,vue,html}\" --fix",
```

根目录创建 .stylelintignore

```yaml
src/components/content-skeleton/ # 路径以 src/ 开头
src/styles/module/
```

忽略检查

1. 跳过某个片段 `/* stylelint-disable */` + `/* stylelint-enable */`
2. 跳过当前行 `/* stylelint-disable-line */`
3. 跳过下一行 `/* stylelint-disable-next-line */`

## commitlint

```bash
npm i @commitlint/cli @commitlint/config-conventional -D
```

使用命令创建 commitlint.config.js 文件

```bash
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

搭配 husky

```bash
npm i husky lint-staged -D
```

安装成功后需要在 package.json 文件中增加一条 scripts 命令 "prepare": "husky install"，用于在 npm install 初始化 husky
prepare: 在两种情况前运行，一是 npm publish 命令前，二是不带参数的 npm install 命令；它会在 prepublish 之后、prepublishOnly 之前执行

首次安装成功后，需要手动初始化

```bash
npm run prepare
```

添加 commit-msg hook

```bash
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

添加 pre-commit hook

```bash
npx husky add .husky/pre-commit "npm run lint-staged"
```

package.json 添加命令

```json
"lint-staged": "lint-staged",
```

lint-staged 辅助工具
在根目录创建.lintstagedrc 文件，并写入以下内容
如果下面的校验失败则终止 commit

```json
{
  "src/**/*.{js,ts,jsx,tsx,vue}": "npm run eslint:fix",
  "src/**/*.{vue,css,scss,html}": "npm run stylelint:fix",
  "src/**/*.{js,ts,jsx,tsx,vue,css,scss,less,html,md}": "npm run format"
}
```

## 自定义 commit

安装 commitizen

```bash
npm i commitizen -D
```

安装自定义 commit 插件

```bash
npm i cz-customizable -D
```

在 package.json 中配置

```json
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    }
  }
}
```

在根目录创建 .cz-config.js
:::warning
不识别 cjs 后缀名，在 package.json 中不能配置"type":"module"
:::

```js
module.exports = {
  types: [
    {
      value: 'feat',
      name: '✨ feat(新功能)',
    },
    {
      value: 'fix',
      name: '🐛 fix(Bug 修复)',
    },
    {
      value: 'docs',
      name: '📝 docs(文档更新)',
    },
    {
      value: 'style',
      name: '💄 style(代码样式更改, 例如空格、格式、缺少分号等)',
    },
    {
      value: 'refactor',
      name: '💡 refactor(重构代码)',
    },
    {
      value: 'perf',
      name: '⚡️ perf(性能优化)',
    },
    {
      value: 'test',
      name: '✅ test(添加缺失或修正测试代码)',
    },
    {
      value: 'chore',
      name: '🔨 chore(构建相关的代码或工具库, 如文档生成等)',
    },
  ],
  messages: {
    type: '请选择提交类型(必填):\n',
    customScope: '请输入影响范围(可选):\n',
    subject: '请输入简要描述 (必填):\n',
    body: '请输入详细描述, 使用 "|" 分行(可选):\n',
    breaking: '请列出所有的破坏性变更, 例如: 描述、理由或迁移方式等(可选):\n',
    confirmCommit: '请确认此提交信息?',
  },
  subjectLimit: 100,
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['scope', 'footer'],
}
```

## 安装 vite 的 eslint 和 stylelint 插件，帮助运行时检查

```bash
npm i vite-plugin-eslint vite-plugin-stylelint -D
```

配置 vite.config.ts

```ts
import eslintPlugin from 'vite-plugin-eslint'
import stylelintPlugin from 'vite-plugin-stylelint'

...
plugins: [
     eslintPlugin({
       exclude: ['./node_modules/**'],
       cache: false,
     }),
     stylelintPlugin({
       fix: true,
       quiet: true,
     }),
   ],
```

## 安装 vscode 的 stylelint 插件并配置

```json
  "stylelint.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  },
  "stylelint.snippet": ["css", "less", "postcss", "scss", "vue"],
  "stylelint.validate": ["css", "less", "postcss", "scss", "vue"],
  "scss.lint.unknownAtRules": "ignore",
  "css.lint.unknownAtRules": "ignore",
```
