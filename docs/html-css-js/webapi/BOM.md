# BOM API

BOM 是浏览器对象模型，把浏览器当做一个**对象**
顶级元素是 window
BOM API 操作浏览器窗口交互

BOM 组成：
window - document location navigation screen history

## window 对象

1. 他是 JS 访问游览器窗口的一个接口
2. 他是一个全局对象，定义在全局作用域中的变量、函数都会变成 window 对象的属性和方法。在调用的时候可以省略 window，如`alert('hello')`

## load 窗口加载事件

当文档内容完全加载完成会触发该事件（包括图像、脚本文件、CSS 文件等），并调用处理函数

写法：
`window.onload = function() {...}`或`window.addEvebtListener('load',function() {...})`
window.onload 传统注册事件方式只能写一次，会以最后一个 window.onload 为准，
而如果使用 addEventListener 则没有限制。

类似的有一个 DOMContentLoaded 事件，仅当 DOM 加载完成，不包括样式表、图片等等

## resize 调整窗口大小事件

调整窗口大小加载事件，当触发时就调用的处理函数。

写法：
`window.onresize = function () {...}`或`window.addEventListener('resize',function() {...})`
可以结合 load 事件，以及 window.innerWidth（当前屏幕的宽度）使用

## 定时器

网页中，定时器中的 this 指向 window 对象

setTimeout()

setInterval()

## localStorage

localStorage 类似 sessionStorage，但其区别在于：存储在 localStorage 的数据可以长期保留；而当页面会话结束——也就是说，当页面被关闭时，存储在 sessionStorage 的数据会被清除。

```js
localStorage.setItem('myCat', 'Tom')
let cat = localStorage.getItem('myCat') // Tom
localStorage.removeItem('myCat')
localStorage.clear() // 移除所有
```

## sessionStorage

```js
sessionStorage.setItem('key', 'value')
let data = sessionStorage.getItem('key') // value
sessionStorage.removeItem('key')
sessionStorage.clear() // 移除所有
```

下面的示例会自动保存一个文本输入框的内容，如果浏览器因偶然因素被刷新了，文本输入框里面的内容会被恢复，因此写入的内容不会丢失。

```js
// 获取文本输入框
let field = document.getElementById('field')

// 检测是否存在 autosave 键值
// (这个会在页面偶然被刷新的情况下存在)
if (sessionStorage.getItem('autosave')) {
  // 恢复文本输入框的内容
  field.value = sessionStorage.getItem('autosave')
}

// 监听文本输入框的 change 事件
field.addEventListener('change', function () {
  // 保存结果到 sessionStorage 对象中
  sessionStorage.setItem('autosave', field.value)
})
```

::: warning
存储在 sessionStorage 或 localStorage 中的数据特定于页面的协议。
也就是说 http://example.com 与 https://example.com 的 sessionStorage 相互隔离。
:::

## location 对象

window 对象给我们提供了一个 location 属性用于获取或者设置窗体的 URL，并且可以解析 URL，因为这个属性返回的是一个对象，所以我们将这个属性也称为 location 对象。

属性有：
location.href 完整 url 的字符串
location.host 返回主机（包括端口号）
location.port 返回端口号
location.pathname 返回路径，如`./test.html`
location.search 返回参数，`?`后面的
location.hash 返回`#`后面的

方法有：
location.assign() 跟 href 一样，可以跳转页面（也称为重定向页面）。
location.replace() 替换当前页面，当前页面不会保存到会话历史中，这样，用户点击回退按钮时，将不会再跳转到该页面。
location.reload() 重新加载页面，相当于刷新按钮或者 F5。如果参数为 true 强制刷新 ctrl+F5。

## navigator 对象

navigator 对象包含有关浏览器的信息，他有很多属性，我们最常用的是 userAgent，该属性可以返回由客户机发送服务器的 user-agent 头部的值 （浏览器类型），可以实现向手机/PC 网站的跳转

## screen 对象

获取用户屏幕分辨率：`width: 1536` `height: 864`

## history 对象

该对象中包含用户（在浏览器窗口中）访问过的 URL。

方法：
history.forward()
history.back()
history.go(参数) // +1 是前进一个页面 -1 是后退一个页面
history.pushState(state, title[, url])
history.replaceState(state, title[, url])
