# TCP 三次握手与四次挥手

HTTP 请求发送前有三次 TCP 连接

seq sequence number 序列号 随机生成的
ack acknowledgement number 确认号 ack=seq+1
ACK acknowledgement 确认序列号有效
SYN synchronous 发起新连接
FIN finish 完成

## 三次握手

客户端 -> SYN 建立连接 客户端 seq -> 服务端

服务端 -> SYN+ACK ack=客户端 seq+1 服务端 seq -> 客户端

客户端 -> seq=第一次发送的客户端 seq+1 ack=服务端 seq+1 -> 服务端

## 四次挥手

一开始客户端和服务端都处于 ESTABLISHED 状态

客户端 -> seq=u FIN -> 服务端 客户端发出后进入 FIN_WAIT_1 服务端接收后进入 CLOSE_WAIT
服务端 -> ack=u+1 ACK -> 客户端 客户端接收后进入 FIN_WAIT_2 如果有未完成的请求或者别的响应，在这个阶段会处理完成
服务端 -> FIN ACK ack=u+1 seq=w -> 客户端 服务端发出后进入LAST_ACK 客户端接收后进入TIME_WAIT 此时客户端进入超时等待状态，一般会持续1到4分钟，是因为服务端如果收不到有效的第四次挥手，会重新发送第三次挥手断开连接的请求
客户端 -> ACK seq=u+1 ack=w+1 -> 服务端 服务端接收后进入CLOSE状态
