# pinia 持久化插件

## 手写插件

```ts
import { createApp, toRaw } from 'vue'
import App from './App.vue'
import { createPinia, PiniaPluginContext } from 'pinia'

type Options = {
  key?: string
}
const __piniaKey__: string = 'xiaoman'

const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getStorage = (key: string) => {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) as string)
    : {}
}

// 函数柯里化
const piniaPlugin = (options: Options) => {
  // console.log(context)
  return (context: PiniaPluginContext) => {
    const { store } = context
    const data = getStorage(`${options?.key ?? __piniaKey__}-${store.$id}`)
    // $id 就是每个store的辨识符
    console.log(data)
    store.$subscribe(() => {
      setStorage(
        `${options?.key ?? __piniaKey__}-${store.$id}`,
        toRaw(store.$state) // store.$state 是proxy对象不能直接用
      )
    })
    return {
      ...data, // TODO 用取出的值赋值 怎么做到的？？
    }
  }
}

const store = createPinia()

store.use(
  piniaPlugin({
    key: 'pinia',
  })
) // 在内部会调用
const app = createApp(App)
app.use(store)
app.mount('#app')
```

## 使用 npm 插件

安装`npm i pinia-plugin-persist -S`

创建 store/index.js ，在 main.js 中引入并挂载

```js
/* main.js */
import store from 'store/index.js'
app.use(store)
```

```js
/* store/index.js */
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia
store.use(piniaPluginPersist)
export default store
```

在每个 store 文件中添加 persist 节点，添加配置
