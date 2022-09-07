# canvas

## 绘制形状

绘制矩形
strokeRect(x, y, width, height)
fillRect(x, y, width, height)
clearRect(x, y, width, height) // 设置矩形区域内像素完全透明

绘制路径
beginPath() // 每次这个方法调用之后，列表清空重置，然后我们就可以重新绘制新的图形
closePath() // 闭合路径
stroke() // 绘制 border，非内减模式
fill() // 调用这个函数会自动闭合路径

绘制直线
moveTo(x,y) // 移动笔触
lineTo(x,y) // 画直线

绘制矩形路径
rect(x, y, width, height)

绘制圆弧
arc(x, y, r, startAngle, endAngle, anticlockwise) // 弧度=(Math.PI/180)\*角度，向右下象限旋转
// anticlockwise 为 true 逆时针，默认 false 顺时针

贝塞尔曲线
quadraticCurveTo(cp1x, cp1y, x, y)
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)

Path2D
Path 对象，存储的是路径
new Path2D() // 空的 Path 对象
new Path2D(path) // 克隆 Path 对象
new Path2D(d) // 从 SVG 建立 Path 对象
Path2D.addPath(path [, transform]) // 添加了一条路径到当前路径 ??
示例：
var rectangle = new Path2D() // Path 对象，存储的是路径
rectangle.rect(10, 10, 50, 50) // 给 Path 对象添加路径
ctx.stroke(rectangle) // stroke 接收一个路径对象

## 添加颜色与样式

色彩
fillStyle = colorStr
strokeStyle = colorStr
globalAlpha = transparencyValue // 全局透明度，但只对后面的代码生效

线型
lineWidth = value // number，单位是 px
lineCap = type // butt（默认）|round|square（线段末端以方形结束，但是增加了一个宽度和线段相同，长度是线段宽度一半的矩形区域。）
lineJoin = type // miter（默认，延长相交）|bevel（方拐角）|round（圆角）
miterLimit = value // number，单位是 px（线条交接处内角顶点到外角顶点的最大长度）
setLineDash(segments) // 设置虚线样式，接收一个数组，描述交替绘制线段和间距长度的数组。如果数组元素的数量是奇数， 数组的元素会被复制并重复。
getLineDash() // 返回一个包含当前虚线样式，长度为非负偶数的数组

渐变
先创建渐变对象
let gradient = createLinearGradient(x1, y1, x2, y2) // 线型渐变
let gradient = createRadialGradient(x1, y1, r1, x2, y2, r2) // 径向渐变
再给渐变对象设置颜色属性
gradient.addColorStop(position, color) // position 参数必须是一个 0.0 与 1.0 之间的数
最后配置颜色为渐变
ctx.strokeStyle = gradient // 轮廓
ctx.fillStyle = gradient // 填充
就可以进行绘图

图案样式 Patterns
// 创建出一个 pattern 之后，赋给 fillStyle 或 strokeStyle 属性即可
// 需要确认 image 对象已经装载完毕，否则图案可能效果不对的
var img = new Image()
img.src = 'someimage.png'
img.onload = function(){
var ptrn = ctx.createPattern(img,'repeat') // 创建样式
ctx.fillStyle = ptrn // 把样式赋值给 fillStyle 或 strokeStyle
ctx.fillRect(0, 0, 150, 150) // 绘图
}

阴影
shadowOffsetX = float
shadowOffsetY = float
shadowBlur = float // 其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 0
shadowColor = color

填充规则
ctx.fill("nonzero") // 默认值，不留白
ctx.fill("evenodd") // 画环

## 绘制文本

绘制文本
fillText(text, x, y [, maxWidth]) // 实心文本 绘制的最大宽度是可选的
strokeText(text, x, y [, maxWidth]) // 空心文本

设置样式
font = value // string，默认 10px sans-serif
textAlign = value // start（默认）, end, left, right or center
textBaseline = value // top, hanging, middle, alphabetic（默认）, ideographic, bottom
direction = value // ltr, rtl, inherit（默认）

预测量
var text = ctx.measureText("foo") // 返回一个 TextMetrics 对象的宽度、所在像素 这些体现文本特性的属性。
text.width // 16

## 使用图像

获得需要绘制的图片
1 Image()函数构造出来的，或者任何的`<img>`元素（包括 data:url 方式的 img 标签）
2 用一个 HTML 的`<video>`元素作为你的图片源，可以从视频中抓取当前帧作为一个图像
3 用另一个`<canvas>`元素作为你的图片源
4 ImageBitmap 高性能的位图

绘制图片
drawImage(image, x, y) // image 是 image 或者 canvas 对象，x 和 y 是其在目标 canvas 里的起始坐标
drawImage(image, x, y, width, height) // width 和 height，这两个参数用来控制 当向 canvas 画入时应该缩放的大小
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) // 第一个参数和其它的是相同的，都是一个图像或者另一个 canvas 的引用。其它 8 个参数的前 4 个是定义图像源的切片位置和大小，后 4 个则是定义切片的目标显示位置和大小

控制图像的缩放行为
// imageSmoothingEnabled 属性来控制是否在缩放图像时使用平滑算法。默认值为 true，即启用平滑缩放
// 过度缩放图像可能会导致图像模糊或像素化
ctx.mozImageSmoothingEnabled = false 、、
ctx.webkitImageSmoothingEnabled = false
ctx.msImageSmoothingEnabled = false
ctx.imageSmoothingEnabled = false

## 变形

变形是一种更强大的方法，可以将原点移动到另一点、对网格进行旋转和缩放。

状态保存和恢复
save() // 保存画布的所有状态 Canvas 状态存储在栈中，每当 save 方法被调用后，当前的状态就被推送到栈中保存
restore() // 恢复画布的所有状态，都没有参数 每当 restore 方法被调用后，上一个保存的状态就从栈中弹出，所有设定都恢复

移动
translate(x, y) // 在做变形之前先保存状态是一个良好的习惯

```ts
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
// TODO
for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    ctx.save()
    ctx.fillStyle = 'rgb(' + 51 * i + ', ' + (255 - 51 * i) + ', 255)'
    ctx.translate(10 + j * 50, 10 + i * 50)
    ctx.fillRect(0, 0, 25, 25)
    ctx.restore() // 避免原点的移动累加
  }
}
```

旋转
rotate(angle) // 旋转的中心点始终是左上角的 canvas 的原点，如果要改变它，我们需要用到 translate 方法

```ts
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
// TODO
ctx.translate(75, 75)
for (var i = 1; i < 6; i++) {
  // Loop through rings (from inside to out)
  ctx.save()
  ctx.fillStyle = 'rgb(' + 51 * i + ',' + (255 - 51 * i) + ',255)'

  for (var j = 0; j < i * 6; j++) {
    // draw individual dots
    ctx.rotate((Math.PI * 2) / (i * 6))
    ctx.beginPath()
    ctx.arc(0, i * 12.5, 5, 0, Math.PI * 2, true)
    ctx.fill()
  }

  ctx.restore()
}
```

缩放
scale(x, y) // 以 1 为分界线进行缩放，如果参数为负实数，相当于以 x 或 y 轴作为对称轴镜像反转

变形
// 允许对变形矩阵直接修改
transform(a, b, c, d, e, f) // 将当前的变形矩阵乘上一个基于自身参数的矩阵
// a c e
// b d f
// 0 0 1
a(m11) 水平方向的缩放
b(m12) 竖直方向的倾斜偏移
c(m21) 水平方向的倾斜偏移
d(m22) 竖直方向的缩放
e(dx) 水平方向的移动
f(dy) 竖直方向的移动

## 合成与裁剪

globalCompositeOperation
// 我们不仅可以在已有图形后面再画新图形，还可以用来遮盖指定区域，清除画布中的某些部分
globalCompositeOperation = type // [12 种参数](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Compositing/Example)

clip
// 将当前正在构建的路径转换为当前的裁剪路径
// 裁切路径创建之后所有出现在它里面的东西才会画出来
ctx.beginPath()
ctx.arc(0,0,60,0,Math.PI\*2,true)
ctx.clip()

## 动画

1. 清空 canvas clearRect(x,y,width,height)
2. save()
3. 绘制动画帧
4. restore()

执行重绘
https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_animations

1. setInterval setTimeout requestAnimationFrame
2. 交互事件

```js
function clock() {
  var now = new Date()
  var ctx = document.getElementById('canvas').getContext('2d')
  ctx.save()
  ctx.clearRect(0, 0, 150, 150)
  ctx.translate(75, 75)
  ctx.scale(0.4, 0.4)
  ctx.rotate(-Math.PI / 2)
  ctx.strokeStyle = 'black'
  ctx.fillStyle = 'white'
  ctx.lineWidth = 8
  ctx.lineCap = 'round'

  // Hour marks
  ctx.save()
  for (var i = 0; i < 12; i++) {
    ctx.beginPath()
    ctx.rotate(Math.PI / 6)
    ctx.moveTo(100, 0)
    ctx.lineTo(120, 0)
    ctx.stroke()
  }
  ctx.restore()

  // Minute marks
  ctx.save()
  ctx.lineWidth = 5
  for (i = 0; i < 60; i++) {
    if (i % 5 != 0) {
      ctx.beginPath()
      ctx.moveTo(117, 0)
      ctx.lineTo(120, 0)
      ctx.stroke()
    }
    ctx.rotate(Math.PI / 30)
  }
  ctx.restore()

  var sec = now.getSeconds()
  var min = now.getMinutes()
  var hr = now.getHours()
  hr = hr >= 12 ? hr - 12 : hr

  ctx.fillStyle = 'black'

  // write Hours
  ctx.save()
  ctx.rotate(
    hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  )
  ctx.lineWidth = 14
  ctx.beginPath()
  ctx.moveTo(-20, 0)
  ctx.lineTo(80, 0)
  ctx.stroke()
  ctx.restore()

  // write Minutes
  ctx.save()
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec)
  ctx.lineWidth = 10
  ctx.beginPath()
  ctx.moveTo(-28, 0)
  ctx.lineTo(112, 0)
  ctx.stroke()
  ctx.restore()

  // Write seconds
  ctx.save()
  ctx.rotate((sec * Math.PI) / 30)
  ctx.strokeStyle = '#D40000'
  ctx.fillStyle = '#D40000'
  ctx.lineWidth = 6
  ctx.beginPath()
  ctx.moveTo(-30, 0)
  ctx.lineTo(83, 0)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(95, 0, 10, 0, Math.PI * 2, true)
  ctx.stroke()
  ctx.fillStyle = 'rgba(0,0,0,0)'
  ctx.arc(0, 0, 3, 0, Math.PI * 2, true)
  ctx.fill()
  ctx.restore()

  ctx.beginPath()
  ctx.lineWidth = 14
  ctx.strokeStyle = '#325FA2'
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true)
  ctx.stroke()

  ctx.restore()

  window.requestAnimationFrame(clock)
}

window.requestAnimationFrame(clock)
```