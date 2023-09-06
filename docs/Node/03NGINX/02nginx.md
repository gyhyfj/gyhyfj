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

## 下载安装

先在 http://nginx.org/en/download.html 查看需要版本的下载链接
然后

```bash

wget http://nginx.org/download/nginx-1.25.2.tar.gz
tar -zxvf nginx-1.25.2.tar.gz
cd nginx-1.25.2

sudo apt install libpcre3 libpcre3-dev
sudo apt install openssl libssl-dev

./configure --prefix=/usr/local/nginx --with-http_ssl_module --with-http_stub_status_module

make
make install

# 查询nginx安装目录
whereis nginx

# 执行nginx
sudo /usr/local/nginx/sbin/nginx

# 添加环境变量
vim /etc/environment
# 添加:/usr/local/nginx/sbin
source /etc/environment
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
