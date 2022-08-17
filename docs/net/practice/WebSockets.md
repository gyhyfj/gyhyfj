# WebSockets

https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API

WebSockets 是一种先进的技术。它可以在用户的浏览器和服务器之间打开交互式通信会话。使用此 API，您可以向服务器发送消息并接收事件驱动的响应，而无需通过轮询服务器的方式以获得响应。
接口：WebSocket CloseEvent MessageEvent
工具：ws 等

## WebSocket

https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket

WebSocket 对象提供了用于创建和管理 WebSocket 连接，以及可以通过该连接发送和接收数据的 API。

## CloseEvent

https://developer.mozilla.org/zh-CN/docs/Web/API/CloseEvent

CloseEvent 会在连接关闭时发送给使用 WebSockets 的客户端。它在 WebSocket 对象的 onclose 事件监听器中使用。

## MessageEvent

https://developer.mozilla.org/zh-CN/docs/Web/API/MessageEvent

MessageEvent 是接口代表一段被目标对象接收的消息。
