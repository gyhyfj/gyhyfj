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
  // 不需要额外声明函数，直接将已有的选择器作为函数名
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

## SCSS

SASS 与 SCSS：
Sass 语法属于缩排语法，对于写惯 css 前端的 web 开发者来说很不直观，也不能将 css 代码加入到 Sass 里面
因此 Sass 语法进行了改良，Sass 3 就变成了 Scss (Sassy CSS)。SCSS 成为了 CSS 语法的扩展，用 `{}` 取代了原来的缩进

SCSS 与 LESS：
Less 在 JS 上运行，Sass 在 Ruby 上使用
Sass 使用 $，而 Less 使用 @ 编写变量
scss 引用的外部文件命名必须以\_开头，这样不会对这个引入文件进行编译

### 使用变量

用`$`开头声明变量，`$`是变量名的一部分
大括号外为全局变量，大括号内为局部变量

可以把 SCSS 看做一个模板引擎，编译的过程中用变量的值去替代变量所占据的位置
SCSS 中变量名使用中划线或下划线都是指向同一变量

### 嵌套规则

用嵌套简写后代选择器
也在嵌套中用`&`表示&表示当前选择器

子代选择器可以写在外层选择器右边（不推荐），也可以写在内层选择器左边

嵌套属性：
scss 识别一个属性以分号结尾时则判断为一个属性，以大括号结尾时则判断为一个嵌套属性，
规则是将外部的属性以及内部的属性通过中划线连接起来形成一个新的属性

```scss
/*css*/
li {
  border: 1px solid #aaa;
  border-left: 0;
  border-right: 0;
}

/*scss*/
li {
  border: 1px solid #aaa {
    left: 0;
    right: 0;
  }
}
```

### 导入 SCSS 文件

`@import App2.scss; `

全局导入：
如果要避免引入的变量覆盖本文件中的变量，可以在要被导入的 SCSS 文件中声明为默认值变量

```scss
$border-color: #ccc !default; // 声明默认值变量
// $border-color 只会在它进入的文件中没有此变量时候才生效
```

局部导入：
在大括号内写`@import App2.scss;`语句，就是把 App2.scss 中的所有内容直接写入到要引入的这个大括号内

### 使用原生@import

`@import 'App.css';`

### 混合

使用`@mixin`指令声明一个函数
混合器作用域内的属性都是 return 的值，除此之外，还可以为函数传参数
也可以像 JS 函数那样设置参数的默认值

```scss
@mixin get-border-radius($border-radius: 5px, $color) {
  -moz-border-radius: $border-radius;
  -webkit-border-radius: $border-radius;
  border-radius: $border-radius;
  color: $color;
}
```

使用`@include`指令调用一个函数

```scss
.container {
  border: 1px solid #aaa;
  @include get-border-radius; //不传参则为默认值5px
  @include get-border-radius(10px, blue); //传参
}
/*多个参数时，传参指定参数的名字，可以不用考虑传入的顺序*/
.container {
  border: 1px solid #aaa;
  @include get-border-radius; //不传参则为默认值5px
  @include get-border-radius($color: blue, $border-radius: 10px); //传参
}
```

### 继承

继承是面向对象语言的一大特点，可以大大降低代码量

使用%定义一个被继承的样式：
类似静态语言中的抽象类，他本身不起作用，只用于被其他人继承

使用`@extend`继承样式

```scss
%border-style {
  border: 1px solid #aaa;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

.container {
  @extend %border-style;
}
.container1 {
  //继承另一个选择器
  @extend .container;
}
```

### 算术运算符

+、-、\*、/、%
