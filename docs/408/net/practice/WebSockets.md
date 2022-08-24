# WebSockets

https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API

WebSockets 是一种先进的技术。它可以在用户的浏览器和服务器之间打开交互式通信会话。使用此 API，您可以向服务器发送消息并接收事件驱动的响应，而无需通过轮询服务器的方式以获得响应。
接口：WebSocket CloseEvent MessageEvent
工具：ws 等

## WebSocket

WebSocket 对象提供了用于创建和管理 WebSocket 连接，以及可以通过该连接发送和接收数据的 API。
https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket

readyState 属性

> CONNECTING：值为 0，表示正在连接。
> OPEN：值为 1，表示连接成功，可以通信了。
> CLOSING：值为 2，表示连接正在关闭。
> CLOSED：值为 3，表示连接已经关闭，或者打开连接失败。

binaryType 属性

> blob
> arraybuffer

ws 事件
可以用 on 绑定一个事件，也可以用 addEventListener 绑定多个事件

> open
> close
> error
> message

ws 方法

> ws.send('msg')
> ws.close()

实现心跳检测的思路是：每隔一段固定的时间，向服务器端发送一个 ping 数据，如果在正常的情况下，服务器会返回一个 pong 给客户端，如果客户端通过 onmessage 事件能监听到的话，说明请求正常
我们使用了一个定时器，每隔 3 秒的情况下，如果是网络断开的情况下，在指定的时间内服务器端并没有返回心跳响应消息，因此服务器端断开了，因此这个时候我们使用 ws.close 关闭连接，在一段时间后可以通过 onclose 事件监听到。因此在 onclose 事件内，我们可以调用 reconnect 事件进行重连操作

## CloseEvent

https://developer.mozilla.org/zh-CN/docs/Web/API/CloseEvent

CloseEvent 会在连接关闭时发送给使用 WebSockets 的客户端。它在 WebSocket 对象的 onclose 事件监听器中使用。

## MessageEvent

https://developer.mozilla.org/zh-CN/docs/Web/API/MessageEvent

MessageEvent 是接口代表一段被目标对象接收的消息。

## WS 二次封装（Vue3 组合式函数）

```js
/* websocket.js */
import { onUnmounted } from 'vue'

function useWs() {
  /**
   * 重连锁
   */
  let recLock = false

  /**
   * @params url callbackck data
   * @return ws
   * 检测浏览器是否支持ws，
   * 创建ws连接对象，绑定事件处理函数：
   * onopen发送data并初始化心跳检测，
   * onmessage调用callback并初始化心跳检测，
   * onclose判断是否正常关闭，按需要重连
   * onerror进行重连
   */
  const startWs = (url, callback, data) => {
    if (typeof WebSocket === 'undefined') {
      return console.log('您的浏览器不支持WebSocket, 无法获取数据')
    }
    let ws = new WebSocket(url)
    ws.onopen = e => {
      if (ws.readyState === 1) {
        ws.send(data)
      }
      if (ws.readyState === 3) {
        reconnect()
      }
      heartCheck.start(ws)
    }
    ws.onmessage = e => {
      callback(e)
      heartCheck.start(ws)
    }
    ws.onclose = e => {
      if (e && e.code !== 1000) {
        console.log('WS非正常关闭 e.code不为1000 ')
        reconnect()
      }
    }
    ws.onerror = e => {
      console.log('WS错误 e.data:', e.data)
      reconnect()
    }

    /**
     * 重连函数
     * 判断是否锁定重连，
     * 如果有，则不执行任何操作
     * 如果没有，则锁定重连，在3秒后递归调用整个startWs函数
     */
    const reconnect = () => {
      if (!recLock) {
        recLock = true
        setTimeout(() => {
          ws = null // 释放ws内存
          startWs(url, callback, data)
          recLock = false
        }, 3000)
      }
    }
    /**
     * 组件卸载时，调用主动关闭ws连接方法
     */
    onUnmounted(() => {
      endWs(ws)
    })
    return ws
  }

  /**
   * 接收一个创建的ws实例，关闭ws连接，锁定重连，关闭心跳检测
   */
  const endWs = ws => {
    if (ws) {
      ws.close(1000)
      recLock = true
      heartCheck.stop()
    }
  }

  /**
   * 心跳检测对象
   */
  let heartCheck = {
    timeout: 5000, // 发送心跳以及判断心跳是否超时的间隔
    sendHeartClock: null, // 心跳定时器，定期发送心跳
    reconnectClock: null, // 重连定时器，超时未被清除则重连

    /* 开启心跳检测 */
    start(ws) {
      this.sendHeartClock && clearTimeout(this.sendHeartClock) // 如果有心跳定时器，则清除掉
      this.reconnectClock && clearTimeout(this.reconnectClock) // 如果有重连定时器，则清除掉

      /* 开启一个心跳定时器，5秒后发送心跳 */
      this.sendHeartClock = setTimeout(() => {
        const ping = { ping: true }
        ws.send(JSON.stringify(ping))

        /* 开启一个重连定时器，5秒没收到心跳则调用reconnect重连 */
        this.reconnectClock = setTimeout(() => {
          console.log('没有收到后台的数据，重新连接')
          reconnect()
        }, this.timeout)
      }, this.timeout)
    },

    /* 关闭心跳检测 */
    stop() {
      clearTimeout(this.sendHeartClock)
      clearTimeout(this.reconnectClock)
    },
  }

  /* 返回一个对象，里面有startWs endWs两个成员 */
  return { startWs, endWs }
}

/* 导出这个伪构造函数 */
export default useWs // return { startWs, endWs }
```

```js
/* api.js */
import $ws from './websocket'
let { startWs, endWs } = $ws()
export const wsTest = {
  start: (callback, url = 'ws://10.10.10.xxx:xxx/api/v1/event/ws') => startWs(url, callback),
  end: ws => endWs(ws),
}
```
