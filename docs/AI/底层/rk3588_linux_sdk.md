RK3588 RK3588S
接口比较丰富 功能

## 适用产品介绍

针对以下场景做了 SDK 优化

ARM PC
平板(包括学习机) -> RK3588S
扫地机 NPU 性能可以满足
开发板 支持的接口和扩展非常丰富，适合用于很多开发者的开发板
机器人 支持多路摄像头的输入 非常强大的 pci-e 的功能，可以实现很多机器人的场景
直播机 性能强大 网络吞吐率和延时高
车载产品
会议大屏
手持终端

## 开发资源介绍

---

SDK 文档
Common（通用开发指导文档）
Linux（Linux 开发文档）
Socs（芯片快速入门文档）
Others（其他文档）

---

SDK 工具

开发调试 - 量产两大块
windows linux macos 三种操作系统环境下
linux 下的工具和 windows 下的基本是对应的

---

UEFI (sdk/uefi)
作为系统的初始引导部分
UEFI 在启动时会对硬件做自适应，实现硬件信息与 OS 剥离
全部开源

---

多媒体开发
通过 gstreamer/rockit 框架 在 rockchip 平台上做 multimedia 开发
整体通路：APP->gstreamer/rockit->mpp->vpu

图形开发

应用开发
rk 自带的 demo： Docker ROS 等，现成但不能达到产品化，可以参考

安全机制开发
保护设备使用正确有效的固件，非签名固件或无效固件无法启动

WIFI/BT 开发
linux 上有适配比较多的模组和芯片

## 开发调试流程介绍

rk3588 linux sdk 系统 基于 buildroot/yocto/debin 系统，内核基于 kernel5.10 开发

---

U-Boot 开发（next-dev 分支）

Kernel 开发

Recovery 开发

OS 开发（Buidlroot 开发 Debian 开发 Yocto 开发）

---

vop gpu rga vpu npu isp

系统适配 -> overlay

GPU 适配

RGA 适配 -> 2D 图形加速器

drm-cursor 适配

xserver 适配

mpp 适配

GStreamer 适配

编码服务适配

camera 适配

WIFI/BT 适配

音频适配 -> pulseaudio

NPU 适配
rknntools2

SDK 测试
