# JSX

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

## 语法规则

1. JSX 的虚拟 DOM 只能有一个根标签，可以使用幽灵标签`<></>`
2. 标签中的类选择器不要使用 class，而是用 className，避免与 ES6 的 class 冲突
3. 标签中使用 JS 表达式，需要加上`{}`，可以动态绑定一些变量作为类名或标签内容等
4. 内联样式 style 属性不接收字符串，只接收对象，对象内是键值对，并且这个对象也在`{}`中
5. JSX 中的标签必须要闭合，可以用结束标签或结束斜杠
6. 如果写的是小写字母开头的标签，就会被作为 html 标签处理
   如果是大写字母开头的标签，会被作为组件处理
