# NGINX

Nginx (engine x) 是一个高性能的 HTTP 和反向代理 web 服务器, 同时提供 IMAP/POP3/SMTP 服务
主要功能是反向代理
通过配置文件可以实现集群和负载均衡
静态资源虚拟化

## 正向/反向代理

正向代理:
客户端和目标服务器之间有一个代理服务器, 请求会先经过代理服务器, 再被转发到目标服务器, 最后获得内容后响应给客户端

反向代理:
用户请求目标服务器, 由代理服务器决定访问哪个 ip

## 安装

centOS

```bash
# 安装依赖的库
yum install gcc-c++ # 编译工具
yum install -y pcre pcre-devel # nginx 的 http 模块使用 pcre 来解析正则表达式
yum install -y zlib zlib-devel # nginx 使用 zlib 对 http 包的内容进行 gzip
yum install -y openssl openssl-devel # OpenSSL 是一个强大的安全套接字层密码库, 囊括主要的密码算法、常用的密钥和证书封装管理功能及 SSL 协议
# 下载nginx
wget https://nginx.org/download/nginx-1.23.1.tar.gz
# 解压nginx
tar -zxvf nginx-1.23.1.tar.gz
cd nginx-1.23.1
# 执行nginx-configure文件
./configure
# 编译
make
make install
# 查询nginx安装目录
whereis nginx
# 进入安装目录执行nginx
cd /usr/local/nginx
cd sbin/
./nginx
# 清理下载的压缩包和解压文件
rm nginx-1.23.1.tar.gz
rm -rf nginx-1.23.1/
# 配置nginx环境变量
cd /etc/
vim profile # 在 export PATH 上一行插入 PATH=$PATH:/usr/local/nginx/sbin
source /etc/profile
```

## Nginx 常用命令

```bash
# 查看版本号
nginx -v
nginx -V
# 启动nginx
cd /usr/local/nginx/sbin/
./nginx
# 停止nginx
nginx -s stop # 立即停止
nginx -s quit # 退出前完成已经接受的请求处理
# 重载nginx配置文件
nginx -s reload
# 查看nginx进程
ps -ef | grep nginx # ps -ef 输出标准格式的linux进程命令, grep命令是查找
```

## Nginx 配置文件

打开配置文件

```bash
nginx -t # 检查配置文件是否有语法错误, 但同时得到了文件目录
vim  /usr/local/nginx/conf/nginx.conf
```
