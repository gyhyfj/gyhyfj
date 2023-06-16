# WebWorker

在独立线程中执行费时的处理任务, 从而允许主线程(通常是 UI 线程)不会被阻塞/减缓

分为 专用 worker, shared workers, service workers, 音频 workers, chrome workers 等

## 进程与线程

进程是正在运行的程序实例
线程是进程内的一个执行单元，共享进程的地址空间和资源
一个进程可以有多个线程

### 浏览器进程

现代浏览器通常采用多进程结构，每个标签页或扩展都运行在单独的进程中，同时浏览器会分配一个主进程来管理所有的子进程

浏览器进程 也称为主进程，（负责协调、主控），只有一个
渲染进程 负责将 HTML、CSS、JS 转换成网页，通常有多个
网络进程 主要负责页面的网络资源加载，通常只有 1 个
GPU 进程 用于处理图形相关的任务
插件进程 负责在后台运行浏览器插件，有多个
实用程序进程 一个特殊进程，用于处理一些特定的任务，如下载、打印、截屏等

浏览器各进程之间是通过 IPC(进程间通信) 来协作的，IPC 可以实现数据的传递和同步

### 渲染进程

渲染进程负责 页面的渲染，JS 的执行，事件的循环

渲染进程中包含了多个线程，它们分别负责不同的功能和任务
GUI 线程（渲染界面）
JS 引擎线程（处理脚本）
事件触发线程（管理和调度页面中的事件）
定时器线程 （执行页面中的定时器）
异步 http 请求线程 （处理 xhr 请求）
WebWorker 线程（JS 的多线程）

这些线程有协作关系也有互斥关系：
GUI 线程 与 JS 引擎线程 互斥，因为 JS 线程可以操作 DOM，造成问题，为了避免卡顿优化性能，需要避免 JS 执行时间过长
事件触发线程 和 定时器线程 是协作的，它们都会将回调函数放入事件队列中，并通知 JS 引擎线程执行

## 专用 worker 的基础用法

使用构造函数创建一个 worker 对象, worker 将运行在与当前 window 不同的另一个全局上下文中，这个上下文由一个对象表示，标准情况下为 DedicatedWorkerGlobalScop

在 worker 中不能操纵 DOM 元素, 但可以取得 DOM 树中 canvas 的控制权

主线程和 worker 线程间通过 postMessage 发送消息, 通过 message 事件监听接收消息
postMessage 的工作方式是传递副本, 而不是直接共享数据, 如果是可转移对象, 可以转移控制权

worker 还可以创建新的 worker

worker 通过实例的 terminate 方法立即终止 worker, 这个方法不会给 worker 流行任何完成操作的机会, 且 worker 中的定义变量等都会被初始化. 但 Service Worker 不支持这个方法

## 可转移对象

Transferable object

可转移对象是拥有属于自己的资源的对象, 这些资源可以从一个上下文转移到另一个, 确保资源只能同时在一个上下文中可用, 如果发生转移, 原始对象不再可用, 任何对该对象的读写都会抛出异常

可转移对象的资源一次仅能安全地暴露在一个 JavaScript 线程中
例如，ArrayBuffer 是一个拥有内存块的可转移对象。当此类缓冲区（buffer）在线程之间传输时，相关联的内存资源将从原始的缓冲区分离出来，并且附加到新线程创建的缓冲区对象中

使用转移对象资源的机制取决于对象自身。例如，当 ArrayBuffer 在线程之间转移时，它指向的内存资源实际上以快速且高效的零拷贝操作在上下文之间移动。其他对象可以通过拷贝关联的资源，然后将它从旧的上下文中删除来转移它

例如

```ts
const uInt8Array = new Uint8Array(1024 * 1024 * 8)
worker.postMessage(uInt8Array, [uInt8Array.buffer])
// 虽然Uint8Array不能转移,但他们的底层缓冲区是一个ArrayBuffer是一个可转移对象
// 转移内存块在不同线程间的所有权, 比序列化它并复制要高效的多
```

可转移对象有:
ArrayBuffer
ImageBitmap
OffscreenCanvas
MessagePort
ReadableStream
WritableStream
TransformStream
AudioData (en-US)
VideoFrame (en-US)
RTCDataChannel

### OffscreenCanvas

OffscreenCanvas 是一种可以在窗口环境和 web worker 环境中都能用的一种 canvas
创建方式有
::: code-group

```ts [根据宽高创建]
const width = 500
const height = 500
const offScreenCanvas = new OffscreenCanvas(width, height)
```

```ts [根据已有canvas创建]
const canvas = document.querySelector('canvas')
// 下面的操作会创建离屏canvas同时交出canvas的控制权
const offScreenCanvas = canvas.transferControlToOffscreen()
```

:::

离屏 canvas 拥有普通 canvas 的 width height 属性, 和 getContext toBlob 方法,
还有 transferToImageBitmap 方法, 从 OffscreenCanvas 最近渲染的图像创建一个 ImageBitmap 对象

离屏 canvas 的 2d ctx 有普通 canvas 2d ctx 的 getImageData putImageData 等方法,
还有 commit 等方法, 但 commit 似乎在最新版 chrome 中不存在

worker 中操作离屏 canvas 并在 UI 上显示内容变化的方式有:
第一种:
将主线程的 canvas 通过 transferControlToOffscreen 生成一个离屏 canvas, 然后通过 postMessage 传递给 worker 线程, 再从这个离屏 canvas 上通过 getContext 取得 RenderingContext, 通过常规的 clearRect putImageData 等方法来绘制内容,
然后判断浏览器是否支持 commit 方法从而决定是否主动调用 ctx 的 commit 方法
::: code-group

```ts [main.ts]
const canvas = document.querySelector('canvas')
const offscreenCanvas = canvas.transferControlToOffscreen()

const worker = new Worker('path/to/worker')
worker.postMessage({ offscreenCanvas }, [offscreenCanvas])
```

```ts [worker.ts]
addEventListener('message', ev => {
  const { offscreenCanvas } = ev.data
  const ctx = offscreenCanvas.getContext('2d')
  // ... some drawing using the offscreenCanvas context ...

  // call commit if it exists
  ctx.commit?.()
})
```

:::
这种方式效率更高一些, 因为减少了进程间通信的成本

第二种:
worker 中或主线程中独立创建的离屏 canvas, 通过传递 ImageData 或者 transferToImageBitmap 方法生成 ImageBitmap 对象给主线程的 canvas, 主线程 canvas 主动消费掉这些数据来绘制内容

如果是通过 postMessage 传递这些可转移对象, 参数和主线程中调用 postMessage 方法不太一样,
主线程调用 Worker 对象上的 postMessage 时,第二个参数可以直接是`Transferable[]`
worker 中 postMessage 的第二个参数必须是一个对象的形式,以 transfer 字段来描述`Transferable[]`

### ImageBitmap

ImageBitmap 示能够被绘制到 canvas 上的位图图像,具有低延迟的特性,且能在主线程和 worker 线程间转移

具有 width 和 height 两个长整型数值属性, 并且有一个 close 方法,用于释放其所关联的所有图形资源

可以通过多种方式获取, 也可以通过 createImageBitmap 方法创建 (这个方法返回的是 promise)

```ts
const imageEl = await loadImage(imageSrc, true)
const imageBitMap = await createImageBitmap(imageEl)
```

## MessageChannel

多个 worker 之间的通信，直接的做法是将主线程作为桥梁，通过主线程转发实现 worker 间通信

但效率低下，代码复杂度比较高
可以通过 MessageChannel 实现线程间通信，将 port1 和 port2 转移给不同线程，通过 MessagePort 的 message 事件 和 postMessage 方法直接通信
