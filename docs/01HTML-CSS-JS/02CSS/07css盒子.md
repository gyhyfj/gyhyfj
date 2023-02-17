# CSS 盒子

## fit-content

width 和 height 取值可以用 `fit-content` 表示其尺寸由内部元素撑开

可以给父元素设置宽度，解除默认宽度 100%的属性了

```css
/* 父元素 */
.father {
  display: flex;
  flex-flow: column nowrap;
  width: fit-content;
}
```
