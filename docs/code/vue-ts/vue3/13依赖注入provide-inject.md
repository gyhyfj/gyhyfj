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

## 使用 Symbol 作注入名

如果你正在构建大型的应用程序，包含非常多的依赖供给，或者你正在编写提供给其他开发者使用的组件库，建议最好**使用 Symbol 而非字符串**来作为注入名以避免潜在的冲突

建议在一个单独的文件中**导出这些**注入名 Symbol

```js
// keys.js
export const myInjectionKey = Symbol()
```

```js
// 在供给方组件中
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, {
  /*
  要供给的数据
*/
})
```

```js
// 注入方组件
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'

const injected = inject(myInjectionKey)
```

## 为 provide/inject 标注类型

provide 和 inject 通常会在不同的组件中运行。要正确地为注入的值标记类型，Vue 提供了一个 InjectionKey 接口，它是一个继承自 Symbol 的泛型类型

```ts
import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

const key = Symbol() as InjectionKey<string>

provide(key, 'foo') // 若提供的是非字符串值会导致错误

const foo = inject(key) // foo 的类型：string | undefined
```

建议将注入 key 的类型放在一个单独的文件中，这样它就可以被多个组件导入。

当使用字符串注入 key 时，注入值的类型是 unknown，需要通过泛型参数显式声明：

```ts
const foo = inject<string>('foo') // 类型：string | undefined
```

注入的值仍然可以是 undefined，因为无法保证提供者一定会在运行时 provide 这个值。

当提供了一个默认值后，这个 undefined 类型就可以被移除

```ts
const foo = inject<string>('foo', 'bar') // 类型：string
```

如果你确定该依赖值将始终被提供，则还可以强制转换该值：

```ts
const foo = inject('foo') as string
```
