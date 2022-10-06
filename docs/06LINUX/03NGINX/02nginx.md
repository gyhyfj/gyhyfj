# NGINX

## 安装

centOS

```bash
# 安装依赖的库
yum install gcc-c++
yum install -y pcre pcre-devel
yum install -y zlib zlib-devel
yum install -y openssl openssl-devel
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

```
