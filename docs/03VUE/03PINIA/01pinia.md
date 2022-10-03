# Pinia

pinia 没有 mutations，只有 state、getters、actions
pinia 分模块不需要 modules
pinia 体积更小
pinia 可以直接修改 state 数据

> 总结：
> `const { current, name } = storeToRefs(Test)` 响应式解构
> `instance.$patch()` 接受一个对象或回调
> `instance.$state={}` 整体替换
> `instance.$reset()` 重置
> `instance.$subscribe((args,state)=>{})` 监听 state 变化
> `instance.$onAction((args)=>{})` 监听 action 调用

## Get Start

`npm i pinia -S`
安装 pinia -> 在 main.ts 中生成并注册 pinia 实例 -> 创建 store 文件夹，包括 store-name.ts 和 index.ts

```ts {4,6,9}
/* main.ts */
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

const store = createPinia()
let app = createApp(App)

app.use(store)
app.mount('#app')
```

```ts
/* store/store-name.ts */
export const enum Names {
  TEST = 'TEST',
}
```

选项式 store：

```ts
/* store/index.ts */
import { defineStore } from 'pinia'
import { Names } from './store-name'

export const useTestStore = defineStore(Names.TEST, {
  state: () => {
    return {
      current: 1,
      name: 'test',
    }
  },
  // 修饰一些值
  getters: {},
  // 做一些同步或异步，提交state
  actions: {},
})
```

函数式 store：

```ts
/* store/index.ts */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Names } from './store-name'

export const useTestStore = defineStore(Names.TEST, () => {
  const count = ref(0)
  const add = () => {
    cout.value++
  }
  return { count, add }
})
```

```vue
<!-- App.vue -->
<script setup lang="ts">
import { useTestStore } from './store'

const Test = useTestStore()

// 然后通过Test来调用
</script>
```

## state

修改 state 的方式：

1. 直接修改 `Test.current++`
2. 批量修改 `Test.$patch({current:2, name:'test2'})` // 修改一个或多个属性
3. 批量修改，但使用工厂函数 `Test.$patch(state => {})`

   ```ts
   const change = () => {
     Test.$patch(state => {
       // 各种逻辑
       state.current = 2
     })
   }
   ```

4. 整体赋值，必须每个成员都不少地整体替换 `Test.$state={}`

   ```ts
   const change = () => {
     Test.$state = {
       current: 4,
       name: 'test4',
     }
   }
   ```

5. 借助 action 修改（操作 `this.state`）
6. reset 恢复默认 `Test.$reset()`

## 解构 store

```vue {4,8}
<!-- App.vue -->
<script setup lang="ts">
import { useTestStore } from './store'
import { storeToRefs } from 'pinia'

const Test = useTestStore()

const { current, name } = storeToRefs(Test) // 具有响应式

// 然后通过Test来调用
</script>
```

## 实例 API

reset 恢复默认 `Test.$reset()`
subscribe 侦听 state 变化，接收一个工厂函数 `Test.$subscribe((args,state)=>{})`
onAction 侦听 action 被调用，接收一个工厂函数 `Test.$onAction((args)=>{})`
