# CSS 盒子

## fit-content

width 和 height 取值可以用 `fit-content` 表示其尺寸由内部元素撑开

```css
/* 父元素 这样就能得到一个很长的长条 */
.father {
  display: flex;
  flex-flow: column nowrap;
  width: fit-content;
}
/* 然后再在外面再套一层父元素，有一个比较小的宽度作为视口
   内部的元素可以滚动 */
.grandfather {
  width: 375px;
  overflow-y: auto;
}
```
