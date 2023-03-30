// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import Layout from './components/Layout.vue'
import './styles/diy.css'
import './styles/vars.css'

export default {
  ...DefaultTheme,
  Layout, // inject MyLayout
}
