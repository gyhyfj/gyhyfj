# npm

npm（node package manager），是随同 Node.js 一起安装的第三方包管理器；通过 npm，我们可以安装、共享、分发代码，管理项目的依赖关系。

## npm install

### 运行这个命令发生的事情：

npm install 命令输入 > 检查 node_modules 目录下是否存在指定的依赖 > 如果已经存在则不必重新安装 > 若不存在，继续下面的步骤 > 向远程 registry（本地电脑的.npmrc 文件里有对应的配置地址）查询模块压缩包的网址 > 下载压缩包，存放到根目录里的.npm 目录里 > 解压压缩包到当前项目的 node_modules 目录中。

### 扁平化：

为了解决递归管理依赖带来的重复冗余和嵌套层级非常深，引入了扁平化管理（dedupe）的方式

### 扁平化的实现：

遍历 package.json 文件下 dependencies 和 devDependencies 字段里的依赖，作为依赖树的根节点；
然后在每个根节点依赖下面都会有其依赖的依赖，作为其子节点。
遍历这些依赖的时候，如果发现有重复的依赖模块，就直接将其丢弃。

### 扁平化的风险：

不同的依赖在文件里的放置顺序变化会导致 Node_modules 的依赖结构产生变化
package.json 文件里通常只会锁定大版本，某些依赖包小版本更新后，也会造成依赖结构的改变

解决办法：

新增 package-lock.json 文件。
package-lock.json 文件可以保证每次执行 npm install 后生成的 node_modules 目录结构一定是完全相同的
同时它会缓存每个包的具体版本和下载链接，在后期再去 install 的时候，就不需要再去远程仓库进行查询操作了，减少了大量网络请求

### 几种 install 方式

```bash
# 存入dependencies
npm install pinia --save
npm i pinia -S
npm i # 安装全部依赖，命令可以按照package.json检查并安装不符合的依赖

# 存入devDependencies
npm install pinia --save-dev
npm i pinia -D

# 对于已经安装了的依赖
# -D会将已安装入dependencies的依赖移到devDependencies中
# -S则不会

# 全局安装
npm i pnpm -g
```

package.json 的版本号对安装的影响：

```bash
7.14.0 表示安装指定的7.14.0版本
~7.14.0 表示安装 7.14.x 中最新的版本
^7.14.0 表示安装7.x.x中最新的版本
```

### 其他 npm 命令

```bash
npm uninstall pinia # 卸载
npm update pnina # 更新

npm list
npm list -g

npm init
npm init -y
```

### npm 镜像设置

使用 nrm 管理

## npm run

```bash
npm run-script <command> [-- <args>]
aliases: run, rum, urn
```

这将从包的 "scripts" 对象运行任意命令。如果没有提供 "command"，它将列出可用的脚本
