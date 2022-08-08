<style scoped>
.img{
  width:90%;
  height:90%;
  background:url("/image/AIflow-light.png")  no-repeat;
  background-size:contain;
}
.dark .img{
  width:90%;
  height:90%;
  background:url("/image/AIflow-dark.png")  no-repeat;
  background-size:contain;
}
</style>

# 简介

## 架构

AI-center（做管理用） <- AI-station（集群）

4 个算力平台：
BM1684 17.2TOPS
RK3588 6TOPS
RK3568 0.8TOPS
RV1126 2TOPS

集群：
分散式（水库）
集中式（一个工厂用一个强算力 station）

## AI 处理流程（视觉）

<br>
<div class="img"><img src="/image/AIflow-dark.png" style="width:90%;opacity:0;"></div>

## ML&AI

ML
天花板：（模板匹配）指纹识别
应用还有检测显示屏等

AI
2016 -> 2018 -> 2019/2020 -> 2022
取特征（卷积） -> 识别物体

VGG16
224x224x3（resize）
112x112x9（均值 维度变高）
...（卷积抽取特征）
（第 13 层）1x1x1024（VGG13）
FCx3（3 层全连接）
softmax

eg:人脸识别
1x1x512 相比较，与底库的余弦距离，与阈值比较

训练 推理：weight 文件（存各种特征）

## 常见的 AI 模型与作用

一、分类网络 VGG Resnet
给很多类别，判断是哪个类别（标签）（概率排序）

二、检测网络 YOLO（补充 v1-v7 知识，补充全） retinaface（偶尔用于人脸识别）
聚焦后再分析，特征更聚拢（anchor）

三、分割网络 mash-RCNN U-NET
得到轮廓级别的物体
像素级别的特征，特征局限于轮廓内（更准确）
挑战：巨大的标注工作量、算力要求更高（1 秒处理一帧） 价格（几十万 vs 几千）
（实例分割、全景分割）
