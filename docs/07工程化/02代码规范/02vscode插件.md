# vscode 插件

EditorConfig Prettier Eslint Stylelint

EditorConfig: 专注于统一编辑器编码风格配置
Prettier: 专注于检查并自动更正代码风格，美化代码
Eslint: 专注于 JavaScript 代码质量检查, 编码风格约束等
Stylelint: 专注于样式代码的质量检查，风格约束等

## EditorConfig

VS Code 插件：EditorConfig for VS Code

This plugin attempts to override user/workspace settings with settings found in `.editorconfig` files.

Known Issue: `trim_trailing_whitespace = false` is not applied when user/workspace setting of `files.trimTrailingWhitespace` is set to `true`

`.editorconfig`文件配置：

```yaml
# .editorconfig
root = true # 设为true，阻止向上寻找 .editorconfig 文件

[*] # 通配符
charset = utf-8 # 编码
max_line_length = 80 # 打印宽度
indent_style = space # [tab|space] 缩进风格
indent_size = 2 # 缩进列数
# tab_width # tab大小，默认是 indent_size
end_of_line = lf # [lf|cr|crlf] 换行符
insert_final_newline = true # 文件是否以空白行结尾
trim_trailing_whitespace = true # 去除行尾的空白字符

[*.md] # 通配符
max_line_length = off # 单独设置md文件的代码风格
```

::: tip
CR：Carriage Return，对应 ASCII 中转义字符\r，表示回车
LF：Linefeed，对应 ASCII 中转义字符\n，表示换行
CRLF：Carriage Return & Linefeed，\r\n，表示回车并换行

Windows 操作系统采用两个字符来进行换行，即 CRLF
Unix/Linux/Mac OS X 操作系统采用单个字符 LF 来进行换行
另外，MacIntosh 操作系统（即早期的 Mac 操作系统）采用单个字符 CR 来进行换行
:::

## Prettier

美化代码工具，通过语法分析将代码解析为 AST 树，在 AST 树上应用代码风格规范重新生成代码
专注于统一代码样式，但不执行语法检测

分为 VS Code 插件，和 NPM 依赖
装 vscode 插件只是为了方便自己开发而已

`.prettierrc` 中已有的配置会覆盖掉 `.editorconfig` 对应的配置，`.prettierrc` 中未设置的配置会引用 `.editorconfig` 对应的配置

`.prettierrc`文件配置：（写在大括号内，属性名要加引号）

```yaml
{
  # 常用
  'printWidth': 80, # 打印宽度
  'singleQuote': true, # 优先使用单引号
  'semi': false, # 不使用行尾分号
  'trailingComma': 'es5', # [es5|all|none]
  # es5(default): Trailing commas where valid in ES5 (objects, arrays, etc.)
  # all: Trailing commas wherever possible (including function arguments).
  'arrowParens': 'avoid', # 箭头函数参数尽量省略圆括号包裹
  # 其他
  'tabWidth': 2, # 缩进尺寸
  'useTabs': false, # 用空格缩进，不用tab
  'endOfLine': 'lf', # 换行符
  'embeddedLanguageFormatting': 'auto', # [auto|off] 是否格式化嵌入引用代码，比如md文件中嵌入的代码块
  'vueIndentScriptAndStyle': false, # 不对vue文件中的script标签内容添加整体缩进
}
```

## Eslint

在代码编写的过程中，Eslint 通过规则模式匹配实现识别和报告的不符合规范的代码的功能，并对不符合规范的代码进行红线提示。它的目的是保证代码规范的一致性和及时发现代码问题、提前避免错误发生。同时，Eslint 提供命令行检查规范及 auto-fix 能力，并具有一部分代码格式化的功能。

分为 VS Code 插件，和 NPM 依赖
装 vscode 插件只是为了方便自己开发而已
采用配置 `.eslintrc.js` 和 `.eslintignore`

## Stylelint

配置 vscode 的 setting.json

```json
"stylelint.enable": true,
"editor.codeActionsOnSave": {
  "source.fixAll.stylelint": true
},
"stylelint.snippet": ["css", "less", "postcss", "scss", "vue"],
"stylelint.validate": ["css", "less", "postcss", "scss", "vue"],
```

## 给其他用户提供插件参考

可以在项目目录下创建 `./.vscode/extensions.json` 配置插件推荐
形如：

```json
{
  "recommendations": ["vue.volar"],
  "unwantedRecommendations": ["octref.vetur"]
}
```
