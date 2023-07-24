# shadow clip gradient 与 mask

## box-shadow 与 filter:drop-shadow()

水平偏移-垂直偏移-模糊半径-传播半径

不论是不是 border-box, box-shadow 都从 border 以外开始 (带有 insert 则是从 border 向内开始)

所谓 box-shadow 是这个 box 1:1 投影形成的 shadow , 没有传值时默认是被 box 本身遮盖, 这个 box 哪怕是背景全透明, 被遮挡住的 shadow 也不会显示出来

假如盒子设置 opacity, shadow 会继承这个属性变透明直到完全隐藏

假如盒子设置了圆角, 阴影也会有圆角

如果只给出两个值, 那么这两个值将会被当作 `<offset-x><offset-y>` 来解释
如果给出了第三个值, 那么第三个值将会被当作`<blur-radius>`解释 (模糊半径, 会以阴影外边缘开始再向外延扩撒一段距离)
如果给出了第四个值, 那么第四个值将会被当作`<spread-radius>`来解释 (传播半径, 不再 1: 1 投影, 而是投影大小进行缩放) , 这个值可以取负值, 那么影子面积就比盒子面积小, 而遮挡掉一部分, 可以用来实现更柔和的阴影效果

inset 关键字会使得阴影落在盒子内部, 这样看起来就像是内容被压低了. 此时阴影会在边框之内、背景之上、内容之下
color 如果没有, 则是纯黑
color 和 inset 没有顺序关系, 可以互换位置

可以同时设置多个阴影, 用逗号分割

如果父元素有 overflow: hidden;
子元素的 shadow 超出父元素的会被隐藏

## gradient

渐变是 background-image 属性的取值
可以多个叠加, 用逗号隔开

内部参数用逗号隔开,
在渐变中使用 transparent 关键字会在老的 safari 上有兼容性问题, 建议在一个定义的渐变中全部用 rbg 或全部用 rgba

### linear-gradient 线形渐变

第一个参数是方向
方向默认自上到下
可以通过 `to right` 或者 `90deg` 等设置方向

后面的参数是颜色控制点,
`red, red 30%` 等同于 `red 0%, red 30%`

`blue 50%` 前面如果没跟东西就代表会从 `0%` 以 `blue` 持续到 `50%`
`blue 50%` 后面如果没跟东西就代表会以 `blue` 持续到 `100%`

`green 10%, blue 10%` 表示在 `10%` 这里颜色强制分割

`red 10%, 30%, blue 90%` 这里的 `30%` 表示颜色过渡的中间点

如果列表中的颜色没有跟百分比, 则均匀过渡

### conic-gradient 锥形渐变

https://yuanchuan.dev/gradient-shapes/

第一个参数是方向和中心位置, 不写默认是 `from 0deg at 50% 50%`

后面颜色的写法是 `red 6deg 18deg,` 第一个角度表示起点 第二个角度表示终点, 未被分配的区域赋予渐变效果
这两个角度值都可以省略

### radial-gradient 环形渐变

第一个参数默认是 `closest-corner ellipse at 50% 50%` ellipse 关键字表示椭圆形渐变, circle 表示圆形渐变
后面的颜色写法是 `blue 20% 50%` 表示从 `20%` 到 `50%` 都是蓝色, 百分比表示径向的分布, 未被分配的区域赋予渐变效果

实现一个环形 `radial-gradient(transparent 0 30%, blue 30% 60%, transparent 60%)`
