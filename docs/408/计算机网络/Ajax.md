# Ajax

Ajax 的全称是 Asynchronous JavaScript and XML, 即异步的 Javascript 和 XML, 解决数据获取和局部刷新渲染的问题
它并不是一项新的技术, 而是几种技术的集合, 其中最核心的就是 xhr (XMLHttpRequest)

## xhr 的用法

先创建一个 xhr 实例, 然后调用实例的 open 方法, 然后调用 send 方法, 通过实例的 onreadystatechange 绑定回调处理请求结果

```ts
const xhr = new XMLHttpRequest()

xhr.open('GET', url)

// 设置请求头 一定要放在open下面
xhr.setRequestHeader('Content-Type', 'application/json')
// 如果是上传文件的multipart/form-data 则不需要设置, 浏览器会自己设置分隔符正确的格式

// 监听状态改变
xhr.onreadystatechange = () => {
  // readyState 取值:
  // 0 未初始化 还没调用 open
  // 1 已打开 已经调用 open 但还没调用 send
  // 2 已发送 send已调用
  // 3 正在接收 响应没有全部完成
  // 4 已完成 服务端已完成了数据传输 会触发xhr的load事情
  if (xhr.readyState === 4 && xhr.status === 200) {
    // xhr 实例上 responseType 属性可以指定需要什么类型的数据
    // 如果这个字段不是空或"text",
    // 最终通常可以在 response 上获取解析好的对象, 在 responseText 上只能获取字符串或二进制文件的乱码
    console.log(xhr.responseText)
  }
}

// 可以监听load事件代替监听readyState改变
xhr.addEventListener('load', () => {
  if (xhr.status === 200) {
    console.log(xhr.responseText)
  }
})

// 监听进度
xhr.addEventListener('progress', ev => {
  console.log(ev.loaded, ev.total)
})

// 监听超时
xhr.timeout = 6000

xhr.addEventListener('timeout', () => {
  console.log('Timeout')
})

// 中断请求
xhr.addEventListener('abort', () => {
  console.log('Abort request')
})
// xhr.abort()

xhr.send(null)
```
