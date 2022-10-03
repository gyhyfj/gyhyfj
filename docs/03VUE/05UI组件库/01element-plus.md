# element-plus

## 安装

`npm i element-plus`

## 自动引入

安装两个插件
`npm i -D unplugin-vue-components unplugin-auto-import`

配置`vite.config.ts`

```ts {4-6,12-17}
/* vite.config.ts */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

但是此插件无法处理非组件模块，如 message，这种组件需要手动加载：
`import { ElMessage } from 'element-plus'`
`import 'element-plus/theme-chalk/el-message.css'`

## 全局注册 message 组件

不能用`app.component('ElMessage', ElMessage)`，因为 message 是非组件模块
如果不是全局引入 element-plus，就不会在 ctx 上挂载`$message`

解决方案一：
全局引入样式，再按需引入组件
在`main.ts`中`import 'element-plus/theme-chalk/el-message.css'`，
然后在每个组件中按需`import { ElMessage } from 'element-plus'`

解决方案二：
provide 和 inject
在`main.ts`中：
`import { ElMessage } from 'element-plus'`
`import 'element-plus/theme-chalk/el-message.css'`
`app.provide('ElMessage', ElMessage)`
然后在每个组件中按需：
`import { inject } from 'vue'`
`let ElMessage: any = inject('ElMessage')`

解决方案三：
挂载到 window 对象上
在`main.ts`或`App.vue`中
`import { ElMessage } from 'element-plus'`
`window.$message = ElMessage`
然后在每个组件中直接使用`window.$message`
但是需要解决 ts 报错
在`*.d.ts`中拓展 Window 接口

```ts
interface Window {
  $message: {
    success: (info: string) => void
    error: (info: string) => void
    info: (info: string) => void
  }
}
```
