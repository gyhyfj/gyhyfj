# JSX

JSX 是 JavaScript XML（HTML）的缩写，表示在 JS 代码中书写 HTML 结构

## JSX 与 JS 的对比

JSX 实际上是纯 JS 的语法糖，方便创建虚拟 DOM
JSX 最终还是用纯 JS 的方式创建虚拟 DOM

> react.js // React 核心库
> react-dom.js // 操作 DOM 的 React 拓展库
> babel.js // 解析 JSX 为 JS 代码的库

```html
<!-- JSX -->
<body>
  <!-- DOM容器 -->
  <div id="test"></div>

  <!-- 引入JS库 -->
  <script src="./js/react.js"></script>
  <script src="./js/react-dom.js"></script>
  <script src="./js/babel.js"></script>

  <!-- 书写JSX -->
  <script type="text/babel">
    /* JSX创建虚拟DOM对象 */
    /* JSX创建虚拟DOM可以在最外面加一层括号，就自动格式化为html样式 */
    const VDOM = <h2>Hello React</h2>
    /* render函数，接收两个参数 (虚拟DOM，DOM容器) 把虚拟DOM转为真实DOM*/
    ReactDOM.render(VDOM, document.querySelector('#test'))
  </script>
</body>
```

```html
<!-- 纯JS -->
<body>
  <!-- DOM容器 -->
  <div id="test"></div>

  <!-- 引入JS库 -->
  <script src="./js/react.js"></script>
  <script src="./js/react-dom.js"></script>

  <!-- 书写JS -->
  <script type="text/javascript">
    /* 纯JS创建虚拟DOM对象 */
    /* React.createElement 接收三个参数 (标签名，标签属性，标签内容) */
    /* 如果有嵌套的标签，也要用React.createElement创建 */
    const VDOM = React.createElement('h2', '{id:'title'}','Hello React')
    /* render函数，接收两个参数 (虚拟DOM，DOM容器) 把虚拟DOM转为真实DOM */
    ReactDOM.render(VDOM, document.querySelector('#test'))
  </script>
</body>
```

## JSX 语法

1.书写 DOM 结构：
`JSX` 的虚拟 `DOM` 必须要有一个根标签，可以用幽灵节点`<></>`
所有标签必须形成闭合，成对闭合或者自闭合都可以
支持换行，多行内容用`()`包裹
小写字母开头的标签，会被作为 `html` 标签处理
大写字母开头的标签，会被作为组件处理

2.使用 JS 表达式
标签中使用`JS 表达式`，需要加上`{}`，可以获取变量值或函数返回值
列表渲染使用数组 `map` 方法，作为一个`JS表达式`，写在`{}`中，要为遍历项添加`key`属性
形如：`{songs.map(item => <li key={item.id}>{item.name}</li>)}`
条件渲染，仍是在`{}`中写`JS表达式`，可以用三元运算符或`&&`运算符

3.样式处理
行内样式：
内联样式 `style` 属性不接收字符串，只接收对象，并且这个对象也在`{}`中，可以直接写在里面，也可以定义为一个变量写在外面
类名样式：
类选择器不要使用 `class`，而是用 `className`，避免与 `ES6` 的 `class` 冲突
可以用三元运算符动态控制类名
