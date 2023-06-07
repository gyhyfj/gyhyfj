# Server Send Events

基于 HTTP 协议, 建立单工的长连接
而 websocket 是基于特殊的 HTTP 协议建立的双工 TCP 连接

适用场景:
chatGPT
实时大屏数据

## 后端实现

```ts
app.get('/api/sse', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
  })

  const text = fs.readFileSync('./examples.txt', 'utf8')
  const arr = text.split('')

  let current = 0
  let timer = setInterval(() => {
    if (current < arr.length) {
      // res.write('event: hello\n') // 后端可以主动设置事件名称
      res.write(`data: ${arr[current]}\n\n`)
      current++
    } else {
      clearInterval(timer)
    }
  }, 300)
})
```

## 前端实现

const eventSource = new EventSource(url, options)

```ts
const sse = new EventSource('http://localhost:3000/api/sse')
sse.addEventListener('message', e => {
  // 后端未设置时默认都为message, 后端可以设置不同的event
  console.log(e)
})
```
