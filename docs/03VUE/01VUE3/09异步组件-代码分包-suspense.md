# 异步组件、代码分包、suspense

npm run build

assets 下 index.xxx.js 放主逻辑 vendor.xxx.js 放第三方逻辑
如果 index.xxx.js 体积过大，加载会慢导致白屏

模拟后端数据：

```json
/* 模拟后端数据 */
// public/data.json
[{ "name": "111" }, { "name": "222" }, { "name": "333" }, { "name": "444" }]
```

模拟接口：

```ts
/* 模拟接口 */
// components/A/server.ts

type NameList = {
  name: string
}
export const axios = (url: string): Promise<NameList[]> => {
  return new Promise(resolve => {
    let xhr = new XMLHttpRequest()

    xhr.open('GET', url)

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        setTimeout(() => {
          resolve(JSON.parse(xhr.responseText))
        }, 2000)
      }
    }

    xhr.send(null)
  })
}
```

拥有异步操作的子组件：
setup 语法糖中的 await 可以直接使用，但如果是 setup 中自定义的函数使用 await，仍需要用 async
ES7 以后可以直接使用顶层 await，在整个模块最外层使用 await，整个模块会变成一个巨大的 async 函数

```vue
<!-- 异步组件 -->
<!-- components/A/A.vue -->
<script lang="ts" setup>
import { axios } from './server'

// 如果是在语法糖中直接使用await，不需要async
// 如果是自定义一个函数使用async，需要使用async
const list = await axios('./data.json') // 地址从public文件夹开始
console.log(list)
</script>

<template>
  <div v-for="item in list">
    {{ item.name }}
  </div>
</template>

<style lang="less" scoped></style>
```

调用异步组件的父组件：
需要用 `defineAsyncComponent` 和 `import` 函来导入异步子组件
`const A = defineAsyncComponent(() => import('./components/A/A.vue'))`
需要用 `Suspense` 和 `template #default` 和 `template #fallback` 来使用和渲染子组件

```vue
<template>
  <!-- <A /> --><!-- 不能这样使用异步组件 -->
  <Suspense>
    <template #default
      ><!-- 加载后 -->
      <A />
    </template>
    <template #fallback
      ><!-- 加载中 -->
      loading...
    </template>
  </Suspense>
</template>
```

```vue
<!-- src/App.vue -->
<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
// import A from './components/A/A.vue' // 异步组件不能这样引入

const A = defineAsyncComponent(() => import('./components/A/A.vue')) // import 函数，可以把这段代码打包时拆分出来
</script>

<template>
  <!-- <A /> --><!-- 不能这样使用异步组件 -->
  <Suspense>
    <template #default
      ><!-- 加载后 -->
      <A />
    </template>
    <template #fallback
      ><!-- 加载中，可以展示骨架屏 -->
      loading...
    </template>
  </Suspense>
</template>

<style lang="less" scoped></style>
```
