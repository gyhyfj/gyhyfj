// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import MyVideoBoard from './components/MyVideoBoard.vue'
import MyLayout from './components/MyLayout.vue'
import { createPinia } from 'pinia'
const pinia = createPinia()

export default {
  ...DefaultTheme,
  Layout: MyLayout, // inject MyLayout
  enhanceApp({ app }) {
    app.use(pinia) // ues pinina
    app.component('MyVideoBoard', MyVideoBoard) // register global components
  },
}
