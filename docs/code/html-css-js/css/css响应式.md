# CSS 响应式

响应式设计，是指一份代码兼容多种不同屏幕尺寸的终端
基本原理是通过媒体查询来检测不同设备屏幕尺寸来做处理

## @media 媒体查询

```css
/* 语法 */
@media not|only mediatype and (mediafeature and|or|not mediafeature) {
  CSS-Code;
}

/* 示例 */
@media screen and (max-width: 300px) {
    body {
        background-color:lightblue;
    }
}
```

## 常见的 css 布局单位

### px

一个像素表示终端屏幕能显示的最小区域，分为逻辑像素和物理像素

### %

百分比，是相对于父元素的比例
如果是字体，且祖先元素都没设置字体尺寸，则相对于浏览器默认字体尺寸（16px）的比例

### em 和 rem

em 是相对长度单位，相对于当前对象的文本的字体尺寸，如果当前对象的字体尺寸未被设置，就一层层往上找。如果都找不到，就相对于浏览器的默认字体尺寸（16px）

rem 是相对长度，相对于 html 的根元素
如果设置`html{ font-size: 62.5% 或 10px }`，则 1rem=10px

可以通过媒体查询设置不同视口宽度下，html 元素的 font-size 属性值，以实现使用 rem 单位的字体的自适应

目前 rem 布局方案中，通常将网页等分成 10 份， HTML 标签的字号为视口宽度的 1/10

### vw 和 vh

1vw = 1/100 视口宽度
1vh = 1/100 视口高度

不允许 vw vh 混用

此外还有两个单位：
vmin：vw 和 vh 中的较小值
vmax：vw 和 vh 中的较大值

## 根据设计稿进行移动端适配

1. 根据不同的像素密度，使用 css 媒体查询，加载不同精度的图片 // TODO
2. 根据设计稿转把尺寸转换为相对单位，以适应不同屏幕大小
