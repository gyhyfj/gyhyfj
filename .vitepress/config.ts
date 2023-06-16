import { defineConfig } from 'vitepress'
import fg from 'fast-glob'

const files = fg
  .sync(['docs/**/*.md', '!docs/*.md', '!docs/待处理', '!docs/public'], {
    stats: false,
  })
  .map(path => path.slice(5).split('/'))

const sidebar: any = {}

for (let path of files) {
  const rootKey = '/' + path[0] + '/'
  const currentRoot: any[] = (sidebar[rootKey] ??= [])
  let current = currentRoot
  let i = 1
  for (; i < path.length - 1; i++) {
    let target = current.find(item => item.text === path[i])
    if (!target) {
      target = {
        text: path[i],
        collapsed: true,
        items: [],
      }
      current.push(target)
    }
    current = target.items
  }
  current.push({
    text: path[i].slice(0, -3),
    link: '/' + path.join('/'),
  })
}

const nav = [
  {
    text: 'HTML/CSS/JS',
    items: [
      {
        text: 'HTML',
        link: 'HTML-CSS-JS/HTML/Canvas',
      },
      {
        text: 'CSS',
        link: 'HTML-CSS-JS/CSS/flex与grid',
      },
      {
        text: 'JavaScript',
        link: 'HTML-CSS-JS/JavaScript/Promise',
      },
    ],
  },
  {
    text: 'Utils',
    items: [
      {
        text: 'RxJS',
        link: 'Utils/RxJS/01认识RxJS',
      },
      {
        text: 'XState',
        link: 'Utils/XState/01有限状态机与XState',
      },
    ],
  },
  {
    text: 'SSR',
    items: [
      {
        text: 'SEO',
        link: 'SSR/SEO/SEO',
      },
      {
        text: 'NUXT3',
        link: 'SSR/NUXT3/SSR-in-Vue',
      },
    ],
  },
  {
    text: '工程化',
    items: [
      {
        text: 'Git与Monorepo',
        link: '工程化/Git与Monorepo/01git',
      },
      {
        text: '代码规范',
        link: '工程化/代码规范/代码规范',
      },
    ],
  },
  {
    text: '微前端',
    items: [
      {
        text: 'Overview',
        link: '微前端/Overview/overview',
      },
      {
        text: 'WuJie',
        link: '微前端/无界/工作原理',
      },
    ],
  },
  {
    text: '408',
    items: [
      {
        text: '计算机网络',
        link: '408/计算机网络/OSI七层模型',
      },
    ],
  },
]

export default defineConfig({
  title: 'gyhyfj',
  description: '有物混成 先天地生',
  titleTemplate: true,
  srcDir: 'docs',
  ignoreDeadLinks: true,
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/image/favicon.ico',
      },
    ],
    ['script', { src: '/js/analyze.js' }],
    ['meta', { name: 'referrer', content: 'no-referrer' }],
  ],
  markdown: {
    breaks: true, // Convert '\n' in paragraphs into <br>
  },
  appearance: true,
  lastUpdated: true,
  themeConfig: {
    // logo: '/logo.svg',
    siteTitle: '有物混成',
    lastUpdatedText: 'Updated Date',
    search: {
      provider: 'local',
    },
    nav,
    sidebar,
    socialLinks: [
      {
        icon: {
          svg: '<svg t="1676302008943" fill=currentColor class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2714" width="25" height="25"><path d="M306.005333 117.632L444.330667 256h135.296l138.368-138.325333a42.666667 42.666667 0 0 1 60.373333 60.373333L700.330667 256H789.333333A149.333333 149.333333 0 0 1 938.666667 405.333333v341.333334a149.333333 149.333333 0 0 1-149.333334 149.333333h-554.666666A149.333333 149.333333 0 0 1 85.333333 746.666667v-341.333334A149.333333 149.333333 0 0 1 234.666667 256h88.96L245.632 177.962667a42.666667 42.666667 0 0 1 60.373333-60.373334zM789.333333 341.333333h-554.666666a64 64 0 0 0-63.701334 57.856L170.666667 405.333333v341.333334a64 64 0 0 0 57.856 63.701333L234.666667 810.666667h554.666666a64 64 0 0 0 63.701334-57.856L853.333333 746.666667v-341.333334A64 64 0 0 0 789.333333 341.333333zM341.333333 469.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666666-42.666667z m341.333334 0a42.666667 42.666667 0 0 1 42.666666 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666667-42.666667z" p-id="2715"></path></svg>',
        },
        link: 'https://space.bilibili.com/18892759',
      },
      { icon: 'github', link: 'https://github.com/gyhyfj' },
    ],
  },
})
