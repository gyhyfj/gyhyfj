# Git

设置初始化默认分支为 main
`git config --global init.defaultBranch main`

## Git

三个区域: 工作区 暂存区 仓库
三个状态: 已修改 已暂存 已提交
基本的工作流程: 修改 暂存 提交
进行 Git 操作前, 多数情况下一定要暂存或提交当前的修改

https://www.bookstack.cn/read/git-tutorial

```bash
# git 配置
# 全局配置
# 如果username和email中没有空格, 可以不写引号
git config --global user.name "username"
git config --global user.email "email"
# 当前仓库配置
git config user.name "username"
git config user.email "email"

# 创建git仓库
git init --initial-branch=main

# 查看git状态 但不显示stash状态
git status
git status -s

# 将文件添加到暂存区 可追踪新文件
git add [file1] [file2]
git add [dir]
git add .

# 提交修改
git commit -m 'msg' # 提交已暂存修改
git commit -a -m # 提交已跟踪修改, 不包括新增文件
git commit --amend -m 'msg' # 在上次commit的基础上附加修改且可同时修改msg, 最终只保留一次commit记录, hash值每次都会更新

# 查看日志
# 由于命令窗口尺寸限制, 默认显示不完全, 可按回车查看更多内容, 最好按 q 退出
git log
git log -5 --pretty=oneline


# git 指针
HEAD  HEAD~0  HEAD^0 # 当前
HEAD~1  HEAD^1  HEAD~  HEAD^ # 当前的上一个
HEAD~5 HEAD^5 # 当前的上五个

# HEAD~ 和 HEAD^ 的作用是相同的, 这两者的区别出现在重复使用或者加数字的


# 查看项目当前状态
git status
git status -s

# 还原
# 多数清空下推荐使用revert
git revert 版本号 # 撤销某次修改并生成新的commit
git revert -n 版本号 # 撤销某次提交的修改, 在此基础上进行继续修改

# 重置
# 甚至可以重置不是本分支上的版本
git reset [--soft | --mixed | --hard] [HEAD] # 之后的 commit 不再存在
git reset e1af2 # 回退所有内容到e1af2版本
git reset HEAD^ # 回退所有内容到上一个版本
git reset HEAD^ a.txt # 回退a.txt到上一个版本

# --soft 取消了 commit, 之后的 commit 出现在暂存区 # 不小心把不该提交的内容提交了, 可以执行这个, 消除提交记录, 最后统一提交 (将原来多次的git提交记录合并为一个)
# --mixed 取消了 commit 和 add, 重置暂存区, 工作区不变, 默认可以省略
# --hard 取消了commit 和 add 和源文件修改

# 重置
git checkout <commitID> # 切换到指定快照 switch也行, 之后的 commit 不再存在
git checkout <commitID> <filename> # 将指定文件从暂存区复制到工作区, 丢弃工作区对该文件的修改
git checkout HEAD~ <commitID> <filename> # 指定从某个 commit 恢复指定文件, 同时改变暂存区和工作区

# 分支操作
git branch # 查看分支
git branch test # 创建新分支
git branch -d test # 删除分支 -D是强制删除
git branch -m master main # 重命名分支, 把master重命名为main

git checkout test # 切换分支, 如果没有则创建新分支
git switch test # 切换分支, 如果没有则不创建, 推荐, 避免在切换分支时因拼写错误而创建新分支
git checkout -b test # 创建并切换到新分支

git merge test # 把指定分支合并到当前分支

# 暂存操作
# stash 操作并不限制于某个分支, 所以可以用来将对一个分支的修改移动到另一个分支
# stash 暂存修改只会操作被追踪的文件, 所以执行 stash 前一般要执行 git add .
# stash 对新增文件的处理会比较暧昧
# stash 恢复修改会把暂存的修改和现有修改合并, 所以如果要放弃现有修改, 需要先执行 git checkout . 或 git reset HEAD . 或 git clean -xdff 或 git stash
git stash save "msg" # 暂存修改
git stash # 同后面没跟注解的 git stash save, 名称就是最新一次commit的名称
git stash list # 列出所有暂时保存的工作
git stash apply stash@{1} # 恢复某个暂时保存的工作 # 如果使用 pwsh ,需要给大括号加上反引号写成 `{0`}, 否则大括号会被认为是代码块执行标识符
git stash pop # 恢复最近一次stash的文件, 并丢弃stash
git stash drop # 丢弃最近一次stash的文件
git stash clear # 删除所有的stash

# 本地修改与 source 存在冲突的情况 提示:  Please commit your changes or stash them before you merge
# a、git stash # 保存修改在本地
# b、git pull source master # 跟新 source 的代码
# c、git stash pop # 提去本地的修改
# d、解决具体的冲突文件 , 此时编译器把冲突文件已经标红
# e、git status -> git add ->git commit -m "" -> git push origin master

# 远程操作

# 连接远程仓库
git remote add origin xxxx.git # 添加与xxxx.git的连接并命名为origin

# 移除与远程仓库的连接
git remote remove origin # 移除与origin的连接

# 展示配置的远程仓库
git remote
git remote -v # 加上-v展示实际链接地址
# 默认远程仓库名是origin, 其实只是个变量名, 代替后面的链接用
git remote show origin # 展示全部信息

# 查看远程仓库的分支
git branch -a

# 获取远程分支
git checkout -b test origin/test # 切换分支, 并在本地创建同样的分支名

# 推送本地更新到远程分支
git push origin dev
git push --set-upstream origin main
git push -u origin main # -u 是 --set-upstream 的简写

# 删除远程的dev分支
git push origin --delete dev

# 获取远程分支更新
git fetch
# 更新 git remote 中所有的远程 repo 所包含分支的最新 commit-id, 将其存到仓库区, 即 .git/FETCH_HEAD 文件中

git diff origin/dev # 查看与 远程仓库名/分支名 区别

git merge dev # 合并dev到当前分支

git tag 1.0.0 # 打标签

git checkout my-dev
git pull origin dev
# 将 origin 的 dev 分支合并到本地的 my-dev 分支
# git pull 其实是 git fetch 与 git merge 两个命令的集合, 直接存到工作区
# 先执行 git fetch origin 当前分支名, 再执行 git merge FETCH_HEAD

# 变基rebase
# 千万不要用 rebase 处理已被其他人引用的提交
git rebase main # 把当前分支变基到 main 分支上, 不再原样保留当前分支之前独立出去的提交

# 解决合并冲突
# 1. 用 merge, 将主干分支 merge 到特性分支, 并在合并时解决冲突, 这样在特性分支中就创造了一个无冲突的合并
# 2. 用 rebase, 将特性分支 rebase 到主干分支, 并在 rebase 的过程中解决冲突. 因为少创造一个节点出来, 所以减轻代码审查者的负担. 生成相对清爽的提交历史, 方便工程历史的追溯和缺陷排查

# 交互式rebase
git rebase -i 分支/版本号
# 通过改变上方todo-list排序, 进行提交搬移和重建 (从上到下)
# 将 pick 改为 squash [skwɑːʃ] 后, 会把这一行和上一行合并为一次提交, 追加到 main 分支后, 实现提交的压缩
# 将 pick 改为 drop, 则会丢弃这一行的更改提交记录, 也会在后面的提交中丢弃这一行的更改
```

### 常见情景:

1.在本地写了不想要的代码, 但是还没有做 push 操作

```bash
# 文件被修改了, 但未执行git add操作
git checkout filename # 撤销工作区的某个文件的修改
git checkout . # 撤销工作区的全部文件的修改

# 同时对多个文件执行了git add操作, 但本次只想提交其中一部分文件
git reset HEAD filename # reset --mixed, 保留工作区, 移除暂存区的指定文件的修改

# 文件被修改了且commit了, 但想继续修改并提交, 且不产生新commit
git add filename
git commit --amend -m 'msg' # --amend用来修改上次commit的修改以及上次commit的msg
# 或 git commit --amend 不带msg则进入交互式流程
```

2.刚线上更新的代码出现问题了, 需要还原这次提交的代码

```bash
git revert HEAD # 放弃某次提交, 但这次提交记录还在, 而且会生成因此而生的新提交
git push
# 或
git reset --hard HEAD^ # HEAD指针指向指定提交, 历史中不会出现放弃的提交
git push -f
```

3.想要干掉之前的某次提交

```bash
git rebase -i 分支/版本号
```

### .gitignore

没有感叹号前缀的文件会被忽略
如果在前面通过通配符被忽略的文件不想被忽略, 则可以使用"!"对其做排除, 如:

```
.vscode/*
!.vscode/extensions.json
```

但是: 如果一个文件所在的目录被定义在 gitignore 里, 那再对这个文件设置"!"将不会生效, 即这个文件依然会被忽略
如果文件名本身以“!”开头, 在使用"!"时需要以"\"做转义

### git 忽略文件的部分内容

1. 在工程的根目录下创建/打开一个 .gitattributes 文件(会被提交到本地或者远程仓库), 或者在根目录下创建 .git/info/attributes (不会被提交到本地或者远程仓库)
2. 在上面添加的文件 (两者任选其一) 中添加如下内容

   ```bash
    *.java filter=_config
    # *.java 表示过滤所有.java 结尾的文件
    # filter 是固定的,表示filter过滤器
    # _config 是过滤器的名称, 后面需要用到
   ```

3. 然后打开终端 执行下面命令进行 git 设置 (注意下面 2 个配置, 只能配置一个生效!!! )

   ```bash
   # 配置1, 单行忽略(_config 是上面配置的过滤器名称)
   # 设置后, 添加了 //@gitignore 结尾的代码行会被忽略提交
   git config --global filter._config.clean "sed '/\/\/@gitignore$/'d"
   git config --global filter._config.smudge cat

   # 配置2, 多行忽略(_config 是上面配置的过滤器名称)
   # 设置后, //#BEGIN 到 //#END 之间的代码行会被忽略提交
   git config --global filter._config.clean "sed '/\/\/#BEGIN/,/\/\/#END$/d'"
   git config --global filter._config.smudge cat
   ```

4. 清除缓存 git rm -r --cached . 然后 git add .

:::warning
任何对 gitignore 配置的修改都需要清除对项目文件追踪的缓存, 然后重新执行 git add .
:::

## Git 工作流

合适的 Git 工作流往往取决于项目的代码规模、协作人数、应用场景等,

工作流分为 Feature branch 和 Trunk-based 工作流, 前者是功能驱动式开发

前者分为三种工作流:
`Git flow` 适于版本发布
`GitHub flow` 适于持续发布
`GitLab flow` 适于持续发布和版本发布
也可以自定义工作流

它们都是“功能驱动式开发”, 简称 FDD
指的是:
需求是开发的起点
先有需求再有功能分支或者补丁分支
完成开发后, 该分支就合并到主分支, 然后被删除

### Git flow

适用于产品交付类型的开发工作, 使用 develop 分支作为所有开发人员的集成分支

为什么要用分支:
每一个开发任务使用独立的分支, 这样就可以区分任务的优先级, 对于不紧急的任务可以再自己分支上慢慢做, 做好了再并入主分支; 对于紧急任务, 优先并入主分支, 没有其他代码干扰, 可以很快发版本

为什么要分支管理:
每个开发者的命名规约、分支用途不一致, 会给沟通和管理带来困难, 所以需要用统一的分支模式

分支类型:
master (主干分支, 通常只允许其他分支代码合入, 不允许直接提交代码)
develop (开发分支)
feature (特性分支, 通常从 develop 分支拉出)
release (发布分支, 从 develop 分支出来, 介于 develop 和 master 之间的分支, 其作用是发布前的准备工作, 后以 fast forward 方式合并到 master 上. release 上可能还会修改一些内容, 所以还要合并回 develop 分支)
hotfix (热修复分支, 验证通过后, 合并到 Master 和 Develop 分支)
support (旧版本维护分支)

开发流程:
(本质上, 分支只是引用)

1. 根据需求从 develop 上创建 feature 分支 (其实就是创建了一个新的引用)
2. 提交修改到创建的 feature 分支
3. 合并 feature 分支到 develop 分支
4. 从 develop 分支创建 release 分支, 到测试环境测试
5. 合并 release 到 develop 和 master 分支 (其实就是改变了 develop 和 master 的引用)
6. 打标签
7. 清理分支 (清理分支, 只是把引用删掉了)

维护分支:
可以在某个大版本统一维护破坏更新之前的老版本

1. `git checkout 1.1.0` 切换到某个大版本的 tag
2. `git checkout -b support/1.x` 创建 support 分支, 相当于过去的 main 分支
3. `git checkout -b feature/6` 基于 support 创建 feature 分支
4. `git commit` 提交对 feature 分支的修改
5. `git checkout support/1.x` 切换到 support 分支
6. `git merge feature/6` 把 feature 分支的修改合并到创建的 support 分支
7. `git tag 1.2.0` 打标签

### GitHub flow

是`Git flow`的简化版, 是一个轻量级的工作流, 直接在 main 分支上集成代码
最大优点就是简单, 适于持续发布

协同开发流程:

1. 创建组织
2. 创建项目贮藏库
3. clone 主仓库 (内部项目) 或 fork 主仓库和 clone fork 仓库 (开源项目)
4. 添加上游地址 (开源项目) `git remote add upstream xxx.git`
   此时再执行`git remote -v`查看, 就会发现追踪到了`origin`和`upstream`两个远程仓库
5. 同步最新代码`git pull upstream main`
6. 创建功能分支`git checkout -b 'feat'`
7. 提交代码合并分支到本地最开始的主分支上`git commit -m 'msg'` 和`git switch main`和`git merge feat`
8. 合并最新代码 (解决合并冲突)
   先`git fetch upstream`再`git merge upstream/main`
   然后解决冲突
9. 推送代码到自己 fork 的仓库 `git push`
10. 提交 pull request, 点击 github 的`New pull request`和`Create pull request`
11. 审查代码
12. 合并和部署
13. 删除功能分支

### GitLab flow

GitHub flow 隐含一个假定: 每次合并 feature, 主分支的代码是立即发布的. 然而, 实际中常常不能满足这个假定, 例如: 你无法控制代码发布时间, 例如 App 发布要等审核通过. 再例如: 发布时间窗口限制, 合并分支的时候也许并不在发布时间窗口.

GitLab flow 只存在一个主分支 master, 它是所有其他分支的"上游". 只有上游分支采纳的代码变化, 才能应用到其他分支. 一切代码的变化, 必须由"上游"向"下游"发展.
对于"版本发布"的项目, 每一个稳定版本, 都要从 master 分支拉出一个长期存在的 release 分支, 比如 2-3-stable、2-4-stable 等等. 以后, 只有修补 bug, 才允许将代码合并到这些分支, 并且此时要更新小版本号.

工作流程:

1. 开发新功能前, 要用 master 分支创建一个开发新功能的 feature 分支
2. 当功能开发完成后, 用 master 分支去合并 feature 分支, 合并完成后将 feature 分支删除
3. 将 master 分支的代码部署到测试环境, 如果测试出 bug, 直接在 master 分支上修复
4. master 分支的代码测试通过后, 用 master 分支创建 pre-production 预发布分支, 将其部署到预发布环境
5. 预发布的代码出现 bug 时, 不能直接在分支 pre-production 上修复 bug, 要用 pre-production 分支创建出一个 fixbug 分支. bug 被修复后, 用 pre-production 分支合并 fixbug 分支, 然后将 pre-production 分支的代码部署到预发布环境进行测试, 若测试通过则 bug 修复完毕, 删除 fixbug 分支
6. 用预发布 pre-production 分支创建 production 正式分支, 将其部署到正式环境
7. 如果要修复正式环境 bug, 用 production 分支创建出一个 fixbug 分支, 在 bug 修复后, 在本地测试通过后, 用 master 分支合并 fixbug 分支, 将 master 分支的代码部署到测试环境进行测试, 测试通过后才能发布到正式环境.
8. 在 GitLab flow 中版本发布不是采用打 tag 的形式. 而是要用 master 分支创建 release 分支, 分支的名字为 2-3-stable、2-4-stable 等等

## GitHub

如果是 Download ZIP 则只会下载最新代码, 不会下载.git 文件夹
要到设置里生成 token, 在 push 时候代替密码输入

## Gitlab

```bash
ssh-keygen -t ed25519 -C "gyhyfj@gmail.com"
ssh -T git@gitlab.com
```
