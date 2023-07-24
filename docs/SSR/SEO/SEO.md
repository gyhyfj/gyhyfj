# SEO

## What's SEO

SEO stands for Search Engine Optimization
SEO 的目标是提高网站在搜索引擎搜索结果中的排名,

SEO 的意义是

1. 排名越高带来的自然流量(organic traffic)越高, 潜在用户越多
2. 提高品牌的可信度
3. 和 SEM 相比, 后者必须付费, 且会带有一个 Sponsored 的 label, 且基本都会被广告插件拦截
4. 节省广告预算

SEO 在国外意义更大一些
因为国内的互联网环境 流量大部分都被私域分割完了 流量都在抖音 未被分割的流量, 又非常依赖竞价排名

## How to improve SEO

1. 内部优化
   URL 结构, 网页性能, SEO 相关标签, 语义化标签, 图片 alt 属性, 内部链接, 关键词策略, 高质量内容
2. 外部优化
   回链, 社交媒体分享

## Search Systems

搜索系统通常有四项职责:

1. 爬虫 – 浏览 Web 并解析所有网站中的内容
2. 索引 – 存储所有在爬虫阶段收集的数据
3. 渲染 - 执行页面上所有 JS
4. 排名 - 根据用户的 query 来生成相关结果

## Web Crawlers

网页爬虫是模拟用户 通过网站上的链接来导航和索引页面的机器人,
使用自定义 UA 来标明自己,
谷歌使用最多的是 Googlebot Desktop 和 Googlebot Smartphone

网页爬虫的工作流程是

1. 寻找 URL, 包括页面间的链接, XML sitemap, [Google Search Console ](https://search.google.com/search-console)
2. 添加到爬虫队列, 等待机器人处理, 然后进入渲染队列
3. 发送 HTTP 请求, 来获取响应头, 并根据返回的不同状态码执行不同操作
   - 200 爬页面并解析 HTML
   - 30x 遵循重定向
   - 40x 认作错误, 不加载 HTML
   - 50x 爬虫会稍后再返回来查看状态码是否仍是 50x
4. 渲染队列 这里的工作耗费非常大所以整个互联网上能得到渲染的 URL 是非常有限的, 并且通常只处理同步 JS 代码生成的内容
5. 索引页面 爬虫会把有资格的页面索引起来并将会在搜索引擎的搜索结果中显示

## SEO 相关的状态码

200 请求完成
只有 200 才会被索引

301/308 永久重定向
好处是让已被收录的旧站点可以讲收录转移给新站点
区别是后者不允许将请求方法从 post 改为 get
NextJs 默认使用 308 作为永久重定向的状态码而不是 301
Azure-SWA 默认使用 301

302/307 临时重定向
区别是后者不允许将请求方法从 post 改为 get

404 找不到资源
对爬虫没有特殊意义

410 明确废弃
告诉爬虫永远不要再来爬这个 URL 的内容

500 内部服务错误

503 服务目前不可用

## URL 结构

最好使用具有语义的 URL, 这意味着它们使用单词而不是 ID 或随机数, 否则搜索引擎可能会降低它们在结果中的排名

## robots.txt 和 XML Sitemaps

robots.txt 告诉爬虫哪些页面可爬 哪些不可爬
在 NextJs 和 NuxtJs 中都可以手动创建并被静态文件服务功能服务

XML Sitemaps 告诉爬虫网站有哪些 URL 以及多久更新一次

需要站点地图的场景:

1. 网站非常大, 为了避免爬虫护士一些新的或最近更新的页面时
2. 网站有大量的内容页, 但它们都是孤立的, 互相之间没有很好地链接
3. 网站是新建的, 指向自己网站的外链很少
4. 网站有大量的富文本内容(图片, 视频)

这两个文件虽然不是必需的, 但可以促进爬虫爬取内容和索引, 因此您的内容将更快地被提取并被相应地排名

## meta robots 标签

meta robots 标签是爬虫必须始终遵守的指令标签
如果写了`<meta name="robots" content="noindex, nofollow" />`, 会命令搜索引擎不要索引当前页面, 并且不要去爬这个页面上的链接

200 - it crawls and parses the HTML.
30X - it follows the redirects.
40X - it will note the error and not load the HTML
50X - it may come back later to check if the status code has changed.

## link canonical 标签

规范 URL 是指搜索引擎认为从网站上的一组重复页面中最具代表性的页面的 URL
谷歌搜索引擎通常会自动检测并对 URL 进行分组, 但最好自己通过 canonical 标签指定, 避免排名不佳或受到处罚, 如`<link rel="canonical" href="https://example.com/products/phone" />`

如果你运行两个不同的网站, 并在每个网站上发布相同的内容, 如果谷歌发现几个 URL 具有相同的内容, 搜索引擎可以决定从中选择一个进行排名, 或者直接将两者降级.

## meta title 标签

title 是搜索结果中展示的链接的名称
是谷歌用来理解你的页面内容的主要元素之一, 最好在里面使用关键字, 且重要内容应放得靠前

## meta description 标签

谷歌表示不会将其作为排名依据
通常用于作为 title 的补充, 可以放更多的关键字. 如果用户的搜索中包含这些关键字, 这些关键字将以粗体显示.

## meta keywords 标签

已废弃, 搜索引擎会跳过对 key 的解析, nuxt 的 SEO 相关 API 填写 key 键会被 TS 报错

## Open Graph

[Open Graph 协议](https://ogp.me/)最初由 Facebook 开发, 它标准化了元数据在任何给定网页上的使用方式,
它们对搜索引擎排名没有任何好处, 但仍然建议使用它们, 因为人们可能会在社交媒体或 WhatsApp 或 Telegram 等私人消息工具上分享你的内容.
在 meta 标签上添加 property 属性, 如`<meta property="og:image" content="https://example.com/images/cool-page.jpg" />`

## Structured Data and JSON-LD

结构化数据有助于搜索引擎理解您的页面
想让富媒体搜索结果显示在 Google 搜索结果中, 需要使用`<script type="application/ld+json">` 标签包裹一个 JSON 对象
参考 [JSON for Linking Data](https://json-ld.org/)

[谷歌结构化数据常规指南](https://developers.google.com/search/docs/appearance/structured-data/sd-policies?hl=zh-cn) 推荐使用 JSON-LD 这种格式标记自己的网页

可以用 [谷歌富媒体搜索结果测试](https://search.google.com/test/rich-results) 和[架构标记验证器](https://validator.schema.org/) , 来验证抓取的结构化数据

npm 上有个包 schema-dts 用于在 TS 中验证 JSON-LD 的类型

## 尾随斜杠

随斜杠是 URL 末尾的 /
通常, 尾随斜杠 URL 是指 Web 服务器上的目录, 而非尾随斜杠 URL 则表示文件
无论是文件还是目录, 搜索引擎都会分开处理这两种 URL, 在这两种 URL 中呈现相同的内容时, 你的网站会提供对搜索引擎优化 (SEO) 产生负面影响的重复内容.
显式配置后, SWA 会应用一组 URL 规范化和重定向规则, 以帮助改进网站的性能和 SEO.
trailingSlash 在 azure-swa 上取值默认 auto, 可以设置 always 或 never
如果是 never, 一切以尾随斜杠结尾的请求都会 301 重定向到非尾随斜杠, 如`/path/`到`/path`, `/path/index.html`到`/path`, `/contact.html`到`/contact`

nextjs 默认采取丢弃 trailingSlash 的策略, 但提供了配置可以配置这个
nuxtjs 对自定义的 Link 组件提供了配置 trailingSlash 的选项, 它的处理方式是如果没配置或者传入了一个不可用的值, 就会作为 unset

## Core Web Vitals

核心网页指标 得分过低会影响排名

Core Web Vitals 是 Web Vitals 的一个子集, 目前由三个衡量加载、交互性和视觉稳定性的指标组成. 这些指标是最大内容绘制 (LCP ) 、首次输入延迟 (FID ) 和累积布局偏移 (CLS ) .
[在线测试](https://pagespeed.web.dev/)

LCP (Largest Contentful Paint) 最大内容绘制 是一个以用户为中心的性能指标, 可以测试用户感知到的页面加载速度, 因为当页面主要内容可能加载完成的时候, 它记录下了这个时间点
在页面加载过程中, 最大内容可能会发生变化

FID (First Input Delay) 首次输入延迟 测量当用户第一次在页面上交互的时候 (点击链接、点击按钮或者自定义基于 js 的事件 ) , 到浏览器实际开始处理这个事件的时间
但这个指标存在局限性, 2024 年 3 月起将被 INP(Interaction to Next Paint) (交互至下一个绘制) 取代, 测量从交互开始到事件处理程序, 直到浏览器能够绘制下一帧的完整持续时间, 作为响应性的新核心 Web 要素指标

CLS (Cumulative Layout Shift) 累计布局偏移
一个网站在页面加载时意外地改变布局, 可能会导致意外的用户错误和分心.

2021 年 6 月起谷歌提供了一组具体的指标和范围来分析和优化您的性能.

Largest Contentful Paint: 25%
Total Blocking Time: 25% // similar to FID
First Contentful Paint: 15%
Speed Index: 15%
Time to Interactive: 15%
Cumulative Layout Shift: 5%

虽然 Core Web Vitals 确实是一项旨在衡量和推动页面体验和搜索排名改善的举措, 但最终受益于这些变化的是用户.
Core Web Vitals 有助于获得最佳页面体验. 根据亚马逊在 2012 年进行的一项研究, 额外一秒的加载时间可能会使公司损失 16 亿美元. 像这样的研究展示了良好的页面体验和快速网站的重要性, 这两者都是 Core Web Vitals 帮助实现的.

INP 和 FID 的区别:
由于 FID 仅测量第一次交互的输入延迟, 因此 Web 开发人员可能没有主动优化后续交互作为其 CWV 改进过程的一部分. 因此, 网站, 尤其是那些具有高度交互性的网站, 必须开始努力在这个指标上做得很好

1.FID 仅测量首次交互的响应性, INP 测量全部交互性
2.FID 进测量首次交互的输入延时, 而不测量事件处理和渲染的耗时

## 管理 SEO 效果

[谷歌搜索控制台](https://search.google.com/search-console/welcome)
