# EventLoop-nextTick

js 如果是多线程那么会出现一个问题，就是如果在同一时间对 dom 元素进行相反的操作，比如增加和删除，就无法解决冲突
HTML5 到来后 js 也支持了多线程 webworker，但也是不允许操作 dom
为了用户体验，出现了同步与异步的概念

## 异步任务

1. 宏任务
   script 整体代码、 setTimeout、 setInterval、 UI 交互事件、 postMessage、 Ajax
2. 微任务
   Promise.then catch finally、 MutaionObserver、 process.nextTick（Node.js 环境）、（await 语句其实也相当于微任务，await 后面的语句相当于 then 里面的语句，也相当于微任务）

## nextTick

nextTick 是等待下一次 DOM 更新刷新的工具方法

vue 中更改响应式状态时，最终的 DOM 更新并不是同步生效，而是由 vue 把它们放在一个缓存队列中，直到下一个 tick 才一起执行

这样是为了确保每个组件无论发生多少状态改变，都只执行一次更新

nextTick() 可以在状态改变后立即使用，以等待 DOM 更新完成。你可以传递一个回调函数作为参数，或者 await 返回的 Promise。

```vue {2,12}
<script setup>
import { ref, nextTick } from 'vue'

const count = ref(0)

async function increment() {
  count.value++

  // DOM 还未更新
  console.log(document.getElementById('counter').textContent) // 0

  await nextTick()
  // DOM 此时已经更新
  console.log(document.getElementById('counter').textContent) // 1
}
</script>

<template>
  <button id="counter" @click="increment">{{ count }}</button>
</template>
```
