// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import MyLayout from './components/MyLayout.vue'
import './styles/diy.css'
import './styles/vars.css'

export default {
  ...DefaultTheme,
  Layout: MyLayout, // inject MyLayout
}
