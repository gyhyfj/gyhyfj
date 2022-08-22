# EventLoop-nextTick

js 如果是多线程那么会出现一个问题，就是如果在同一时间对 dom 元素进行相反的操作，比如增加和删除，就无法解决冲突
HTML5 到来后 js 也支持了多线程 webworker，但也是不允许操作 dom
为了用户体验，出现了同步与异步的概念

## 异步任务

1. 宏任务
   script 整体代码 setTimeout setInterval UI 交互事件 postMessage Ajax
2. 微任务
