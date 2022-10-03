# CSS 基础

## 选择器

- 基础选择器（4 种）：
  标签选择器、类选择器、id 选择器、通配符选择器`*`

- 复合选择器（5 种）：
  后代选择器、子代选择器（用`>`连接，只选择子代这一代中的元素）、并集选择器（用`,`连接）、交集选择器（`.a.b`，中间无空格）、伪类选择器（链接伪类选择器`a:link` `a:visited` `a:hover` `a:active`（按下未抬起） 、聚焦伪类选择器`:focus`）、特殊兄弟选择器`~ +` `A~B`表示 A 后的所有 B 元素， `A+B`表示 A 后的紧邻的 B 元素

- 新增选择器（3 种）：
  - 属性选择器
    `E[attr]`、`E[attr="val"]`、`E[attr^="val"]`（开头）、`E[attr$="val"]`（结尾）、`E[attr*="val"]`（含有）、`E[attr~="val"]`（含有某个独立单词）、
  - 结构伪类选择器
    孩子选择器 `E:first-child`、`E:last-child`、`E:nth-child(n)`（1，2，even，odd，3n，`E:nth-child(3)` 选择父元素下的第 3 个子元素，且这个子元素必须符合 E）、`E:only-child`
    兄弟选择器 `E:first-of-type`、`E:last-of-type`、`E:nth-of-type(n)`（选择父元素下第 n 个符合 E 的子元素，不要求位置也是第 n 个）、`E:only-of-type`
  - 伪元素选择器
    `::before` `::after` （必须设置 content 属性才能生效，哪怕 content 里没有内容，也要放个空引号在这。伪元素默认是行内元素）
  - 其他伪类选择器
    :root 选择器来选择 HTML 页面的根元素，相当于 html
    :empty 选择器来选择一个“不包含任何子元素和内容”的元素，也就是选择一个空元素
    :not()选择器来选取某一个元素之外的所有元素。括号里用来写选择器

说明：
类名可以用特殊字符，比如`-` `:`，如果是类名里有冒号要加转义字符
`.hover\:bg-red-700:hover`

## 选择器优先级（权重）

`!important`>`行内样式`>`id选择器`>`类、伪类、属性选择器`>`标签、伪元素选择器`>`通配符和继承`

## 溢出文字省略并显示省略号

一行

```css
overflow：hidden；
white-space：nowrap；
text-overflow：ellipsis
```

多行

```css
display：-webkit-box；
-webkit-line-clamp：2；
line-clamp：2；
overflow：hidden；
text-overflow：ellipsis；
-webkit-box-orient：vertical；
```

## 盒子模型

box-sizing:border-box 内减模式 （怪异盒子） // 盒子宽高包含了 padding 和 border
box-sizing:content-box 默认模式 （标注盒子） // 盒子宽高只包含 content，修改 border 尺寸 和 padding 尺寸会改变盒子大小
box-sizing:padding-box 默认模式 （标注盒子） // 盒子宽高包含 padding

## calc 函数

width：calc（100% - 80px）
可以混合各种单位进行计算
注意：括号里面可以使用`+ - * /`来进行计算。注：`+ - * /`前后要各加上一个空格。

## border-radius

border-radius: 取值; // 分一个值(O)、两个值(X)、三个值(/)、四个值(左上开始顺时针)
border-radius 实现椭圆：border-radius:x/y; // x 表示圆角的水平半径，y 表示圆角的垂直半径

## img 标签的样式

在父元素中水平对齐：设置父元素的`text-align: center`
垂直对齐：设置 img 标签的`vertical-align: top/middle/baseline/bottom`

图片阴影效果：

```css
.image {
  /* box-shadow: 0 0 20px gray */ // 在图片边框处产生阴影
  filter: drop-shadow(0 0 0 2px gray); // 去除图片透明背景后产生阴影
}
```

还可以通过定位把一张一模一样的图片重合在该图片下面，然后设置如下，使阴影颜色更自然，颜色更对应：

```css
.bg-image {
  z-index: -1;
  filter: blur(20px);
}
```

## background 属性

背景一般默认是铺在 padding 和 content 上，但可以修改：
`background-origin: border-box/padding-box/content-box`
body 元素默认有 8px 的 margin，所以设置全网页背景要设置给 html 或 :root

background: color image repeat position
background-image: url(a.png); // 路径加不加引号都可以 这里的 a 是同级的
background-repeat: repeat/no-repeat/repeat-x/repeat-y;
background-position: 像素值/关键字（center） 或 水平距离 垂直距离;
background-size: cover(完全覆盖)、contain(最大容纳) 或 两个数值：像素值、百分比（相当于盒子自身宽高），第一个代表宽度，第二个是=代表高度

## filter

filter：blur(5px); // 模糊内容，整个盒子（包括边框）模糊并向外晕染
backdrop-fliter:blur(25px); // 使该元素背景呈毛玻璃效果
-webkit-backdrop-fliter:blur(25px); // 兼容 webkit 内核

## 背景渐变

```css
background: linear-gradient（方向，颜色1，颜色2，。。。） // 120deg
background: -webkit-linear-gradient（方向，颜色1，颜色2，。。。）
```

## transition 过度

结合 hover 伪类使用（不是写在 hover 中的）
transition：all（要过渡的属性） 2s（过渡时间） linear（速度方式） 1s（开始延迟时间）

## transform 变形

transform: translate(x, y); // x 和 y 可以是 px 等距离，**也可以是百分比（相对元素自身的宽高）**
transform: scale(x, y); // x 和 y 是缩放倍率，小于 1 缩小，大于 1 放大
transform: skew(x, y); // x 和 y 是倾斜角度，单位 deg
transform: rotate(angle); // angle 是旋转角度，单位 deg

旋转会改变坐标的轴向
如果以后既有位移又有旋转 一定要先写位移
transform: translate() rotate();
多重转换效果且不能分开写
只有后面的生效 因为 css 重叠性

默认情况下，CSS3 的各种变形（平移、缩放、倾斜等）都是以元素的中心原点进行变形的
我们可以设置 transform-origin 属性来改变元素的中心原点

```css
transform-origin： 10px 10px
// 或者
transform-origin： center bottom
// 或者
transform-origin： 50% 50%（自身元素、默认值）
```

## animation 动画

相当于循环往复的 transition（过度）

第一步：定义动画

```css
@keyframes 动画名 {
  0% {
  }
  …… 100% {
  }
}

@keyframes 动画名 {
  from {
  } // 0%
  to {
  } // 100%
}
```

第二步：调用动画

```js
animation: 动画名称 持续时间 动画方式 延迟时间 动画次数 动画方向; // 6 个子属性
animation-play-state：动画运动状态 running（运动） paused（暂停） // 经常与hover一起使用
```

## 元素的隐藏

display: none; // 隐藏后不再占用空间，会导致整个文档重排。会让元素不再被渲染，子孙节点也不会渲染。
visibility: hidden; // 隐藏后仍占用空间，不会导致重排。子孙节点也会消失，但只是继承了父节点的`visibility: hidden;`属性，修改后就会显示出来。修改该元素只会造成本元素重绘。且隐藏后点击事件不再触发。
opacity: 0; // 只是全透明，并没有隐藏。点击事件等仍可触发。`[əʊˈpæsəti]`
overflow: hidden（隐藏超出内容） scroll（显示滚动条，不论是否需要） auto（需要时才显示滚动条）
position: absolute; // 将元素移到可视区域外
z-index: -999; // 通过别的元素来遮挡
clip/clip-path // 通过元素裁剪隐藏，但仍占位置
transform: scale(0,0) // 将元素尺寸缩放为 0，但仍占位置，但不可被点击到

## 定位

1. 相对定位 relative
   相对于自己的原来位置偏移。实际开发中的主要作用是配合子元素的绝对定位。**不脱标**
2. 绝对定位 absolute
   子绝父相，以最近的、有定位的祖先为准偏移。**脱标**
3. 固定定位 fixed
   相对于浏览器可视区边界偏移，必须设置宽度。**脱标**
4. 粘性定位 sticky
   position: sticky; top: 10px;（滚动到距离顶端 10px 时候固定住）。**不脱标**
   粘性定位必须搭配 top、bottom、left、right 才能生效，否则表现为 relatvie

## z-index

默认的元素层级：标准流<浮动<定位
只有有定位`position:relative/absolute/fixed`的盒子，设置`z-index`属性才能生效

`z-index`在下列情况下会失效：
父元素 position 是 relative
元素设置了浮动

## 浮动

浮动的元素会**脱标**
浮动元素顶部对齐
任何元素都可以设置浮动，浮动后具有行内块元素特性
浮动的盒子只会影响浮动盒子后面的标准流

## 清除浮动

为什么：
因为容器不设置高度且子元素浮动时，浮动的子元素脱离文档流，不占据空间，导致父元素高度无法被撑开，影响布局

是什么：
如果父元素有高度，就不需要清除浮动
清除浮动，其实是清除浮动元素造成的影响

怎么做：

1. 额外标签法
   在浮动元素后面添加一个块级标签 `<div style="clear: both"></div>`
2. 父元素添加 overflow 属性
3. 父元素添加 after 伪元素
   ```css
   .clearfix::after {
     content: '';
     display: block;
     clear: both;
     height: 0; // 兼容低版本浏览器
     visiblity: hidden; // 兼容低版本浏览器
   }
   ```
4. 父元素添加双伪元素
   ```css
   .clearfix:before,
   .clearfix:after {
     content: '';
     display: table; // 设置为table作用是没有内容也会占一行的空间高度，如果是block, 没有内容就不占空间了
   }
   .clearfix:after {
     clear: both;
   }
   .clearfix {
     *zoom: 1;
   }
   ```

## 一个冒号与两个冒号

一般一个冒号用于伪类，两个冒号用于伪元素
`.clearfix:before`这里的一个冒号是 w3c（万维网联盟） 给的特殊规定，只有少数几个早期出现的伪元素可以用一个或两个冒号

## 外边距 margin 坍塌

互相嵌套的块级元素，子元素和父元素的 margin-top 会合并生效在父元素上，并取最大值。
如果子元素 margin-top 大于父元素的 margin-top，导致父元素一起往下移动（塌陷）
解决办法：

1. 分隔父子元素的 margin-top（给父元素设置 border-top 或者 padding-top）
2. 给父元素添加 overflow 属性（取值任意）
3. 把子元素或父元素转换成行内块元素
4. 给子元素或父元素设置浮动

## 外边距 margin 重叠

垂直布局的块级元素上下的 margin 会合并，最终距离为 margin 的最大值
解决方法：只给其中一个盒子设置 margin

## viewport

布局视口：layout viewport【网页的宽度】

视觉视口：visual viewport【视觉视口是指用户正在看到的网站的区域】（这个区域的宽度等同于移动设备的浏览器窗口的宽度）

理想视口：ideal viewport【使布局视口的大小和屏幕宽度是一致的】

通过 width=device-width，所有浏览器都能把当前的 viewport 宽度变成 ideal viewport 的宽度，但要注意的是，在 iphone 和 ipad 上，无论是竖屏还是横屏，宽度都是竖屏时 ideal viewport 的宽度

## 弹性盒子

任何一种元素都可以使用 flex 布局，转化为块级元素

设为 flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效
弹性盒子父元素控制子元素排版：

1. 水平对齐
   justify-content: flex-start flex-end center space-between space-around
2. 垂直对齐
   align-items: flex-start flex-end center baseline stretch
3. 主轴方向（flex-flow）
   flex-direction: row row-reverse column column-reverse
4. 是否换行（flex-flow）
   flex-wrap: nowrap wrap wrap-reverse
   `flex-flow:colum wrap;`
5. 行的分布
   align-content: flex-start flex-end center space-between space-around

单独调整子元素排版：

1. 元素排序：
   order: 0;（数值越小排序越靠前）
2. 尺寸分配：
   flex: flex-grow（放大比例） flex-shrink（缩小比例） flex-basis（项目占据的主轴空间，默认是 auto，即项目本身的大小）
   默认值是 0 1 auto
   `flex: 1` 表示 flex: 1 1 auto;
3. 对齐侧轴方式：
   align-self: lex-start、flex-end、center、baseline、strecth

## 弹性盒子的文字省略

一定要限制好容器宽度，
有时用 flex 限制尺寸，要加上 width: 0;
因为弹性盒子尺寸会被内容撑开

```css
.box {
  flex: 1;
  width: 0;
}
.box h5 {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
```
