# Web Component

Custom element
Shadow DOM
template and slot

## Custom element

自定义元素用于封装组件，具有生命周期回调

先声明一个自定义元素的类，然后注册它
custom element 的名称不能是单个单词，且其中必须要有短横线

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
template中定义具名插槽，自定义元素中使用具名插槽`<div slot="插槽名">内容</div>`

```html
<template id="my-paragraph">
  <p><slot name="my-text">My default text</slot></p>
</template>

<my-paragraph>
  <span slot="my-text">Let's have some different text!</span>
</my-paragraph>
```
