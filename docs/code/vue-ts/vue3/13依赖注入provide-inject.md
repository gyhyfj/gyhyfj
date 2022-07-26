# 依赖注入

## provide、inject

祖先、子孙组件跨层数据传递

祖先组件：
用 `provide(key 字符串, 值)` 传响应式的值

```vue
<!-- App.vue -->
<script lang="ts" setup>
import A from './components/A/A.vue'
import { provide, ref } from 'vue'
let flag = ref(true)
provide('flag', flag) // provide 变量，key 为 flag
</script>

<template>
  <A />
  <button @click="flag = !flag">父组件按钮</button>
</template>
```

子孙组件：
用 `inject(key 字符串, 默认值)` 接受响应式的值

```vue
<!-- A.vue -->
<script lang="ts" setup>
import { inject } from 'vue'

let data = inject('flag', ref(false))
</script>

<template>
  {{ data }}
  <button @click="data = !data">子组件按钮</button>
</template>
```

## 应用层 Provide

```ts
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
```

应用级的供给在应用的所有组件中都可以注入。这在你编写插件时会特别有用，因为插件一般都不会使用组件形式来供给值。
