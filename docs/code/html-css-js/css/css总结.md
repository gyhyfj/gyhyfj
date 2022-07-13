<style scoped>
.vp-doc p {
  text-indent: unset;
}
</style>

# CSS 总结

## link 和 @import 的区别

```css
<link rel="stylesheet" type="txt/css" href="./common.css" />
@import './common.css'
```

1. link 是 HTML 提供的标签，不仅仅能加载 css。@import 是 css 提供的语法，只能加载 css
2. link 在页面加载同时加载 css。 @import 在页面加载完毕后再加载 css
3. @import 不支持 ie5 以下的低版本浏览器
4. 可以用 js 语句插入 link 标签来改变样式
5. link 标签引入的样式权重大于@import 的引入

## 伪元素和伪类的概念

1. 伪类是选择器的一种，它用于选择处于特定状态的元素
   伪类就是开头为冒号的关键字

2. 伪元素是一个附加至选择器末的关键词，允许你对被选择元素的特定部分修改样式
   伪元素是开头为两个冒号的关键字，它呈现出的效果就像是在 html 文档中插入了一个元素
   一些早期的伪元素曾使用过单引号的写法，现代浏览器为了向后兼容，仍支持这种写法

## transation 和 animation

transation 是过渡，强调过渡，它需要一个触发事件才执行，只要开头和结束两个关键帧
animation 是动画，它不需要触发事件就能执行，可以有多个关键帧

## 为什么用 translate 来改变位置

改变 translate 不会触发浏览器重新布局或重绘，只会触发复合。不会用到 CPU,效率更高，且不会脱标，不用担心扰乱标准流

## 设置为 inline 或 inline-block 的元素间的空白间隔是什么

浏览器会把 inline 或 inline-block 元素间的空白字符（空格、tab、换行）渲染成一个空格。由于通常书写代码时，会在 li 之间换行，所以会出现空白间隔

## 精灵图的使用

精灵图 Sprite 会将页面涉及的多个图片都包含到一张大图中，然后利用 CSS 的 background-image，background-repeat，background-position 属性的组合进行背景定位

主要优点是：1.减少 http 请求的次数，从而提高页面性能；2.多张小图合并后的总体积小于单独存在的体积之和

缺点：1.开发阶段不方便制作；2.维护阶段更换小图困难，追加图片又会增加体积

## 物理像素、逻辑像素和像素密度

1. 物理像素是指设备屏幕实际拥有的像素点
2. 逻辑像素是一种进行 css 样式设计时候的抽象单位
3. 像素密度（设备像素比）是设备的物理像素/css 像素

## 对 line-height 的理解

1. line-height 行高，是两行的基线的间距
2. 没有设置 height 的容器，撑开容器高度的是 line-height，而不是其中的文本内容
3. 把 line-height 和容器的 height 设置为相等，可实现单行文本的垂直居中
4. line-height 赋值为纯数字，表示为父级元素行高的倍数

## css 优化和提高性能的方法

### 1. 加载性能

1. css 压缩
2. css 单一样式（不合并写）
3. 减少使用@import
4. 去除空规则以减少 css 文件体积

### 2. 选择器性能

首先，选择器最后面的部分是关键词选择器，用来匹配目标元素。css 选择符是从右向左进行匹配的。当使用后代选择器时，浏览器会遍历所有子元素来判断是否符合选择器。

1. 如果关键选择器是 id 选择器，就不要为规则增加标签，过滤掉无关的规则
2. 避免使用通配规则
3. 尽量少用标签选择器
4. 尽量少用后代选择器（开销大），选择器层级深度应尽可能低

### 3. 渲染性能

1. 减少对一些可以继承来的属性指定重复规则
2. 少使用高性能属性（浮动、定位）
3. 属性为 0 时不加单位
4. 带浏览器前缀的属性在前，标准化属性在后
5. 慎重使用 web 字体

## css 工程化的理解

1. 宏观设计上：希望优化 css 文件的目录结构，像模块化那样对 css 文件进行复用
2. 编码优化上： 希望能写出结构清晰、简明易懂的 css，需要它有一目了然的嵌套层级结构，而不是平铺一铺到底，希望它具备更强可编程性
3. 前两点能做到，自然就实现了更强的可维护性

css 预处理器就能实现这些需求

## webpack 实现对 css 的处理

webpack 需要两个关机 loader 来处理 css：`css-loader`和`style-loader`
`css-loader`：导入 css 模块，对 css 代码进行编译处理
`style-loader`：创建 style 标签，把 css 内容写入标签
先执行前者，再之行后者

## display、float、position 的关系

首先判断是否`display:none`，然后剩下的就是一个优先级问题：

1. 判断 position 是否为 fixed 或 absolute，如果是，则 float 失效，然后设置 display
2. 判断 float 是否为 none，如果不是 none（即浮动）或该元素是根元素，则调整 display 值

## 场景应用

### 1. 实现一个三角形

原理：CSS 绘制三角形主要依靠 border 属性，也就是边框
平时在给盒子设置边框时，往往都设置的很窄，就可能误以为边框是由矩形组成的。实际上，border 是由三角形组成的。

```css
div {
  width: 0;
  height: 0;
  border: 100px solid;
  border-color: orange blue red green; // 四个不同颜色的三角形组成一个正方形
}
div {
  width: 0;
  height: 0;
  border: 100px solid transparent; // 边框颜色全设置为透明
  border-top-color: red; // 覆写上边框颜色，以显示一个向下的三角形
}
```

### 2. 实现一个扇形

原理：CSS 实现一个扇形原理和实现三角形一致，就是多了个圆角样式，实现一个 90 度的扇形

```css
div {
  width: 0;
  height: 0;
  border: 100px solid transparent; // 边框颜色全设置为透明
  border-top-color: red; // 覆写上边框颜色，以显示一个向下的三角形
  border-radius: 100px; // 化正方形为圆形
}
```

### 3. 实现一个圆形

```css
div {
  width: 100px;
  height: 100px;
  background-color: red;
  border-radius: 50px; // 化正方形为圆形
}
```

### 4. 实现一个宽高自适应的正方形

1. vw 方式

```css
.square {
  width: 10%;
  height: 10vw;
  background-color: red;
}
```

1. 利用元素的 margin、padding 百分比是相对父元素 width 值这个原理来实现

```css
.square {
  width: 20%;
  height: 0;
  padding-top: 20%; // 形成的正方形其实就是padding-top, 容器的内容反而在下方
  background-color: red;
}
```

3. 利用子元素的 margin-top 的值来实现：

```css
.square {
  width: 30%;
  overflow: hidden;
  background: red;
}
.square::after {
  content: '';
  display: block;
  margin-top: 100%; // 形成的正方形其实是伪元素的margin-top实现的，容器有内容则不再是正方形
}
```

### 5. 画一条 0.5px 的线

1. 利用 transform：scale()的方式

```css
transform: scale(0.5, 0.5);
```

2. 采用 meta viewport 的方式

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5"
/>
```

### 6. 如何解决 1px 宽度的边框的问题

问题：
1px 问题指的是：在一些 retina 屏上，移动页面的 1px 会变得很粗，呈现出不止 1px 的效果

原因：
css 中的 1px 并不能和移动设备上的 1px 划等号
`window.devicePixelRatio = 设备的物理像素 / CSS像素`, 在比如 iPhone6/7/8 上，这个值就是 2。意味着 1px 的 css 像素，在这些设备上会用 2 个物理像素单元渲染，所以看到的实际效果就比 1px 粗

解决方案：

1. 写代码时候直接写 0.5px
   缺陷：兼容性不足，不支持 IOS8 以下的的系统和安卓系统
2. 伪元素先放大再缩小
   思路是先放大再缩小：
   在目标元素后面添加一个`::after`伪元素，让这个元素 position 为 absolute，整个地平铺在目标元素上，然后把宽高设置为目标元素两倍，border 设置为 1px，然后用 scale(0.5)把整个伪元素缩小为 50%，此时，伪元素刚好宽高和原有元素对齐，border 也缩小为了 0.5px
3. viewport 缩放设置
   整个页面的所有内容都被无差别缩放了，没啥用
   ```html
   <meta
     name="viewport"
     content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no"
   />
   ```
