# PM2 Node 应用进程管理器

pm2 是 node 进程管理工具，可以利用它来简化很多 node 应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，因为在工作中遇到服务器重启后，需要一个个去重新启动每个服务，这样不仅繁琐、效率低，而且容易遗忘开启一些服务。

PM2 的主要特性：

- 内建负载均衡（使用 Node cluster 集群模块）
- 后台运行
- 0 秒停机重载
- 具有 Ubuntu 和 CentOS 的启动脚本
- 停止不稳定的进程（避免无限循环）
- 控制台检测
- 提供 HTTP API
- 远程控制和实时的接口 API ( Nodejs 模块,允许和 PM2 进程管理器交互 )

## 开始使用

安装
`npm i -g pm2`

启动服务
`pm2 start app.js`
`pm2 start app.js --watch` // 类似 nodemon，监听文件变动并重启 // TODO 监听整个文件夹吗？
`pm2 start app.js --watch -n aaa` // 重命名服务为 aaa

查看日志
`pm2 log`

查看服务表格
`pm2 list`

停掉某个服务
`pm2 stop 0` // 0 是对应的 id 或 name，如果是 all 则表示全部

重启某个服务
`pm2 restart 0` // 0 是对应的 id 或 name，如果是 all 则表示全部

删掉某个服务
`pm2 delete 0` // 0 是对应的 id 或 name，如果是 all 则表示全部

查看运行的进程的状态
`pm2 monit`
