# Git

## Git

三个区域：工作区 暂存区 仓库
三个状态：已修改 已暂存 已提交
基本的工作流程：修改 暂存 提交

https://www.bookstack.cn/read/git-tutorial

```bash
# git 配置
# 全局配置
# 如果username和email中没有空格，可以不写引号
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
git commit -m "msg" # 提交已暂存修改
git commit -a -m # 提交已跟踪修改，不包括新增文件

# 查看日志
git log
git log -5 --pretty=oneline

# 查看项目当前状态
git status
git status -s

# 回退版本
git reset [--soft | --mixed | --hard] [HEAD]
git reset e1af2 # 回退所有内容到e1af2版本
git reset HEAD^ # 回退所有内容到上一个版本
git reset HEAD^ a.txt # 回退a.txt到上一个版本

# --mixed 重置暂存区，工作区不变，默认可以省略
# --soft 都不重置 # 不小心把不该提交的内容提交了，可以执行这个，消除提交记录，最后统一提交
# --hard 都重置，且删除之前的提交

git checkout <commitID> # 切换到指定快照 switch也行
git checkout -- <filename> # 将指定文件从暂存区复制到工作区，丢弃工作区对该文件的修改
git checkout HEAD~ -- <filename> # 指定从某个 commit 恢复指定文件，同时改变暂存区和工作区

# 分支操作
git branch # 查看分支
git branch test # 创建新分支
git branch -d test # 删除分支 -D是强制删除
git branch -m master main # 重命名分支，把master重命名为main

git checkout test # 切换分支
git checkout -b test # 创建并切换到新分支

git merge test # 把指定分支合并到当前分支

# 暂存操作
git stash
git stash list # 列出所有暂时保存的工作
git stash apply stash@{1} # 恢复某个暂时保存的工作
git stash pop # 恢复最近一次stash的文件
git stash drop # 丢弃最近一次stash的文件
git stash clear # 删除所有的stash

# 本地修改与 source 存在冲突的情况 提示： Please commit your changes or stash them before you merge
# a、git stash # 保存修改在本地
# b、git pull source master # 跟新 source 的代码
# c、git stash pop # 提去本地的修改
# d、解决具体的冲突文件 ，此时编译器把冲突文件已经标红
# e、git status -> git add ->git commit -m "" -> git push origin master

# 远程操作

# 连接远程仓库
git remote add upstream xxxx.git # 添加与xxxx.git的连接并重命名为upstream

# 展示配置的远程仓库
git remote
git remote -v # 加上-v展示实际链接地址
# 默认远程仓库名是origin，其实只是个变量名，代替后面的链接用
git remote show origin # 展示全部信息

# 查看远程仓库的分支
git branch -a

# 获取远程分支
git checkout -b test origin/test # 切换分支，并在本地创建同样的分支名

# 推送本地更新到远程分支
git push origin dev
git push -u origin main # 加 -u 后，以后可以直接执行 git push

# 获取远程分支更新
git fetch
# 更新 git remote 中所有的远程 repo 所包含分支的最新 commit-id, 将其存到仓库区，即 .git/FETCH_HEAD 文件中

git diff origin/dev # 查看与 远程仓库名/分支名 区别

git checkout my-dev
git pull origin dev
# 将 origin 的 dev 分支合并到本地的 my-dev 分支
# git pull 其实是 git fetch 与 git merge 两个命令的集合，直接存到工作区
# 先执行 git fetch origin 当前分支名, 再执行 git merge FETCH_HEAD
```

merge 与 rebase
git merge 会让 2 个分支的提交按照提交时间进行排序，并且会把最新的 2 个 commit 合并成一个 commit。最后的分支树呈现非线性的结构
git rebase 将 dev 的当前提交复制到 master 的最新提交之后，会形成一个线性的分支树

git flow
git revert

## Git 工作流

分为三种工作流：
`Git flow` 适于版本发布
`GitHub flow` 适于持续发布
`GitLab flow` 适于持续发布和版本发布
也可以自定义工作流

它们都是“功能驱动式开发”，简称 FDD
指的是：
需求是开发的起点
先有需求再有功能分支或者补丁分支
完成开发后，该分支就合并到主分支，然后被删除

### Git flow

适用于产品交付类型的开发工作，使用 develop 分支作为所有开发人员的集成分支

为什么要用分支：
每一个开发任务使用独立的分支，这样就可以区分任务的优先级，对于不紧急的任务可以再自己分支上慢慢做，做好了再并入主分支；对于紧急任务，优先并入主分支，没有其他代码干扰，可以很快发版本

为什么要分支管理：
每个开发者的命名规约、分支用途不一致，会给沟通和管理带来困难，所以需要用同意的分支模式

分支类型：
master develop feature bugfix hotfix release support（维护分支）

### GitHub flow

是`Git flow`的简化版，是一个轻量级的工作流，直接在 main 分支上集成代码
最大优点就是简单，适于持续发布

协同开发流程：

1. 创建组织
2. 创建项目贮藏库
3. clone 主仓库（内部项目） 或 fork 主仓库和 clone fork 仓库（开源项目）
4. 添加上游地址（开源项目）`git remote add upstream xxx.git`
   此时再执行`git remote -v`查看，就会发现追踪到了`origin`和`upstream`两个远程仓库
5. 同步最新代码`git pull upstream main`
6. 创建功能分支`git checkout -b 'feat'`
7. 提交代码合并分支到本地最开始的主分支上`git commit -m 'msg'` 和`git switch main`和`git merge feat`
8. 合并最新代码（解决合并冲突）
   先`git fetch upstream`再`git merge upstream/main`
   然后解决冲突
9. 推送代码到自己 fork 的仓库 `git push`
10. 提交 pull request，点击 github 的`New pull request`和`Create pull request`
11. 审查代码
12. 合并和部署
13. 删除功能分支

### GitLab flow

## GitHub

如果是 Download ZIP 则只会下载最新代码，不会下载.git 文件夹
要到设置里生成 token，在 push 时候代替密码输入

## Gitlab

```bash
ssh-keygen -t ed25519 -C "gyhyfj@gmail.com"
ssh -T git@gitlab.com
```
