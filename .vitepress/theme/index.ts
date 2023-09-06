// @ts-ignore
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
import { inject } from '@vercel/analytics'
// import { ofetch } from 'ofetch'

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

      const clientInfo = {
        timeStamp: Date.now(),
        userAgent: navigator.userAgent,
        screenWidth: screen.width,
        screenHeight: screen.height,
      }

      // ofetch('/api/landing', { method: 'POST', body: clientInfo }).then(res => {
      //   console.log(res)
      // })
      fetch('/api/landing', {
        method: 'POST',
        body: JSON.stringify(clientInfo),
      })
        .then(res => res.json())
        .then(console.log)
    }
  },
}
