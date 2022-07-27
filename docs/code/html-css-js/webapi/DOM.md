# DOM API

DOM 是文档对象模型，把文档当做一个**对象**
顶级元素是 document，
DOM API 主要是用来操作 DOM 元素
DOM 遵循 W3C 标准规范

DOM 的组成：

- document 一个页面就是一个 document
- element 一个标签就是一个 element
- node 页面中的所有内容都是 node（标签、属性、注释等等）

## 获取元素/节点

获取某元素：
document.querySelector('选择器')

获取符合选择器的全部元素：
document.querySelectorAll('选择器')

获取特殊元素：
获取 html 元素：var v=document.documentElement;
获取 body 元素：var v=document.body;

根据节点层级关系获取元素
子节点名.parentNode

父节点名.childNodes // 返回值里面包含了所有的子节点
父节点名.firstChild
父节点名.lastChild
父节点名.children[0]
父节点名.children[父节点名.children.length - 1]

节点名.nextSibling // 上一个兄弟节点
节点名.previousSibling // 下一个兄弟节点

## 获取对象后再获取对象的内容：

- div span ul li 等标签，有文字内容，用元素.innerText 或.innerHtml
- 表单 input 单选复选 textarea 用.value
- 特殊的 button 是通过 inner 来设置

## 操作元素

- 修改元素内容
  document.write('...')
  只能将文本内容追加到`</body>`前面的位置，需要加引号
  文本中包含的标签会被解析

  元素.innerText = '...'
  修改元素的内容，非标准，去除空格和换行

  元素.innerHtml = '...'
  修改元素的内容，且可以识别标签

- 修改元素属性
  选中元素的属性
  src href title alt 等，表单元素的 type value disable 等

- 修改元素样式属性
  对象.style.样式属性=值；
  如果属性有-连接符，需要转换为小驼峰命名法
  赋值时要带上 css 单位，用`''`包裹
  适合样式比较少，生成的是行内样式

- 修改元素类名属性
  类名样式操作 element.className
  元素.className='类 1 类 2'
  对 class 整体替换

  classList 操作
  元素.classList.add('类名')
  元素.classList.remove('类名')
  元素.classList.toggle('类名')

## 增删元素

创建：
document.createElement('标签名')

添加：
添加到父节点下的最后位置：父节点名.appendChild(添加的元素)
添加到父节点下指定子元素前面：父元素名.insertBefore(添加的元素，指定元素)

删除：
父节点名.removeChild（子节点名）

复制：
要克隆的节点名.cloneNode（true/false）
false 只复制标签，不复制内容
true 会全部复制，缺省默认为 false

## 事件类型

## 事件对象

一个对象，有事件触发时候的相关信息。
事件绑定的回调函数的第一个参数就是事件对象 `元素.addEventListener('click',function(e))`

事件对象的属性：
e.target 返回触发事件的对象（点击了哪个元素返回哪个对象或元素）
e.type 返回事件的类型 比如 click、mouseover
e.preventDefault() 该属性阻止默认事件（默认行为） 标准 比如不让链接跳转

```js
let a = document.querySelector('a')
a.addEventListener('click', function (e) {
  e.preventDefault() // 阻止点击链接后的默认跳转事件
})
```

e.stopPropagation() 阻止冒泡

```js
son.addEventListener('click', function (e) {
  e.stopPropagation() // 写在子元素上阻止冒泡，触发父元素的click事件
})
```

e.clientX e.clientY 返回鼠标相对于浏览器窗口可视区的坐标
e.pageX e.pageY 返回鼠标相对于文档页面的坐标
e.screenX e.screenY 返回鼠标相对于电脑屏幕的坐标
e.key 返回一个字符串，表示按下的键名

## 事件流

事件流指的是事件完整执行过程中的流动路径
当触发事件时，会经历两个阶段，分别是捕获阶段、冒泡阶段
捕获阶段是 从父到子 冒泡阶段是从子到父

### 事件捕获

从 DOM 的根元素开始去执行对应的事件 (从外到里)
`element.addEventListener(事件, 回调函数, 是否启用捕获机制)`
第三个参数传入 true 代表是捕获阶段触发（很少使用）
若传入 false 代表冒泡阶段触发，默认就是 false

### 事件冒泡

当一个元素的事件被触发时，同样的事件会在该元素所有祖元素中依次被触发，这个过程称为冒泡
简单理解：当一个元素触发事件后，会依次向上调用所有父级元素的同名事件

### 阻止事件流动

若想把事件就限制在当前元素内，就需要阻止事件流动
`e.stopPropagation()`
此方法可以阻断事件流动传播，不光在冒泡阶段有效，捕获阶段也有效

### 阻止默认行为

`e.preventDefault()`

## 重绘和回流
