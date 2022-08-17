# ref、reactive、to 全家桶

## ref

Ref 是接口，使用时可以指定泛型，也可以不指定而让类型推断自动推断
ref()返回一个对象，在 script 中要加`.value`才能操作它的值（无论包裹的是否为简单数据类型），在 mastache 中不需要加`.value`
使用 ref 时候推荐去绑定简单数据类型，因为如果绑定的是复杂数据类型，源码还是交给 reactive 去处理

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

此外，还有操作 DOM 元素的访问模板 ref。
模板 ref 需要通过一个显式指定的泛型参数和一个初始值 null 来创建

```vue
<script setup lang="ts">
import { ref } from 'vue'

// 声明一个 ref 来存放该元素的引用
// 必须和模板 ref 同名
const input = ref<HTMLInputElement | null>(null) // 拿到了DOM元素
</script>

<template>
  <input ref="input" />
</template>
```

定义多个对象时，只能分开写`const chart1=ref(); const chart2=ref();`，不能写链式等号
使用时候，也是要用`ref.value`来操作 DOM 对象（使用一些组件库时会遇到）

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

触发 ref 更新时候，会调用 triggerRefValue 这个函数。调用 triggerRef 时候，也是调用的 triggerRefValue 这个函数。所以如果某次事件同时触发了更新 ref 和更新 shallowRef，那么 triggerRefValue 这个函数执行时候会一并把 shallowRef 的视图一起更新。

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

返回一个对象的响应式代理。
源码是`function reactive<T extends object>(target: T): UnwrapNestedRefs<T>`，所以 reactive 不接受传入简单数据类型。

绑定复杂数据类型时，推荐使用 reactive 而不是 ref。在 script 中对数据进行修改，不需要像 ref 绑定的数据那样加上`.value`。

```vue
<script lang="ts" setup>
import { reactive } from 'vue'
let arr: number[] = reactive([]) // 使用reactive绑定后的数据类型仍是number[]
let newArr: number[] = [1, 2, 3]
let change = () => {
  // arr = newArr // 如果直接给数组赋值，则破坏了响应式，console出来是一个普通数组
  arr.push(...newArr) // 没有改变arr的指向，console出来是一个Proxy
  console.log(arr)
}
</script>

<template>
  <div>{{ arr }}</div>
  <button @click="change">change</button>
</template>
```

还有另一种解决复杂数据类型直接替换的方法，就是把这个复杂数据类型作为一个对象的一个属性，再把这个对象进行 reactive 包装：

```ts
<script lang="ts" setup>
import { reactive } from 'vue'

type O = {
  list: number[]
}
let arr = reactive<O>({
  list: [],
})

let newArr: number[] = [1, 2, 3]
let change = () => {
  arr.list = newArr // 直接对数组整体替换，仍维持响应式更新视图
}
</script>

<template>
  <div>{{ arr.list }}</div>
  <button @click="change">change</button>
</template>
```

## readonly

接受一个对象 (不论是响应式还是一般的) 或是一个 ref，返回一个原值的只读代理。
这仍是一个响应式对象，只是只读而已。
只读代理是深层的：对任何嵌套 property 的访问都将是只读的。它的 ref 解包行为与 reactive() 相同，但解包得到的值是只读的。

```vue
<script lang="ts" setup>
import { reactive, readonly } from 'vue'
let person = reactive({ name: 'zs' })
let copy = readonly(person)

const change = () => {
  // copy.name='ls' // err: 无法分配到 "name" ，因为它是只读属性。
  person.name = 'ls' // 对person的修改同样会更新copy
}
</script>

<template>
  <div>{{ person.name }} {{ copy.name }}</div>
  <button @click="change">change</button>
</template>
```

## shallowReactive

reactive() 的浅层作用形式
和 reactive() 不同，这里没有深层级的转换：一个浅层响应式对象里只有根级别的 property 是响应式的。property 的值会被原样存储和暴露，这也意味着值为 ref 的 property 不会被自动解包了。

注意：shallowReactive 如果是在 mounted 之前被调用，比如 setup 语法糖中直接调用，不具备浅层作用的特性。
注意：和 shallowRef 类似，如果某个事件既触发了浅层的响应式又触发了深层的非响应式，视图会一起被更新。

```vue
<script lang="ts" setup>
import { shallowReactive } from 'vue'
let person = shallowReactive({
  name: 'zs',
  money: {
    cash: 10,
  },
})
const change = () => {
  // person.name = 'ls' // 会更新视图
  // person.money = { cash: 80 } // 这样也会更新视图，因为persom.money和person.name都是最浅层
  person.money.cash = 0 // 不会更新视图
}
</script>

<template>
  <div>person: {{ person }}</div>
  <button @click="change">change</button>
</template>
```

::: warning

谨慎使用
浅层数据结构应该只用于组件中的根级状态。请避免将其嵌套在深层次的响应式对象中，因为它创建的树具有不一致的响应行为，这可能很难理解和调试

:::

## toRef

可用于为对象上的 property 创建 ref。这样创建的 ref 与其源 property 保持同步：改变源 property 将更新 ref，反之亦然。
`toRef<T extends object, K extends keyof T>`

```vue
<script lang="ts" setup>
import { reactive, toRef, ToRef } from 'vue'
interface Person {
  name: string
  age: number
}
let person: Person = reactive({
  name: 'zs',
  age: 18,
}) // 如果person在这里只是一个普通对象，没有被reactive包装，那么执行change方法其值仍会更新，只是视图不更新而已
let age: ToRef<number> = toRef(person, 'age') // key 是字符串
const change = () => {
  age.value = age.value - 1
}
</script>

<template>
  <div>person: {{ person }}</div>
  <button @click="change">change</button>
</template>
```

## toRefs

将一个响应式对象转换为一个普通对象，但这个普通对象的每个 property 都是指向源对象相应 property 的 ref。`toRefs<T extends object>`
实际上，每个单独的 ref 都是使用 toRef() 创建的。

```ts
const state = reactive({
  foo: 1,
  bar: 2,
})

const stateAsRefs = toRefs(state)
/*
stateAsRefs 的类型：{
  foo: Ref<number>,
  bar: Ref<number>
}
*/
```

所以，当从组合式函数中**返回响应式对象时**，toRefs 大有作为。使用它，自定义组件可以**解构/扩展**返回的对象而不会失去响应性

```ts
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2,
  })

  // ...基于状态的操作逻辑

  // 在返回时都转为 ref
  return toRefs(state)
}

// 可以解构而不会失去响应性
const { foo, bar } = useFeatureX()
```

## toRaw

根据一个 Vue 创建的代理返回其原始对象。`toRaw<T>(proxy: T): T`。
这是一个可以用于临时读取而不引起代理访问/跟踪开销，或是写入而不触发更改的特殊方法。
不建议保存对原始对象的持久引用。

```ts
const foo = {}
const reactiveFoo = reactive(foo)

console.log(toRaw(reactiveFoo) === foo) // true
```
