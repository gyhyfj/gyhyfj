# TCP三次握手与四次挥手

## 三次握手
seq sequence number 序列号随机生成的
ack acknowledgement number 确认号 ack=seq+1
ACK acknowledgement 确认序列号有效
SYN synchronous 发起新连接

客户端 -> SYN 建立连接 seq 序列号 -> 服务端

服务端 -> SYN+ACK ack序列号 = 客户端seq+1 seq服务端序列号 -> 客户端


