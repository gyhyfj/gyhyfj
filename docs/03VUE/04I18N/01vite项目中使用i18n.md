# vite 项目中使用 i18n

vite 小型项目中简单使用 i18n 的方式是：

根据不同页面分别创建翻译文件，通过 glob 导入生成 message 对象，创建 i18n 实例，然后在 main.ts 中注册

根据文档介绍，还要根据项目需要配置构建标志，以实现编译时更好的 tree-shaking

::: code-group

```ts [i18n/index.ts]
import { createI18n } from 'vue-i18n'

const lanArr = ['zh', 'en'] as const

type Lan = typeof lanArr[number]
type LanItem = { [key in Lan]: string }
type LanFile = Record<string, LanItem>
type LanModule = Record<string, LanFile>

const modules: LanModule = import.meta.glob('@/i18n/dict/**/*.ts', {
  eager: true,
  import: 'default',
})

const messages = <{ [k in Lan]: Record<string, string> }>{}

for (const path in modules) {
  const prefix: string = [...path.split('/').slice(4, -1), ''].join('.')
  for (const key in modules[path]) {
    for (const lan in modules[path][key]) {
      ;(messages[lan] ??= {})[prefix + key] = modules[path][key][lan]
    }
  }
}

const i18n = createI18n({
  locale: 'en',
  legacy: false,
  messages,
})

export { i18n, type LanFile }
```

```ts [main.ts]
app.use(i18n)
```

```ts [vite.config.ts]
export default defineConfig({
  define: {
    __VUE_I18N_FULL_INSTALL__: false, // 如果只使用简单API
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
})
```

```ts [vite-env.d.ts]
type LanFile = import('@/i18n').LanFile
```

```ts [i18n/dict/home/index.ts]
export default <LanFile>{
  toggleLan: {
    zh: '切换语言',
    en: 'Toggle Lan',
  },
}
```

:::
