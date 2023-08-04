// @ts-ignore
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
import { inject } from '@vercel/analytics'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    if (!(import.meta as any).env.SSR) {
      inject()
      fetch(
        `/api/landing?date=${Date.now()}&width=${screen.width}&height=${
          screen.height
        }`
      )
    }
  },
}
