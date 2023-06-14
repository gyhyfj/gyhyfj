# flex 与 grid

grid 相当于二维的 flex

## flex 布局

父元素 子元素都是 flex 布局时候，注意一些属性的继承，比如 flex-direction， 子元素会继承父元素的属性

flex 布局不可以使用 justify-self 属性

flex-shrink
定义了在容器空间不足的情况下，成员将如何缩小
取值是一个非负数，表示相对收缩比例
flex-grow
定义了在容器空间有剩余的情况下，成员将如何扩大。默认是 0 表示不会扩大
取值是一个非负数，表示相对扩大比例

## grid 布局

```scss
/* 父元素 */
.wrapper {
  /* 声明一个容器 */
  display: grid;
  margin: 60px;

  /*  声明列的宽度  */
  grid-template-columns: 200px 200px 200px;
  // grid-template-columns: repeat(3, 200px);
  // grid-template-columns: repeat(auto-fill, 200px);
  // grid-template-columns: 200px 1fr 2fr;
  // grid-template-columns: 1fr 1fr 2fr;
  // grid-template-columns: 1fr 1fr minmax(300px, 2fr); // 宽度在最小值到最大值之间自适应
  // grid-template-columns: 300px auto 300px; // 宽度自动填满，等同于1fr
  // grid-template-columns: 300px 1fr 300px; // 宽度自动填满，等同于auto

  /*  声明行的高度  */
  grid-template-rows: 100px 100px;

  /*  声明行间距和列间距  */
  // row-gap: 20px;
  // column-gap: 20px;
  // gap: 20px 20px;
  gap: 20px; // 等同于上面

  // grid-template-areas:
  //   '. header header'
  //   'sidebar content content'; // 这里对容器内的区域进行划分，点表示空单元格，

  //  .sidebar {
  //   grid-area: sidebar;
  // } // 指定某个元素被放置在之前声明的哪个单元格内

  // grid-auto-flow: row;
  grid-auto-flow: row dense; // dense表示尽可能填满表格

  // justify-items: center; // 指定每个单元格内的对齐方式 指定后不但水平居中了 而且不再处于默认拉伸的状态
  // align-items: center;
  // place-items: center center;
  // place-items: center; // 简写justify-items和align-items

  // justify-content: center; // 控制整个网格在盒子中的对齐 （不一定盒子的全部空间都被划分成了网格，可能只划分了一部分）
  // align-content: center;
  // place-content: center center;
  // place-content: center;

  grid-template-columns: 200px 200px;
  grid-template-rows: 100px 100px;
  grid-auto-rows: 100px; // 格子不够时候遵循这个创建隐式网格 // TODO:
  // grid-auto-columns: 10px; // grid-auto-rows grid-auto-columns 只能同时生效一个， 取决于grid-auto-flow

  /* 直系子元素 */
  .items {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-column: 1; // 是grid-column-start和grid-column-end的简写，中间用斜杠分开
    grid-column: 1 / span 2; // 相当于grid-column-start: 1;  grid-column-end: span 2;
    grid-row-start: 1;
    grid-row-end: 2; // 子项的四个边框所在的网格线编号，可以从1正向编号，也可以从-1反向编号

    grid-area: sidebar; // 指定这个物体放在之前声明的哪个单元格内
    grid-area: 1(row-start) / 1(column-start) / 3(row-end) / 4(column-end)

    justify-self: start;
    align-self: start;
    place-self: start start;
    place-self: start; // 指定这个物体在自己的单元格的对齐方式
  }
}
```

瀑布流的写法
父元素

```css
.gallery {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, 250px);
  column-gap: 15px;
  grid-auto-rows: 1px;
  grid-auto-flow: row;
}
```

子元素

```vue
<Item
  v-for="item list"
  :key="item.id"
  :style="`grid-row:auto /span ${~~(
          (item.height! / item.width! / 1) * 250 +
          15
        )}`"
  class="w-full"
/>
```

如果取 vw 会出现垂直方向失去高度的现象以及计算性能问题
