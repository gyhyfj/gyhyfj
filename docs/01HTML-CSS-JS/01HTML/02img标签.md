# img 标签

## 标签属性

> [标签属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) src alt crossorigin referrerpolicy width height intrinsicsize sizes srcset
> [全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes)

### src

图片路径，各种原因导致图像加载错误时会触发 onerror 事件处理器：

1. 属性值为空字符串或 null
2. url 与页面 url 完全一致
3. 图像损坏
4. 图像元数据被破坏，无法检索宽高且 img 标签未指定宽高
5. 用户代理不支持该图片格式

### alt

图像的备用文本描述，用于屏幕阅读器，以及作为无法加载图片时的备用文本，将图像复制并粘贴为文本，或是将图像的链接保存为浏览器书签时，也会用到此属性，有利于 SEO

如果把这个属性设置为空字符串（alt=""），则表明该图像不是内容的关键部分，非可视化浏览器渲染时可能直接忽略该图片，且可视化浏览器图像加载失败时会隐藏表示图片损坏的标签

### crossorigin

表明是否必须使用 CORS 完成相关图像的抓取，启用 CORS 的图像 可以在 canvas 元素中重复使用，而不会被污染
取值有：

1. anonymous 执行一个跨域请求，有请求头但不发送证书
2. use-credentials 一个有证书的跨域请求

### decoding

为浏览器提供图像解码方式上的提示

1. sync 同步
2. async 异步
3. auto 默认，由浏览器自行决定

referrerpolicy

### width height

图像宽高，单位是 px，可以只指定一个，浏览器会按原始比例自行缩放
不可以带单位，只能是一个数值

### importance

指示下载资源时相对重要性，或者说优先级

1. auto 浏览器可以使用自己的算法来为图像选择优先级
2. height
3. low

### sizes

表示资源大小的、以逗号隔开的一个或多个字符串

### srcset

以逗号分隔的一个或多个字符串列表表明一系列用户代理使用的可能的图像

## 标签特性

1. img 标签是一个可替换元素，它的 display 属性的默认值是 inline，但是它的默认分辨率是由被嵌入的图片的原始宽高来确定的，使得它就像 inline-block 一样，设置宽高边框等 CSS 属性
2. img 标签没有基线，所以当设置`vertical-align: baseline` 时，图像的底部将会与容器的文字基线对齐
3. object-position object-fit

## Image 构造器

## 性能优化

It’s now well worth setting width and height attributes on your images to prevent layout shifts and improve the experience of your site visitors.

https://www.smashingmagazine.com/2020/03/setting-height-width-images-important-again/

https://web.dev/cls/

https://www.smashingmagazine.com/2019/12/browsers-containment-css-contain-property/

display 为 none 或父元素 display 为 none 的 img 标签，浏览器仍会对其图片资源进行加载
