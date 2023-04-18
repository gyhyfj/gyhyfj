## name 为 keywords 的 meta 标签

tdk k 现在不用了 搜索引擎会跳过对 key 的解析，nuxt 的 SEO 相关 API 填写 key 键会被 TS 报错

## 尾随斜杠

随斜杠是 URL 末尾的 /。 通常，尾随斜杠 URL 是指 Web 服务器上的目录，而非尾随斜杠 URL 则表示文件。
无论是文件还是目录，搜索引擎都会分开处理这两种 URL。 在这两种 URL 中呈现相同的内容时，你的网站会提供对搜索引擎优化 (SEO) 产生负面影响的重复内容。
显式配置后，Static Web Apps 会应用一组 URL 规范化和重定向规则，以帮助改进网站的性能和 SEO。
trailingSlash 在 azure-swa 上取值默认 auto 可以设置 always 或 never

nextjs 默认采取丢弃 trailingSlash 的策略，但提供了配置可以配置这个
nuxtjs 对自定义的 Link 组件提供了配置 trailingSlash 的选项， 它的处理方式是如果没配置或者传入了一个不可用的值，就会作为 unset

## JSON-LD

想让富媒体搜索结果显示在 Google 搜索结果中，需要使用`<script type="application/ld+json">` 标签包裹一个 JSON 对象
JSON for Linking Data
https://json-ld.org/

谷歌结构化数据常规指南 推荐使用 JSON-LD 这种格式标记自己的网页
https://developers.google.com/search/docs/appearance/structured-data/sd-policies?hl=zh-cn

可以用 谷歌富媒体搜索结果测试，来验证抓取的结构化数据
https://search.google.com/test/rich-results

怎么做？

npm 上有个包 schema-dts 用于在 TS 中验证 JSON-LD 的类型

## 306 307
