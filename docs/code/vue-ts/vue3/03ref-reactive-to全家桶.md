# ref、reactive、to 全家桶

## ref

Ref 是接口，使用时可以指定泛型，也可以不指定而让类型推断自动推断
ref()返回一个对象，在 script 中要加`.value`才能操作它的值，在 mastache 中不需要加`.value`

```vue
<script lang="ts" setup>
import { ref, Ref } from 'vue'
let msg: Ref<string> = ref('hello')
let changMsg: () => void = (): void => {
  msg.value = 'hi'
  console.log(msg.value)
}
</script>

<template>
  <div>
    {{ msg }}
  </div>
  <button @click="changMsg">change</button>
</template>
```

## isRef

检查某个值是否为 ref。
返回值是一个类型谓词，这意味着 isRef 可以被用作类型守卫。

```vue
<script lang="ts" setup>
import { ref, Ref, isRef } from 'vue'
let msg: Ref<string> = ref('hello')
let time: string = '1996'

console.log(isRef(msg)) // true
console.log(isRef(time)) //false
</script>
```

## shallowRef

浅层 ref，可以节省性能
浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。只有对`.value`的访问是响应式的。
shallowRef 常常用于对大型数据结构的性能优化或是与外部的状态管理系统集成。

```vue
<script lang="ts" setup>
import { shallowRef, ShallowRef } from 'vue'
let msg: ShallowRef = shallowRef({
  txt: 'hello',
})
let changMsg: () => void = (): void => {
  // msg.value.txt = 'hi' // 非响应式
  msg.value = { txt: 'hi' } // 响应式
  console.log(msg.value.txt)
}
</script>

<template>
  <div>
    {{ msg.txt }}
  </div>
  <button @click="changMsg">change</button>
</template>
```

## triggerRef

强制触发依赖于一个浅层 ref 的副作用，这通常在对浅引用的内部值进行深度变更后使用

```vue
<script lang="ts" setup>
import { shallowRef, ShallowRef, triggerRef } from 'vue'
let msg: ShallowRef = shallowRef({
  txt: 'hello',
})
let changMsg: () => void = (): void => {
  msg.value.txt = 'hi' // 非响应式
  triggerRef(msg) // 实现深层响应
  console.log(msg.value.txt)
}
</script>

<template>
  <div>
    {{ msg.txt }}
  </div>
  <button @click="changMsg">change</button>
</template>
```

## customRef

创建一个自定义的 ref，显式声明对其依赖追踪和更新触发的控制方式。
customRef() 预期接收一个工厂函数作为参数，这个工厂函数接受 track 和 trigger 两个函数作为参数，并返回一个带有 get 和 set 方法的对象。

一般来说，track() 应该在 get() 方法中调用，而 trigger() 应该在 set() 中调用。然而事实上，你对何时调用、是否应该调用他们有完全的控制权。

```ts
<script lang="ts" setup>
import { customRef } from 'vue'
function MyRef<T>(value: T) {
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newVal: T) {
        console.log('set')
        value = newVal
        trigger()
      },
    }
  })
}
let msg = MyRef<string>('hello')
let changMsg: () => void = (): void => {
  msg.value = 'hi' // 响应式
  console.log(msg.value)
}
</script>

<template>
  <div>
    {{ msg }}
  </div>
  <button @click="changMsg">change</button>
</template>

```

示例：创建一个防抖 ref，即只在最近一次 set 调用后的一段固定间隔后再调用：

```ts
import { customRef } from 'vue'

export function useDebouncedRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}
```

在组件中使用：

```vue
<script setup>
import { useDebouncedRef } from './debouncedRef'
const text = useDebouncedRef('hello')
</script>

<template>
  <input v-model="text" />
</template>
```

## reactive

## readonly

## shallowReactive

## toRef toRefs toRaw
