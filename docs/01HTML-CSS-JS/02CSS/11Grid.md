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
  // grid-template-columns: 1fr 1fr minmax(300px, 2fr); // 函数中间参数之间要有列表
  // grid-template-columns: 300px auto 300px; // 等同于1fr
  // grid-template-columns: 300px 1fr 300px; // 等同于auto

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

    justify-self: start;
    align-self: start;
    place-self: start start;
    place-self: start; // 指定这个物体在自己的单元格的对齐方式
  }
}
```
