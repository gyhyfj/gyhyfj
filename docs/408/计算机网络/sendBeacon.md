# sendBeacon

使用 sendBeacon 实现高效的数据上报

应用场景:
发送心跳包
埋点
发送用户反馈

优点:
不受页面卸载过程的影响, 确保数据可靠发送
异步执行, 不阻塞页面关闭或跳转
能够发送跨域请求

缺点:
只能发送 POST
只能传送少量数据 (64KB 以内)
无法自定义请求头
只能传输 ArrayBuffer、ArrayBufferView、Blob、DOMString、FormData  或  URLSearchParams  类型的数据
如果处于危险的网络环境, 或者开启了广告屏蔽插件 此请求将无效

用法是

```ts
navigator.sendBeacon(
  'http://localhost:3000/api/b',
  new Blob([JSON.stringify({ name: 'zs' })], { type: 'application/json' })
) // 发送JSON需要先stringify然后转Blob
```

当用户代理成功把数据加入传输队列时, sendBeacon() 方法将会返回 true, 否则返回 false
