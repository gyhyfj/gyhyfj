# Pinia

## Get Start

`npm i pinia -S`

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

1. 直接修改 `Test.curreent++`
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
onAction 侦听 action 被调用，接收一个工厂函数 Test.$onAction((args)=>{})`
