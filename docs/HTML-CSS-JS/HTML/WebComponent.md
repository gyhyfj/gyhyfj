# Web Component

Custom elements
Shadow DOM
HTML templates

## Custom elements

共有两种 custom elements
一种是直接继承 HTMLElement，通过 html 标签的形式在页面上使用
一种是继承自基本 HTML 元素，通过在基本元素的基础上添加 is 属性指定自定义元素的名称，如`<p is="word-count">`

自定义元素用于封装组件，具有生命周期回调

先声明一个自定义元素的类，然后注册它
custom element 的名称不能是单个单词，且其中必须要有短横线`-`相连，以区分原生 HTML 标签

声明：

```ts
class WuJie extends HTMLElement {
  constructor() {
    super()
  }
  // 当 custom element 首次被插入文档 DOM 时
  connectedCallback() {}
  // 当 custom element 从文档 DOM 中删除时
  disconnectedCallback() {}
  // 当 custom element 增加、删除、修改自身属性时
  attributeChangedCallback(name: any, oldVal: any, newVal: any) {}
  // 当 custom element 被移动到新的文档时
  adoptedCallback() {}
}
```

注册：

```ts
customElements.define('wu-jie', WuJie) // 注册
```

### customElements 的方法

customElements.define(name, constructor, options)
注册之前定义好的类(即 constructor)，name 要用短横线连接以区别 HTML 原生标签

```ts
customElements.define('wu-jie', WuJie) // 注册
```

customElements.get(name)
获取到之前注册的自定义组件的类

```ts
const constructor = customElements.get('wu-jie')
```

customElements.whenDefined(name)
返回一个 Promise，当自定义组件被注册时候 resolve
当浏览器在解析 dom 时，对于自定义的组件，他不认识，就会被标识为未定义，当执行 js 代码后，定义完组件，它才会被解析， promise 才会被 full filled

```ts
customElements.whenDefined('custom-component').then(() => {
  document.querySelector('custom-component').innerHTML = '加载完成时'
})
```

customElements.upgrade(root)
解决可能出现的某些自定义元素未被正确注册导致浏览器无法识别的问题

## Shadow DOM

Web components 的一个重要属性是封装——可以将 HTML 结构、样式和行为隐藏起来，并与页面上的其他代码相隔离，保证不同的部分不会混在一起，可使代码更加干净、整洁
其中，Shadow DOM 接口是关键所在，它可以将一个隐藏的、独立的 DOM 附加到一个元素上

在过去的很长一段时间里，浏览器用它来封装一些元素的内部结构，比如 video 标签

创建：

```ts
let shadowRoot = elementRef.attachShadow({ mode: 'open' }) // 页面的JS能够获取shadow DOM  通过shadow host的shadowRoot属性 `const myShadowDom = myCustomElem.shadowRoot`
let shadowRoot = elementRef.attachShadow({ mode: 'closed' }) // 页面的JS不能获取shadow DOM
```

给 shadow root 添加 DOM 结构：

```ts
class WuJie extends HTMLElement {
  constructor() {
    super()
    // 创建 shadow root
    let shadowRoot = this.attachShadow({ mode: 'open' })
    // 选中页面的template
    let template = document.querySelector('#wu-jie') as HTMLTemplateElement
    // 将template的内容挂载到shadowRoot上
    shadowRoot.appendChild(template.content.cloneNode(true)) // 借助cloneNode方法
  }
}
```

```html
<!-- 在template中定义dom结构和样式 -->
<template id="wu-jie">
  <style>
    div {
      background: red;
    }
  </style>
  <div>shadow content</div>
</template>
```

## template and slot

template 元素及其内容不会在 DOM 中呈现，但仍可使用 JavaScript 去引用它
在 template 标签中可以写 style 标签以及 dom 标签

在 template 标签中也可以写 slot 标签，里面写默认内容
template 中定义具名插槽，自定义元素中使用具名插槽`<div slot="插槽名">内容</div>`

```html
<template id="my-paragraph">
  <p><slot name="my-text">My default text</slot></p>
</template>

<my-paragraph>
  <span slot="my-text">Let's have some different text!</span>
</my-paragraph>
```
