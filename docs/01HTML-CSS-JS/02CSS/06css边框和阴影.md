# 边框和阴影

## box-shadow

不论是不是 border-box，box-shadow 都从 border 以外开始 （带有 insert 则是从 border 向内开始）

所谓 box-shadow 是这个 box 1:1 投影形成的 shadow ，没有传值时默认是被 box 本身遮盖，这个 box 哪怕是背景全透明，被遮挡住的 shadow 也不会显示出来

假如盒子设置 opacity，shadow 会继承这个属性变透明直到完全隐藏

假如盒子设置了圆角，阴影也会有圆角

如果只给出两个值，那么这两个值将会被当作 `<offset-x><offset-y>` 来解释
如果给出了第三个值，那么第三个值将会被当作`<blur-radius>`解释（模糊半径，会以阴影外边缘开始再向外延扩撒一段距离）
如果给出了第四个值，那么第四个值将会被当作`<spread-radius>`来解释（传播半径，不再 1：1 投影，而是投影大小进行缩放），这个值可以取负值，那么影子面积就比盒子面积小，而遮挡掉一部分，可以用来实现更柔和的阴影效果

inset 关键字会使得阴影落在盒子内部，这样看起来就像是内容被压低了。此时阴影会在边框之内、背景之上、内容之下
color 如果没有，则是纯黑
color 和 inset 没有顺序关系，可以互换位置

可以同时设置多个阴影，用逗号分割

如果父元素有 overflow: hidden;
子元素的 shadow 超出父元素的会被隐藏

## 背景

简写是` background : [background-color] [background-image] [background-repeat] [background-attachment] [background-position] / [background-size] [background-origin] [background-clip]`

可以多个背景，用逗号分隔

如果前面写了一些子属性，后面又用聚合属性覆写，聚合属性会用覆写前面的子属性

```scss
.box {
  background-position: center;
  // 如果使用百分比
  // 默认是0% 0%，是左上角对左上角，如果设置50% 50%则是居中显示，如果设置100% 100%则是右下角对右下角，如果只写一个值则是水平方向对齐位置，垂直方向默认50%
  // 如果使用单位
  // 可以是px之类任意单位，0 0是左上角对左上角，如果只写一个值则是水平方向对齐位置，垂直方向默认50%
  // 如果使用英文关键字
  // 取值可选center top bottom left right，如果只写一个值则是另一个默认center
  background-repeat: no-repeat; // 默认是repeat，还可选repeat-x、repeat-y
  background-size: contain;
  // 设置背景图片宽高
  // 如果是百分比，则相对元素的宽高的百分比
  // 如果是数值，则是宽高值，只写一个的话，另一个是auto等比缩放
  // 关键字的值有cover和contain，都是等比缩放
  // background-color: red; // 假如background-image存在透明的地方，就会显示background-color // 默认是transparent
  border: 5px solid transparent;
  border: 1px solid red;

  background-image: url('https://**/*.png'); // 尽量用引号包裹，否则遇到特殊字符可能会识别出错
  background-attachment: scroll; // 默认scroll，页面滚动时候背景跟着页面内容滚动，还可选fixed，页面滚动时候背景不滚动
  background-origin: padding-box;
  // 背景图片的相对定位（背景色永远是铺满）
  // padding-box是从padding（含）开始绘制背景，border-box是从border（含）开始绘制背景，content-box是从content（含）开始绘制背景
  background-clip: content-box; // 取值类似background-origin，但定位还是根据background-origin，然后再根据这个属性进行裁剪，只显示范围内的背景
  // 可以设置多个值，从某一个区域裁剪至另一个区有，从内向外，顺序不能变
  -webkit-background-clip: text;
  // 这个私有属性会以区块内的文字作为裁剪区域向外裁剪
}
```
