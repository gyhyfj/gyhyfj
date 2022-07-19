# vitepress

::: info

"less": "^4.1.3",
"vitepress": "^1.0.0-alpha.1"
"axios": "^0.27.2",
"pinia": "^2.0.14"

:::

## 自定义 MyVideoBoard 组件

:::details

<img src="https://cdn.yachen.cc/image/无标题-2022-07-14-1805.png" >

:::

## 实现不同目录下的文档有不同样式

::: details

### v1

在每个需要的 md 文档中引入`<style scoped>`标签

```vue
<style scoped>
.vp-doc p {
  text-indent: 2em;
}
</style>
```

### v2

在自定义的 css 文件中根据类名设置规则

```css
/* .vp-doc p {
  background-color: gray;
  text-indent: 2em;
} */
/* [class^='vp-doc _code'] p {
  text-indent: unset;
} */
.vp-doc:not([class^='vp-doc _code']) p {
  text-indent: 2em;
}
```

### v3

创建不同的 css 文件，监听路径变化切换引入

```js
export default {
  head: [
    [
      'link',
      { rel: 'stylesheet', href: '/css/code-article.css', id: 'switch' },
    ],
  ],
}
```

<br>

```vue
<script setup>
import { watchEffect } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useRouter } from 'vitepress'
const { Layout } = DefaultTheme
const { route } = useRouter()

watchEffect(() => {
  if (!/^\/code\//.test(route.path)) {
    let style = document.querySelector('#switch')
    style.href = '/css/article.css'
  } else {
    let style = document.querySelector('#switch')
    style.href = '/css/code-article.css'
  }
})
</script>
```

### v4

监听路径变化动态插入或删除样式表规则

```vue
<script setup>
import { watchEffect } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useRouter } from 'vitepress'
const { Layout } = DefaultTheme
const { route } = useRouter()

watchEffect(() => {
  if (!/^\/code\//.test(route.path)) {
    let current = document.styleSheets[0].cssRules[0].selectorText
    if (current !== '.vp-doc p') {
      document.styleSheets[0].insertRule('.vp-doc p{text-indent: 2em;}', 0)
    }
  } else {
    let current = document.styleSheets[0].cssRules[0].selectorText
    if (current === '.vp-doc p') {
      document.styleSheets[0].deleteRule(0)
    }
  }
})
</script>
```

:::

## 拓展默认主题

:::details

<<< @/.vitepress/theme/index.js

:::
