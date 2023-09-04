# sendBeacon

```ts
navigator.sendBeacon(url)
navigator.sendBeacon(url, data)
```

使用 sendBeacon 实现高效的数据上报

应用场景:
发送心跳包
埋点
发送用户反馈

当 UA 成功把数据加入传输队列时, sendBeacon() 方法将会返回 true, 否则返回 false

优点:
sendBeacon 方法存在的意义是: 会使用户代理在有机会时异步地向服务器发送数据, 同时不会延迟页面的卸载或影响下一导航的载入

1.  确保数据可靠发送,不受页面卸载过程的影响
2.  异步执行, 不阻塞页面关闭或跳转
3.  能够发送跨域请求

缺点:

1. 只能发送 POST
2. 只能传送少量数据 (64KB 以内)
3. 无法自定义请求头
4. 只能传输 ArrayBuffer、ArrayBufferView、Blob、DOMString、FormData  或  URLSearchParams  类型的数据
5. 如果处于危险的网络环境, 或者开启了广告屏蔽插件 此请求将无效

用法是

```ts
document.addEventListener('visibilitychange', () => {
  document.visibilityState === 'hidden' &&
    navigator.sendBeacon(
      'http://localhost:3000/api/b',
      new Blob([JSON.stringify({ name: 'zs' })], { type: 'application/json' })
    ) // 发送JSON需要先stringify然后转Blob
})
```

应避免使用 unload 和 beforeunload 来发送数据，因为:

1. 在许多情况下（尤其是移动设备）浏览器不会产生 unload、beforeunload 或 pagehide 事件
   比如用户浏览网页后切换到了其他应用而不是关闭标签页，比如用户通过手机的应用管理器关闭了浏览器应用
2. unload 事件与浏览器的往返缓存（bfcache）不兼容
   bfcache 对页面性能非常有益（尤其是移动设备），因为它可以比浏览器的 HTTP 缓存更快地检索整个页面
   一些浏览器选择在往返缓存中排除包含 unload 事件回调的页面，一些浏览器会选择不触发 unload 事件
