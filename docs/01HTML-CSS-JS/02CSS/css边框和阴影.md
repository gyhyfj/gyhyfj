# 边框和阴影

## box-shadow

不论是不是 border-box，box-shadow 都从 border 以外开始 （带有 insert 则是从 border 向内开始）

所谓 box-shadow 是这个 box 1:1 投影形成的 shadow ，没有传值时默认是被 box 本身遮盖，这个 box 哪怕是背景全透明，被遮挡住的 shadow 也不会显示出来

假如盒子设置 opacity，shadow 会继承这个属性变透明直到完全隐藏

假如盒子设置了圆角，阴影也会有圆角

如果只给出两个值，那么这两个值将会被当作 `<offset-x><offset-y>` 来解释
如果给出了第三个值，那么第三个值将会被当作`<blur-radius>`解释（模糊程度，会以阴影外边缘开始再向外延扩撒一段距离）
如果给出了第四个值，那么第四个值将会被当作`<spread-radius>`来解释（不再 1：1 投影，而是投影大小进行缩放）

inset 关键字会使得阴影落在盒子内部，这样看起来就像是内容被压低了。此时阴影会在边框之内、背景之上、内容之下
color 如果没有，则是纯黑
color 和 inset 没有顺序关系，可以互换位置

shadow 可以同时叠加多个，用逗号分割

如果父元素有 overflow: hidden;
子元素的 shadow 超出父元素的会被隐藏
