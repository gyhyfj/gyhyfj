# vite.config.ts

在 vite 项目中，有时候我们需要全局引入 css 变量、scss 变量，或者引入全局 scss 样式文件，vite 提供了以下这种配置方式

```ts
//vite.config.js
css: {
  preprocessorOptions: {
    //define global scss variable
    scss: {
      additionalData: `@import '@/styles/variables.scss';`,
    },
  },
}
```

但是：
只有在 main.js 引入一个其他 scss 文件或者在.vue 文件中使用`<style lang="scss"><style>`，并且里面有内容，则 scss.additionalData 配置的全局 scss 文件才可以正确引入
并且在 scss.additionalData 引入的文件最好只写 scss 变量，别写 css 变量，因为 css 变量是运行时属性
