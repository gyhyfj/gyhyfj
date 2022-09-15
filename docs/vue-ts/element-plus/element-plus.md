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
