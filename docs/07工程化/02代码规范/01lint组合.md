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
// 提交代码: 使用 cz 命令
// 相关配置: https://github.com/leoforfree/cz-customizable
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
    // scope: '请输入文件修改范围(可选):',
    // used if allowCustomScopes is true
    customScope: '请输入影响范围(可选):\n',
    subject: '请输入简要描述 (必填):\n',
    body: '请输入详细描述, 使用 "|" 分行(可选):\n',
    breaking: '请列出所有的破坏性变更, 例如: 描述、理由或迁移方式等(可选):\n',
    // footer: '请列出需关闭的 issue, 例如: #31, #34(可选):\n',
    confirmCommit: '请确认此提交信息?',
  },
  subjectLimit: 100, // subject文字长度默认
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

## 参考配置（适配了 uni）

```json
/* package.json */
{
  ...

  "scripts": {
    "prepare": "husky install",
    "format": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\"",
    "lint": "npm run eslint & npm run stylelint",
    "lint:fix": "npm run eslint:fix & npm run stylelint:fix",
    "lint-staged": "lint-staged",
    "eslint": "eslint . --ext .js,.jsx,.ts,.tsx,.vue",
    "eslint:fix": "eslint . --fix --ext .js,.jsx,.ts,.tsx,.vue",
    "stylelint": "stylelint \"./**/*.{css,scss,sass,vue,html}\"",
    "stylelint:fix": "stylelint \"./**/*.{css,scss,sass,vue,html}\" --fix",
  },
  "devDependencies": {
    "@commitlint/cli": "^17.2.0",
    "@commitlint/config-conventional": "^17.2.0",
    "@typescript-eslint/eslint-plugin": "^5.43.0",
    "@typescript-eslint/parser": "^5.43.0",
    "commitizen": "^4.2.5",
    "cz-conventional-changelog": "^3.3.0",
    "cz-customizable": "^7.0.0",
    "eslint": "^8.28.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-vue": "^9.7.0",
    "husky": "^8.0.2",
    "lint-staged": "^13.0.3",
    "postcss": "^8.4.19",
    "postcss-html": "^1.5.0",
    "postcss-scss": "^4.0.5",
    "prettier": "^2.7.1",
    "sass": "^1.55.0",
    "stylelint": "^14.15.0",
    "stylelint-config-prettier": "^9.0.4",
    "stylelint-config-recommended-scss": "^8.0.0",
    "stylelint-config-standard": "^29.0.0",
    "stylelint-config-standard-vue": "^1.0.0",
    "stylelint-order": "^5.0.0",
    "stylelint-scss": "^4.3.0",
    "vite-plugin-eslint": "^1.8.1",
    "vite-plugin-stylelint": "^3.0.8"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    }
  }
}
```

```js
/* .eslintrc.js */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'prettier', // 对应依赖 eslint-config-prettier
    // 'plugin:prettier/recommended', // 请勿使用这个 写代码时候一直出红色波浪线提示删除空格，对应依赖 eslint-plugin-prettier
  ],
  overrides: [
    {
      files: ['*.ts', '*.vue'],
      rules: {
        'no-undef': 'off', // 不要在 TypeScript 项目中使用 no-undef lint 规则。它提供的检查已经由 TypeScript 提供且做得更好
      },
    },
  ],
  parser: 'vue-eslint-parser', // vue文件解析器
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/multi-word-component-names': 'off', // 允许vue文件以一个单词命名
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-var': 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prefer-const': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  globals: {
    uni: true,
    wx: true, // 未定义的全局变量
  },
}
```

```js
/* .stylelintrc.js */
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-standard-vue',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-order'], // stylelint的css排序会带着上一行的注释排序，所以可能会造成条件编译的注释错乱顺序，小心
  // 不同格式的文件指定自定义语法
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml',
  ],
  rules: {
    'import-notation': 'string', // 必须这样规定，避免将scss文件的@import ""语句修复成css文件的@import url("")语句。
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['upx', 'rpx'], // 忽视单位
      },
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['page', 'uni-toast'], // 忽视类型
      },
    ],
    'string-quotes': 'single',
    'selector-class-pattern': null,
    // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'no-descending-specificity': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep', ':deep'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep'],
      },
    ],
    // 禁用每个选择器之前插入空行
    'rule-empty-line-before': null,
    // 禁止小于 1 的小数有一个前导零
    // 'number-leading-zero': 'never',
    // 一些特殊的scss指令
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'function',
          'if',
          'else',
          'else-if',
          'each',
          'include',
          'mixin',
        ],
      },
    ],
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment'],
        ignoreAtRules: ['else', 'else-if'],
      },
    ],
    // 指定样式的排序
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'flex-shrink',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'font-size',
      'font-family',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition',
      'content',
    ],
  },
}
```
