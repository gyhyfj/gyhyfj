// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import MyVideoBoard from './components/MyVideoBoard.vue'
import { createPinia } from 'pinia'
const pinia = createPinia()

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // ues pinina
    app.use(pinia)
    // register global components
    app.component('MyVideoBoard', MyVideoBoard)
  },
}
