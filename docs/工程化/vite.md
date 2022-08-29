## Vite 与 WebPack

Vite:

- vite 会直接启动开发服务器，不需要进行打包操作，也就意味着不需要分析模块的依赖、不需要编译，因此启动速度非常快
- 利用现代浏览器支持 ES Module 的特性，当浏览器请求某个模块的时候，再根据需要对模块的内容进行编译，这种方式大大缩短了编译时间
- 在热模块 HMR 方面，当修改一个模块的时候，仅需让浏览器重新请求该模块即可，无须像 webpack 那样需要把该模块的相关依赖模块全部编译一次，效率更高

WebPack:

- webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。
- 这里的静态模块指的是开发阶段，可以被 webpack 直接引用的资源（可以直接被获取打包进 bundle.js 的资源）。当 webpack 处理应用程序时，它会在内部构建一个依赖图，此依赖图对应映射到项目所需的每个模块（不再局限 js 文件），并生成一个或多个 bundle。
- webpack 大而全，很多常用的功能做到开箱即用。有两大最核心的特点：一切皆模块和按需加载。

## Vite 配置别名

```ts
/* vite.config.ts */
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

```json
/* tsconfig.json */
/* 让IDE识别 */
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    },
    "jsx": "preserve"
  },
  "exclude": ["node_modules", "dist"]
}
```

## Vite 配置网络请求

配置 proxy

```ts
/* vite.config.ts */
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://10.10.10.69:10225',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
```

```ts
/* axios.ts */
let baseURL = '/api/v1'
```

可否这样？

```ts
let target =
  process.env.NODE_ENV === 'development'
    ? 'http://10.10.10.69:10225'
    : 'http://10.0.0.1:10025'
```
