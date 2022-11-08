# 自定义 vue 插件

插件是一种能为 Vue 添加全局功能的工具代码。

用 app.use 注册一个函数或对象。如果是对象需要用 install 方法

示例：

```vue
<!-- components/Loading/index.vue -->
<script lang="ts" setup>
import { ref } from 'vue'
let isShow = ref<boolean>(false)

/* 通过show hide 切换 */
const show = () => {
  isShow.value = true
}
const hide = () => {
  isShow.value = false
}

/* 向父组件暴露 */
defineExpose({
  isShow,
  show,
  hide,
})
</script>

<template>
  <div v-if="isShow">Loading...</div>
</template>
```

```ts
/* components/Loading/index.ts */
import { App, createVNode, VNode, render } from 'vue' // 引入app的类型
import Loading from './index.vue'

export default {
  install(app: App) {
    // 可以在这里使用app的provide、directive等
    // console.log(Loading)

    /* 转为虚拟DOM */
    const vnode: VNode = createVNode(Loading)
    // console.log(vnode)

    /* 转为真实DOM */
    render(vnode, document.body) // 第一个参数是vnode，第二个参数是挂载点
    // console.log(vnode.component?.exposed)

    /* 挂载到全局，已经在index.ts中已经拿到了app，所以可以在这里挂载 */
    app.config.globalProperties.$loading = {
      show: vnode.component?.exposed?.show,
      hide: vnode.component?.exposed?.hide,
    }

    /* 然后可以在main.ts中声明TS类型 */
  },
}
```

```ts
/* main.ts */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Loading from './components/Loading'

const app = createApp(App)

/* 注册声明（没注册似乎编辑器没提示） */
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $loading: {
      show: () => void
      hide: () => void
    }
  }
}

app.use(Loading) // 会自动调用Loading/index.ts导出的对象中的install函数，把app作为参数注入

app.mount('#app')
```

```vue
<!-- App.vue -->
<script lang="ts" setup>
import { ComponentInternalInstance, getCurrentInstance } from 'vue' // 在这里存着

const { appContext } = getCurrentInstance() as ComponentInternalInstance // 需要断言一下

const showLoading = () => {
  appContext.config.globalProperties.$loading.show() // 在这里找到show函数

  /* 设置一个定时消失效果 */
  setTimeout(() => {
    appContext.config.globalProperties.$loading.hide() // 在这里找到hide函数
  }, 2000)
}
</script>

<template>
  App.vue <br />
  <button @click="showLoading">切换</button>
</template>
```
