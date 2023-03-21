跨域问题

通过 img 标签加载的图片，默认情况下会被浏览器缓存，
当 JS 代码中通过 Image 构造器去访问同一个图片时，浏览器不会再发起新的请求，而是直接访问缓存的图片，这时候，即使 JS 中设置了`crossorigin="anonymous"`也不会生效，因为缓存的图片的 img 标签原本可能没有写`crossorigin="anonymous"`

解决方案是

1. 后面需要复用的图片资源的 img 标签，写上`crossorigin="anonymous"`
2. 直接封装图片组件，默认写上这个规则，顺带解决 cls 和懒加载等功能
3. JS 代码请求时 url 后面加个随机值参数，比如`?res=${Date.now()}`，每次访问的地址不同，避免走浏览器缓存
