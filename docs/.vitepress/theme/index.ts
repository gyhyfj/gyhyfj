// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import MyVideoBoard from './components/MyVideoBoard.vue'
import MyLayout from './components/MyLayout.vue'
import { createPinia } from 'pinia'
const pinia = createPinia()
import './styles/diy.css'
import './styles/vars.css'

export default {
  ...DefaultTheme,
  Layout: MyLayout, // inject MyLayout
  enhanceApp({ app }) {
    app.use(pinia) // ues pinia
    app.component('MyVideoBoard', MyVideoBoard) // register global components
  },
}
