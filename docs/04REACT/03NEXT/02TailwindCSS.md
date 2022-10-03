# Tailwind CSS

## 在 Next.js 安装

1. 安装 Tailwind
   `npm install -D tailwindcss postcss autoprefixer`

2. 创建 tailwind.config.js 和 postcss.config.js 文件
   `npx tailwindcss init -p`

3. 配置`tailwind.config.js`
   指定所有的 pages 和 components 文件，使得 Tailwind 可以在生产构建中对未使用的样式进行 tree-shaking

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. 在`./styles/globals.css`引入 Tailwind

```css
/* ./styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```
