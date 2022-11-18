# CSS 居中

## 文字居中

line-height 等于 height
text-align: center;

:::tip
vertical-align:middle; 写在行内元素、行内块元素、表格单元格元素和图片上，表示该行内块元素与其他同行的行内块元素的对齐方式
取值有 text-bottom middle baseline top 长度单位 百分比等，后两者表示元素的基线对齐到父元素的基线之上的给定长度或相对行高的百分比
:::

## 水平垂直居中

1. flex 布局
   给弹性盒子设置 `display: flex; justify-content: center; align-items: center;`
   也可以单独设置子元素在主轴维度的对齐 `align-self: center;`

2. 绝对定位 加 margin 负值
   需要知道子元素自身宽高，先把左上角对齐盒子中心点，再用负数 margin 把元素整体拉到居中位置

   ```css
   父元素 {
     position: relative;
   }
   子元素 {
     position: absolute;
     top: 50%;
     left: 50%; // 子元素右上角与盒子中心点对齐
     margin-top: -子元素高度/2;
     margin-left: -子元素宽度/2; // 这里不能用百分比代表子元素宽高，所以需要提前知道子元素宽高值
   }
   ```

3. 绝对定位 加 transform: translate()
   不需要知道子元素宽高，先把左上角对齐盒子中心点，再用 transform: translate() 把元素整体拉到居中位置

   :::danger
   这种绝对定位加 transform 的写法，如果遇到 transform 过渡或动画就会出严重问题
   :::

   ```css
   父元素 {
     position: relative;
   }
   子元素 {
     position: absolute;
     top: 50%;
     left: 50%; // 子元素右上角与盒子中心点对齐
     transform: translate(-50%, -50%); // 向左向上移动自身宽高的 50%
   }
   ```

4. 绝对定位四个方向设为 0 拉伸铺满父元素，再加 margin: auto

   :::danger
   绝对定位四个方向设为 0 拉伸铺满父元素，这种方式必须提前设置好居中的子元素自身的宽高，
   子元素宽高不会被内部内容自动撑开
   :::

   ```css
   父元素 {
     position: relative;
   }
   子元素 {
     position: absolute;
     top: 0;
     right: 0;
     bottom: 0;
     left: 0; // 元素充满盒子空间
     margin: auto; // 自动分配 margin 以充满空间
   }
   ```

5. table 布局

   ```scss
   .box {
     display: table;
     .sub-box {
       display: table-cell;
       vertical-align: middle;
       .item {
         display: block;
         margin: 0 auto;
       }
     }
   }
   ```
