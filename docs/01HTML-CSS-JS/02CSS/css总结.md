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

## 水平垂直居中

1. flex 布局
   给弹性盒子设置 `display: flex; justify-content: center; align-items: center;`
   也可以单独设置子元素在主轴维度的对齐 `align-self: center;`

2. 绝对定位 加 margin 负值
   要求已知子元素宽高，先把左上角对齐盒子中心点，再用负数 margin 把元素整体拉到居中位置

   ```css
   父元素 {
     position: relative;
   }
   子元素 {
     position: absolute;
     top: 50%;
     left: 50%; // 子元素右上角与盒子中心点对齐
     margin-top: -子元素高度/2;
     margin-left: -子元素宽度/2; // 这里不能用百分比代表子元素宽高，所以需要提前知道子元素宽高值
   }
   ```

3. 绝对定位 加 transform: translate()
   不需要知道子元素宽高，先把左上角对齐盒子中心点，再用 transform: translate() 把元素整体拉到居中位置

   ```css
   父元素 {
     position: relative;
   }
   子元素 {
     position: absolute;
     top: 50%;
     left: 50%; // 子元素右上角与盒子中心点对齐
     transform: translate(-50%, -50%); // 向左向上移动自身宽高的 50%
   }
   ```

4. 绝对定位 加 margin: auto

   ```css
   父元素 {
     position: relative;
   }
   子元素 {
     position: absolute;
     top: 0;
     right: 0;
     bottom: 0;
     left: 0; // 元素充满盒子空间
     margin: auto; // 自动分配 margin 以充满空间
   }
   ```

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
平时在给盒子设置边框时，往往都设置的很窄，就可能误以为边框是由矩形组成的。
实际上，border 是由三角形组成的。

<div style=" width: 0;height: 0;border: 50px solid;border-color: orange blue red green;"></div>

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

<div style=" width: 0;height: 0;border: 50px solid transparent;border-left-color: green; border-radius: 100px; "></div>

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

2. 利用元素的 margin、padding 百分比是相对父元素 width 值这个原理来实现

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

4. aspect-ratio 属性确定宽高比
   注意：在微信安装内置浏览器中不兼容

```css
.square {
  aspect-ratio: 1 / 1;
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

## BFC

BFC(Block Formatting Context)也叫"块格式化上下文"。
简单来说就是，BFC 是一个完全独立的空间（布局环境），让空间里的子元素不会影响到外面的布局，起到隔离保护的作用。

格式化上下文影响布局，通常，我们会为定位和清除浮动创建新的 BFC，而不是更改布局，因为它将：

1. 包含内部浮动
   1. 在创建包含浮动元素的 BFC 时，通常的做法是设置父元素 overflow: auto 或者其它除默认的 overflow: visible 以外的值。div 元素变成布局中的迷你布局，任何子元素都会被包含进去。
   2. 使用 display: flow-root
      一个新的 display 属性的值，它可以创建无副作用的 BFC。在父级块中使用 display: flow-root 可以创建新的 BFC。
      给 div 元素设置 display: flow-root 属性后，div 中的所有内容都会参与 BFC，浮动的内容不会从底部溢出。
2. 排除外部浮动
   使用 display: flow-root 和浮动实现双列布局，因为正常文档流中建立的 BFC 不得与元素本身所在的块格式化上下文中的任何浮动的外边距重叠。
3. 阻止外边距重叠
   创建新的 BFC 避免两个相邻的 div 之间 外边距重叠

### 下列方式会创建块格式化上下文：

根元素（html）
浮动元素（float 值不为 none）
绝对定位元素（position 值为 absolute 或 fixed）
行内块元素（display 值为 inline-block）
表格单元格（display 值为 table-cell，HTML 表格单元格默认值）
表格标题（display 值为 table-caption，HTML 表格标题默认值）
匿名表格单元格元素（display 值为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是 HTML table、tr、tbody、thead、tfoot 的默认值）或 inline-table）
overflow 值不为 visible、clip 的块元素
display 值为 flow-root 的元素
contain 值为 layout、content 或 paint 的元素
弹性元素（display 值为 flex 或 inline-flex 元素的直接子元素），如果它们本身既不是 flex、grid 也不是 table 容器
网格元素（display 值为 grid 或 inline-grid 元素的直接子元素），如果它们本身既不是 flex、grid 也不是 table 容器
多列容器（column-count 或 column-width (en-US) 值不为 auto，包括 column-count 为 1）
column-span 值为 all 的元素始终会创建一个新的 BFC，即使该元素没有包裹在一个多列容器中

## zoom 和 scale

scale:
只支持数值，不支持百分比和关键字
默认左上角开始缩放，可以通过取负值从右下角缩放，也可以设置缩放中心
scale 生效时该元素本身大小没有变化，只在当前元素上重绘，不引起页面回流（重排）

zoom:
取值可以是数值、百分比以及 normal
缩放中心是左上角
缩放改变了元素占据空间的大小所以会引起页面回流（重排）
渲染方式似乎不同（zoom 是锐化而非模糊）
zoom 不能解决 1px 问题
zoom 兼容性差一些，是非标准属性，Firefox 和 Firefox for Android 浏览器不支持

## 子元素继承

百分比：
内减模式，继承父元素宽高，不包括 margin 和 padding
