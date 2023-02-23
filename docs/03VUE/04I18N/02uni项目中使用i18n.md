# uni 项目中使用 i18n

uni 使用 vite+cli 搭建的项目，使用 i18n 需要额外处理一些内容

1. uni 项目使用 bcp-47 规范
2. uni glob 不支持绝对路径
3. 协调同步 uni 内置语言切换
4. 解决编译成小程序不自动全局注入

## uni 项目使用 bcp-47 规范

BCP47 规范，分为三段，主语言-次语言-地区。例如 zh-Hans-CN，表示 中文-简体-中国大陆
除了主语言外，后两者均可省略。在不同平台，它们的省略规则也不相同
uni 中简体中文和英文分别为 zh-Hans 和 en
需要自己写逻辑来映射不同语言，比如：

```ts
/* [src/i18n/index.ts] */
const localeFormatter = (bcp47Str: string): Lan => {
  const bcp47Arr = bcp47Str.split('-')
  if (bcp47Arr.includes('zh')) {
    return 'zh-Hans'
  }
  if (bcp47Arr.includes('en')) {
    return 'en'
  }
  return 'en'
}

let initLocale = localeFormatter(uni.getLocale()) // 获取本地语言作为初始语言
```

## uni glob 不支持绝对路径

glob 和 globEager 只支持相对路径，因此不能用路径别名的绝对路径作为参数

## 协调同步 uni 内置语言切换

a.在 src/i18n 目录下，除了 i18n 的配置文件和界面的翻译文件外，还要配置给 uni 框架使用的语言 json 文件，如 en.json 和 zh-Hans.json，在里面配置 tab 和 title 的翻译，在 pages.json 中按照文档示例使用

b.在创建 i18n 实例之前，初始化 uni 框架内置语言和 i18n 保持一致，但要使用异步

```ts
/* [src/i18n/index.ts] */
Promise.resolve(initLocale).then(uni.setLocale) // 初始化tab、nav及uni框架内置语言
```

c.直接封装并导出一个切换语言的函数

```ts
/* [src/i18n/index.ts] */
export const setLocale = (localeStr: TLanStr) => {
  i18n.global.locale.value = localeStr // 改变i18n翻译
  uni.setLocale(localeStr) // 改变tab、nav及uni框架内置语言
}
```

## 解决编译成小程序不自动全局注入

需要在创建 i18n 实例时传入的参数中显式指定 globalInjection 为 true

```ts
/* [src/i18n/index.ts] */
const i18n = createI18n({
  locale: initLocale, // 初始化i18n语言
  legacy: false,
  messages,
  globalInjection: true, // 解决编译成小程序不自动全局注入
})
```
