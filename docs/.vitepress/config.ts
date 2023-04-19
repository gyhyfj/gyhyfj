import fg from 'fast-glob'

const files = fg.sync([
  'docs/**/*.md',
  '!docs/public',
  '!docs/散记',
  '!docs/.vitepress',
])
const docsTree = {}

for (const path of files) {
  let [_, f1, f2, filename] = path.split('/')
  if (filename === undefined) {
    continue // 不够三级菜单
  }
  f1 = `/${f1}/`
  if (!(f1 in docsTree)) {
    docsTree[f1] = []
  }
  let f2Obj = docsTree[f1].find(item => item.text === f2)
  if (f2Obj === undefined) {
    f2Obj = {
      collapsed: true,
      text: f2,
      items: [],
    }
    docsTree[f1].push(f2Obj)
  }
  filename = filename.slice(0, -3)
  f2Obj.items.push({
    text: filename.slice(2),
    link: `${f1}${f2}/${filename}`,
  })
}

export default {
  base: '/',
  lang: 'en-US',
  title: 'gyhyfj',
  description: '有物混成 先天地生',
  titleTemplate: true,
  cleanUrls: true,
  markdown: {
    breaks: true, // Convert '\n' in paragraphs into <br>
  },
  appearance: true,
  lastUpdated: true,
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/image/favicon.ico',
      },
    ],
    ['script', { src: '/js/analyse.js' }],
    ['meta', { name: 'referrer', content: 'no-referrer' }],
  ],
  themeConfig: {
    search: {
      provider: 'local',
    },
    siteTitle: '有物混成，先天地生', // Replace the default site title in nav
    // logo: '/image/favicon.ico',
    nav: [
      // nav1
      {
        text: 'HTML/CSS/JS',
        items: [
          {
            text: '',
            items: [
              {
                text: 'HTML',
                link: '/01HTML-CSS-JS/01HTML/01html基础',
              },
              {
                text: 'CSS',
                link: '/01HTML-CSS-JS/02CSS/01css基础',
              },
              {
                text: 'JAVASCRIPT',
                link: '/01HTML-CSS-JS/03JAVASCRIPT/01数据类型',
              },
              {
                text: 'WEBAPI',
                link: '/01HTML-CSS-JS/04WEBAPI/01dom',
              },
            ],
          },
        ],
      },
      // nav2
      {
        text: 'TS',
        items: [
          {
            text: '',
            items: [
              {
                text: 'TYPESCRIPT',
                link: '/02TYPESCRIPT/01TS语法/01TS简介',
              },
            ],
          },
        ],
      },
      // nav3
      {
        text: 'VUE',
        items: [
          {
            text: '',
            items: [
              {
                text: 'VUE3',
                link: '/03VUE/01VUE3/01初始化项目',
              },

              {
                text: 'ROUTER4',
                link: '/03VUE/02ROUTER4/01开始使用',
              },
              {
                text: 'PINIA',
                link: '/03VUE/03PINIA/01pinia',
              },
              {
                text: 'I18N',
                link: '/03VUE/04I18N/01vite项目中使用i18n',
              },
              {
                text: 'UNIAPP',
                link: '/03VUE/06UNIAPP/01miniprogram',
              },
            ],
          },
        ],
      },
      // nav4
      {
        text: 'REACT',
        items: [
          {
            text: '',
            items: [
              {
                text: 'REACT18',
                link: '/04REACT/01REACT18/01JSX',
              },
              {
                text: '状态管理',
                link: '/04REACT/02状态管理/01redux',
              },
              {
                text: 'NEXT',
                link: '/04REACT/03NEXT/01初始化项目',
              },
            ],
          },
        ],
      },
      // nav5
      {
        text: 'NODE',
        items: [
          {
            text: '',

            items: [
              {
                text: 'NODEJS',
                link: '/05NODE/01NODEJS/01nodejs',
              },
              {
                text: '包管理工具',
                link: '/05NODE/02包管理工具/01npm',
              },
            ],
          },
        ],
      },
      // nav6
      {
        text: 'LINUX',
        items: [
          {
            text: '',
            items: [
              {
                text: 'LINUX',
                link: '/06LINUX/01LINUX/01简介',
              },
            ],
          },
        ],
      },
      // nav7
      {
        text: '工程化',
        items: [
          {
            text: '',
            items: [
              {
                text: 'GIT',
                link: '/07工程化/01GIT/01git',
              },
              {
                text: '代码规范',
                link: '/07工程化/02代码规范/01lint组合',
              },
              {
                text: '编程范式',
                link: '/07工程化/03编程范式/01函数式编程',
              },

              {
                text: '前端工具链',
                link: '/07工程化/04前端工具链/02vite',
              },
              {
                text: '构建组件库',
                link: '/07工程化/05构建组件库/01构建组件库',
              },
            ],
          },
        ],
      },
      // nav8
      // {
      //   text: '408',
      //   items: [
      //     {
      //       text: '',
      //       items: [
      //         {
      //           text: '数据结构与算法',
      //           link: '/08408/01ALGO/排序',
      //         },
      //         {
      //           text: '计算机网络',
      //           link: '/08408/02NET/practice/WebSockets',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // nav 散记
      // {
      //   text: '散记',
      //   items: [
      //     {
      //       text: '',
      //       items: [
      //         {
      //           text: '齐马蓝',
      //           link: '/散记/齐马蓝/齐马蓝',
      //         },
      //         {
      //           text: "I'll Be There",
      //           link: '/散记/I-will-be-there/读书/1965年重上井冈山',
      //         },
      //         {
      //           text: '天命',
      //           link: '/散记/天命/墨子/01墨家的由来',
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
    socialLinks: [
      // Show your social account links with icons
      // discord facebook github instagram linkedin slack twitter youtube
      {
        icon: {
          svg: '<svg t="1676302008943" fill=currentColor class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2714" width="25" height="25"><path d="M306.005333 117.632L444.330667 256h135.296l138.368-138.325333a42.666667 42.666667 0 0 1 60.373333 60.373333L700.330667 256H789.333333A149.333333 149.333333 0 0 1 938.666667 405.333333v341.333334a149.333333 149.333333 0 0 1-149.333334 149.333333h-554.666666A149.333333 149.333333 0 0 1 85.333333 746.666667v-341.333334A149.333333 149.333333 0 0 1 234.666667 256h88.96L245.632 177.962667a42.666667 42.666667 0 0 1 60.373333-60.373334zM789.333333 341.333333h-554.666666a64 64 0 0 0-63.701334 57.856L170.666667 405.333333v341.333334a64 64 0 0 0 57.856 63.701333L234.666667 810.666667h554.666666a64 64 0 0 0 63.701334-57.856L853.333333 746.666667v-341.333334A64 64 0 0 0 789.333333 341.333333zM341.333333 469.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666666-42.666667z m341.333334 0a42.666667 42.666667 0 0 1 42.666666 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666667-42.666667z" p-id="2715"></path></svg>',
        },
        link: 'https://space.bilibili.com/18892759',
      },
      { icon: 'github', link: 'https://github.com/gyhyfj' },
    ],
    sidebar: docsTree,
    lastUpdatedText: 'Updated Date',
  },
}
