# HTML

## 标签语义化

用正确的标签做正确的事情

1. 有利于 SEO， 便于搜索引擎抓取有效信息
2. 提高代码可读性，页面内容结构化，便于开发和维护
3. 语义类还支持读屏软件，根据文章可以自动生成目录

例如: header footer nav article section aside footer address

## HTML5 新特性

1. 语义化标签
2. 媒体标签 audio、video
3. 表单
4. 进度条、度量器
5. DOM 操作`document.querySelector()`、 `document.querySelectorAll()`
6. webstorage
7. history API `history.go(num)（前进或后退,可正可负）` `history.forward(num)（前进）` `history.back（num）（后退）` `pushstate（改变url而不刷新）`
8. canvas 标签（使用 JS 在网页上绘制图像）
9. svg 标签（使用 XML 格式定义图形）
10. Geolocation API

## cookie 与 sessionStorage 和 localStorage 的区别

HTML5 的 webstorage 提供两种 API：localStorage（本地存储） 和 sessionStorage（会话存储）

简介：

1. cookie 每次请求都会携带在 http 请求中，所以它主要用于用户识别
2. sessionStorage 可用来保存一些临时数据
3. localStorage 可以用于跨页面数据交换（但不能跨浏览器）
4. sessionStorage 和 localStorage 的好处：减少网络流量，快速得到数据

区别：

1. 保存方式
   cookie 放在客户端浏览器上，webstorage 放在客户端上
2. 生命周期
   cookie 在设置的过期时间后失效，sessionStorage 是在页面关闭后失效，localStorage 可以永久保存
3. 存储大小
   cookie 最大 4k 左右，webstorage 最大 5M
4. 安全性
   webstorage 不会随 http 请求头发送，不会担心拦截，所以安全性更高，但仍存在伪造问题

## inline-block

行内块元素，一行的相邻行内块元素之间可能会有间隔。默认宽高是自身的宽高

## img 标签

src 属性可以用绝对路径或相对路径  
相对路径：`/`表示下级路径 `./`表示同级路径 `../`表示上级路径  
alt 属性是图片加载不出来时显示的内容
title 属性是鼠标移动到图片上时显示的内容

## 表格标签

结构：
thead、tbody 下面包裹 tr(行)， tr 下面包裹 th、td  
样式：
居中样式`align=“center/left/right”` 边框样式`<table border="1">` 将显示边框  
合并：
横向合并的格子 `<td rowspan = "跨越的行数"></td>`；纵向合并的格子 `<td colspan = "跨越的列"></td>`

## 列表标签

去除列表样式：`list-style: none`

## 表单标签

## src 与 href

src 用于替换当前元素，href 用于在当前文档和引用资源之间确立联系。

## DOCTYPE 的作用

DOCTYPE（文档类型）告诉浏览器以什么样的模式（html、xhtml）来渲染文档，  
必须在 html 文档的第一行`<!DOCTYPE html>`

## script 标签的 defer 和 async

1. 如果只是简单的`<scrpit>`标签，浏览器会解析到该标签时中断 html 解析，开始加载脚本，并在加载完毕后执行，执行结束后继续解析 html

2. `<script defer>`标签，会让脚本加载和解析 html 同时进行，并在 html 解析完毕后执行脚本
3. `<script async>`标签，会让脚本加载和解析 html 同时执行，但在加载完成后暂停 html 解析来执行脚本，执行完毕后继续解析 html 文档

## meta 标签

常用的 meta 标签  
属性：charset http-equiv name（keywords、description、viewport、robots）

```html
<!-- charset属性，用来描述 HTML 文档的编码类型 -->
<meta charset="UTF-8" />
<!-- http-equiv属性，页面重定向和刷新 -->
<meta http-equiv="refresh" content="0;url=" />
<!-- name属性，keywords，页面关键词 -->
<meta name="keywords" content="关键词" />
<!-- name属性，description，页面描述 -->
<meta name="description" content="页面描述" />
<!-- name属性，viewport，视口 -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1"
/>
<!-- name属性，搜索引擎索引方式 -->
<meta name="robots" content="index,follow" />
<!-- 
  其中，content 参数有以下几种：
  all：文件将被检索，且页面上的链接可以被查询；
  none：文件将不被检索，且页面上的链接不可以被查询；
  index：文件将被检索；
  follow：页面上的链接可以被查询；
  noindex：文件将不被检索；
  nofollow：页面上的链接不可以被查询。
 -->
```

## img 标签 srcset 属性

srcset 属性用于设置：不同屏幕密度下，自动加载不同的图片
下面的 HTML 表明图像的默认宽度是 200 像素。 srcset 属性还指定了 200 像素版本应用于 1x 显示器，而 400 像素版本应用于 2x 显示器。
（为方便开发，苹果将设备分为了@1x、@2x、@3x 三大类）

```html
<div class="box">
  <img
    src="https://yari-demos.prod.mdn.mozit.cloud/en-US/docs/web/html/element/img/clock-demo-200px.png"
    alt="Clock"
    srcset="
      https://yari-demos.prod.mdn.mozit.cloud/en-US/docs/web/html/element/img/clock-demo-200px.png 1x,
      https://yari-demos.prod.mdn.mozit.cloud/en-US/docs/web/html/element/img/clock-demo-400px.png 2x
    "
  />
</div>
```

## web worker

JS 使用的是单线程模型，web worker 的作用是为 JS 创建多线程环境，运行主线程创建 worker 线程，将一些任务分配给后者

## title 与 h1、b 与 strong、i 与 em

1. titile 标签表示只是一个标题，而 h1 标签表示一个层次明确的标题，对页面信息抓取影响很大
2. b 标签与 strong 标签显示效果相同，strong 标签有明确语义，搜索引擎更侧重 strong 标签
3. em 标签有明确寓意，表示强调的文本（emphase）

## head 标签

head 标签是所有头部元素的容器，里面只有 title 标签是必须的

```html
<head>
  <title>Document</title>
</head>
```
