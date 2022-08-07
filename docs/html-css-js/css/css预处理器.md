# CSS 预处理器

1. 结构清晰，便于拓展
2. 屏蔽浏览器私有语法的差异
3. 可以轻松实现多重继承 // 通过多层嵌套实现
4. 可以使用一些简单的逻辑

## LESS

[LESS 中文网](https://less.bootcss.com/#%E6%A6%82%E8%A7%88)

### 注释

less 支持单行注释和多行注释，但单行注释不会保存到 css 文件中

### 变量

```less
@width: 10px;
@height: @width+10px; // 定义变量

#header {
  width: @width;
  height: @height; // 使用变量
}
```

### 混合

```less
.bordered {
  border-top: 1px dotted red;
  border-bottom: 1px dotted red;
}

.post {
  color: red;
  .bordered(); // 以类似函数调用的形式使用
}
```

### 嵌套

就是后代选择器

&表示当前选择器，可配合伪类或伪元素使用

```less
.clearfix {
  display: block;
  zoom: 1;

  &:after {
    content: ' ';
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
```

&还可以用来**拼接字符串**构成后代选择器
比如

```less
.father {
  background-color: pink;
  &_son {
    // 实际上是`.father_son`这个`.father`下的后代选择器
    background-color: aqua;
  }
  &-son {
    // 实际上是`.father-son`这个`.father`下的后代选择器
    background-color: aqua;
  }
}
```

### 运算

四则运算符可以对任何变量、数字或颜色进行运算，

加减运算时会进行单位转换，以最左侧操作数的单位为准
如果遇到无效单位，会直接忽略单位

加、减、乘直接书写计算表达式
除法需要添加`()`或 `./`： ` (x/x)` `x ./ x`

为了与 CSS 保持兼容，calc() 并不对数学表达式进行计算，只会把变量赋值进去

### 转义

任何 `~"anything"` 或 `~'anything'` 形式的内容都将按原样输出
现版本基本不需要

### 导入

```less
@import 'library'; // library.less
@import 'typo.css';
```
