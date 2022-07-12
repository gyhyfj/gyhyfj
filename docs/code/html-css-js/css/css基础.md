<style scoped>
.vp-doc p {
  text-indent: unset;
}
</style>

# CSS 基础

## 选择器

- 基础选择器（4 种）：  
  标签选择器、类选择器、id 选择器、通配符选择器`*`

- 复合选择器（4 种）：  
  后代选择器、子代选择器（用`>`连接，只选择子代这一代中的元素）、并集选择器（用`,`连接）、伪类选择器（链接伪类选择器`a:link` `a:visited` `a:hover` `a:active`（按下未抬起） 、聚焦伪类选择器`:focus`）

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

box-sizing:border-box 内减模式  
box-sizing:content-box 默认模式

## calc 函数

width：calc（100% - 80px）  
注意：括号里面可以使用+ - _ /来进行计算。注：+ - _ / 前后都要有一个空格才行。

## filter

filter：blur（5px）数值越大越模糊

## 背景渐变

```css
background: linear-gradient（方向，颜色1，颜色2，。。。） // 120deg
background: -webkit-linear-gradient（方向，颜色1，颜色2，。。。）
```

## transition 过度

结合 hover 伪类使用（不是写在 hover 中的）  
transition：all（要过渡的属性） 2s（过渡时间） linear（速度方式） 1s（开始延迟时间）

## transform 变形

transform: translate(x, y); // x 和 y 可以是 px 等距离，也可以是百分比  
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

display: none // 隐藏后不再占用空间
visibility: hidden // 隐藏后仍占用空间
opacity: 0 // 只是全透明，并没有隐藏
overflow: hidden（隐藏超出内容） scroll（显示滚动条，不论是否需要） auto（需要时才显示滚动条）

## 定位

1. 相对定位 relative
   相对于自己的原来位置偏移。实际开发中的主要作用是配合子元素的绝对定位。**不脱标**
2. 绝对定位 absolute
   子绝父相，以最近的、有定位的祖先为准偏移。**脱标**
3. 固定定位 fixed
   相对于浏览器可视区边界偏移，必须设置宽度。**脱标**
4. 粘性定位 sticky
   position: sticky; top: 10px;（滚动到距离顶端 10px 时候固定住）。**不脱标**

只有有定位的盒子，设置`z-index`属性才能生效

## 浮动

浮动的元素会**脱标**  
浮动元素顶部对齐  
任何元素都可以设置浮动，浮动后具有行内块元素特性  
浮动的盒子只会影响浮动盒子后面的标准流

## 清除浮动

为什么：  
因为父级盒子很多情况下，不方便设置高度，但盒子浮动后不占位置，会导致父级盒子高度为 0，从而影响下面的标准流盒子

是什么：  
清除浮动，其实是清除浮动元素造成的影响  
如果父元素有高度，就不需要清除浮动  
清除浮动希望达到的目的是：父元素会根据浮动的子元素来自动检测高度，从而不影响后面的标准流

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
`.clearfix:before`这里的一个冒号是 w3c 给的特殊规定，只有少数几个早期出现的伪元素可以用一个或两个冒号

## 外边距坍塌

互相嵌套的块级元素，子元素 margin-top 会作用在父元素上，导致父元素一起往下移动（塌陷）  
解决办法：  
给父元素设置 border-top 或者 padding-top（分隔父子元素的 margin-top）  
给父元素设置 overflow：hidden  
转换成行内块元素  
设置浮动
