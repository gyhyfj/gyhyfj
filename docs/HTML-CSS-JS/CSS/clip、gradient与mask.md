# clip gradient 与 mask

## gradient

渐变是 background-image 属性的取值
可以多个叠加，用逗号隔开

内部参数用逗号隔开，
考虑 WebKit 的兼容性，尽量渐变中用到的颜色格式统一，不用 transparent 关键字

### linear-gradient 线形渐变

第一个参数是方向
方向默认自上到下
可以通过 `to right` 或者 `90deg` 等设置方向

后面的参数是颜色控制点，
`red, red 30%` 等同于 `red 0%, red 30%`

`blue 50%` 前面如果没跟东西就代表会从 `0%` 以 `blue` 持续到 `50%`
`blue 50%` 后面如果没跟东西就代表会以 `blue` 持续到 `100%`

`green 10%, blue 10%` 表示在 `10%` 这里颜色强制分割

`red 10%, 30%, blue 90%` 这里的 `30%` 表示颜色过渡的中间点

如果列表中的颜色没有跟百分比，则均匀过渡

### conic-gradient 锥形渐变

https://yuanchuan.dev/gradient-shapes/

第一个参数是方向和中心位置，不写默认是 `from 0deg at 50% 50%`

后面颜色的写法是 `red 6deg 18deg,` 第一个角度表示起点 第二个角度表示终点，未被分配的区域赋予渐变效果
这两个角度值都可以省略

### radial-gradient 环形渐变

第一个参数默认是 `closest-corner circle at 50% 50%`
后面的颜色写法是 `blue 20% 50%` 表示从 `20%` 到 `50%` 都是蓝色，百分比表示径向的分布，未被分配的区域赋予渐变效果

实现一个环形 `radial-gradient(transparent 0 30%, blue 30% 60%, transparent 60%)`
