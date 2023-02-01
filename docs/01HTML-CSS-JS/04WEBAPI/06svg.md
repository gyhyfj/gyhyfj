# SVG

## 绘制形状

svg 标签
`<svg width="300" height="300"></svg>`

矩形 rect 标签
width height // 宽高，不带单位
x y // 矩形左上角坐标
rx ry // 圆角 x 轴 y 轴的半径

圆形 circle 标签
cx cy // 圆心坐标
r // 半径

椭圆 ellipse 标签
cx cy // 圆心坐标
rx ry // x 轴 y 轴的半径

直线 line 标签
x1 y1 x2 y2 // 起点和终点坐标
stroke // 描边颜色（省略则不会绘制）

折线 polyline 标签
points // 点集，两两一组表示一个坐标 `points="10 10, 200 80, 230 230"`
stroke // 描边颜色
fill // 填充颜色（自闭合填充，但不会补 stroke）（为 none 则不填充） fill 可以用`currentColor`，就可以继承外部的字体颜色 color 属性

多边形 polygon 标签
points // 点集，两两一组表示一个坐标，自动闭合
stroke // 描边颜色
fill // 填充颜色

直线路径 path
其实在 SVG 里，所有基本图形都是`<path>`的简写。所有描述轮廓的数据都放在 d 属性里，d 是 data 的简写
d 属性又包括以下主要的关键字：
M L l H h V v Z
M: 起始点坐标，moveto 的意思。每个路径都必须以 M 开始。M 传入 x 和 y 坐标，用逗号或者空格隔开。
L: 轮廓坐标，lineto 的意思。L 是跟在 M 后面的。它也是可以传入一个或多个坐标。大写的 L 是一个绝对位置。
l: 这是小写 L，和 L 的作用差不多，但 l 是一个相对位置。
H: 和上一个点的 Y 坐标相等，是 horizontal lineto 的意思。它是一个绝对位置。
h: 和 H 差不多，但 h 使用的是相对定位。
V: 和上一个点的 X 坐标相等，是 vertical lineto 的意思。它是一个绝对位置。
v: 这是一个小写的 v ，和大写 V 的差不多，但小写 v 是一个相对定位。
Z: 关闭当前路径，closepath 的意思。它会绘制一条直线回到当前子路径的起点。

## M L

```html
<svg width="300" height="300" style="border: 1px solid red;">
  <path d="M 10 10 L 50 40 L 100 10" stroke="blue" fill="none"></path>
</svg>
```

如果全是使用大写 L 来描述每个点的位置，那可以把 L 也去掉
`d="M 10 10 50 40 100 10"`等同于`d="M 10 10 L 50 40 L 100 10"`

```html
<svg width="300" height="300" style="border: 1px solid red;">
  <path d="M 10 10 50 40 100 10" stroke="blue" fill="none"></path>
</svg>
```

## l

相对位置写法（增量）
l 里的参数会与前一个点的 x 和 y 进行相加，得到一个新的坐标
`d="M 10 10 l 50 40 l 100 10 Z"` 等同于 `d="M 10 10 L 60 50 L 160 60 Z"`

## H 和 h

后面只需传入 X 坐标，它的 Y 坐标 与前一个点相同
H 是绝对坐标（绝对量） h 是相对坐标（增量）

## V 和 v

后面只需传入 Y 坐标，它的 X 坐标 与前一个点相同
V 是绝对坐标（绝对量） v 是相对坐标（增量）

## 曲线-椭圆弧路径 path

// 在 SVG 中可以使用 path 配合 A 属性 绘制椭圆弧
A(rx, ry, xr, laf, sf, x, y)
rx // 椭圆 X 轴半径
ry // 椭圆 Y 轴半径
xr // 椭圆旋转角度
laf // 0: 短边 1: 长边
sf // 0: 逆时针 1: 顺时针
x // 终点 X 轴坐标
y // 终点 Y 轴坐标

因为开始点是由 M 决定的，所以再确定 1 个终点，再确定椭圆半径，就可画出 2 个椭圆，
再通过开始点和结束点裁切，可以得到 4 条弧线
绘制弧线是比较抽象，可以使用 Illustrator 绘制，然后生成 SVG 来使用

```html
<svg width="500" height="300" class="svg">
  <!-- 红 -->
  <path d="M 125 75 A 100 50 0 0 0 225 125" stroke="red" fill="none" />

  <!-- 黄 -->
  <path d="M 125 75 A 100 50 0 0 1 225 125" stroke="yellow" fill="none" />

  <!-- 蓝 -->
  <path d="M 125 75 A 100 50 0 1 0 225 125" stroke="blue" fill="none" />

  <!-- 绿 -->
  <path d="M 125 75 A 100 50 0 1 1 225 125" stroke="green" fill="none" />
</svg>
```

## 设置样式

属性样式 // width="500"
内联样式 // 行内样式
内部样式 // 给形状添加类名，写在`<style>`标签内
外部样式 // 写在外部 css 文件种

设置在 svg 根节点上的 fill 属性和 svg 标签 css 样式的 fill 属性会作为内部 path 的默认属性，但如果内部 path 也写了 fill 属性则这里的优先级最高

常用属性样式：

fill="red|none|transparent 等" // 填充
fill-opacity // 取值 0-1，可与 fill 并存

stroke="red" // 描边的颜色
stroke-opacity // 取值 0-1，可与 stroke 并存
stroke-width // 宽度，数字，不带单位

stroke-dasharray // 虚线，与 canvas 设置相同，接收一串数字，这串数字可以用来代表线的长度和空隙的长度，建议直接传入偶数个数字 `stroke-dasharray="20 10"`
stroke-dashoffset // 虚线偏移量，接收一个数字

stroke-linecap // butt round square
stroke-linejoin // miter round bevel

## 反锯齿

关闭反锯齿 shape-rendering: crispEdges; （可能变毛糙）
开启反锯齿 shape-rendering: geometricPrecision; （可能变模糊）

## 文本元素 text 标签

和 Canvas 一样，SVG 的文本对齐方式是以第一个字基线的左下角为基准
想要完整显示文本，需要下移字体高度的距离

属性：
font-size="60" // 字体大小
font-weight="bold" // 加粗 normal 和 bold
text-decoration // 装饰线 none underline overline line-through
text-anchor // 水平对齐方式 start 左对齐；middle 居中；end 右对齐
dominant-baseline // auto；text-after-edge 在基线上方；middle 居中基线；text-before-edge 在基线下方
writing-mode // 纵向文字

多行文本 tspan 标签
text 标签内嵌 tspan 标签即可 `<tspan x="10" y="60">鲨鱼辣椒</tspan>`

## 超链接

在 SVG 里，链接要放在`<a>`标签的 xlink:href 属性里
如果希望鼠标放到链接上出现提示信息，可以在 xlink:title 属性里编写提示信息
如需在新窗口打开链接，可以设置 target="\_blank"
`<a>`标签除了可以包裹文本，还可以包裹图形等各种其他内容

```html
<svg width="400" height="400" style="border: 1px solid red;">
  <a
    xlink:href="https://juejin.cn/post/7116784455561248775"
    xlink:title="canvas"
    target="_blank"
  >
    <text x="20" y="20">也学学Canvas吧</text>
  </a>
</svg>
```

## 图片 iamge 标签

`<image>`是使用 xlink:href 属性获取图片的，和 HTML 的`<img>`标签用法差不多
