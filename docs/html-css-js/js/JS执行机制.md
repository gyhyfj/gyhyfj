# JS 事件循环机制

主线程不断重复地获取任务和执行任务，叫做事件循环
三个位置: 执行栈 宿主环境 任务队列
异步任务委托给宿主环境执行，执行后的回调函数放入任务队列
异步任务又分为宏任务（ajax fs setTimeout setInterval）和微任务（click resize then catch finally nextTick），优先检测是否有微任务并执行

## 同步任务和异步任务

JavaScript 是一门**单线程执行**的编程语言。也就是说，同一时间只能做一件事情

为了防止某个耗时任务导致程序假死的问题，JavaScript 把待执行的任务分为了两类：

1. 同步任务（synchronous）

   - 又叫做**非耗时任务**，指的是在主线程上排队执行的那些任务
   - 只有前一个任务执行完毕，才能执行后一个任务

2. 异步任务（asynchronous）
   - 又叫做**耗时任务**，异步任务由 JavaScript **委托给宿主环境**进行执行
   - 当异**步任务执行完成后**，会通知 JavaScript **主线程执行**异步任务的**回调函数**

同步任务和异步任务的执行过程
三个位置: 主线程执行栈 宿主环境 任务队列

1. 同步任务由 JavaScript 主线程次序执行
2. 异步任务委托给宿主环境执行
3. 已完成的异步任务对应的**回调函数**，**会被加入**到**任务队列**中等待执行.
4. JavaScript 主线程的**执行栈**被**清空后**，会读取任务队列中的回调函数，次序执行
5. JavaScript 主线程不断重复上面的第 4 步

例如,`thenFs.readFile('./files/3.txt', 'utf8').then(()=>console.log('A'))`, 这个语句,先被放入宿主环境,读取文件结束后,把回调函数`console.log('A')`放回任务队列等待执行
例如,计时器函数,计时结束后会把回调函数放回任务队列等待执行

**JavaScript 主线程从“任务队列”中读取异步任务的回调函数，放到执行栈中依次执行**。这个过程是循环不断的，所以整个的这种运行机制又称为 **EventLoop**（事件循环）

## 宏任务和微任务

JavaScript 把**异步任务又做了进一步的划分**，异步任务又分为两类，分别是：

1. 宏任务（macrotask）

   - 异步 Ajax 请求、
   - setTimeout、setInterval、
   - 文件操作
   - 其它宏任务

2. 微任务（microtask）
   - Promise.then、.catch 和 .finally
   - process.nextTick
   - 其它微任务

每一个宏任务执行完之后，先检查**是否存在待执行的微任务**，
**如果有**，则**执行完所有微任务之后，再继续执行下一个宏任务**。

其中`new Promise(function(){})`,Promise 实例中的函数都是作为同步任务执行

**分析执行顺序的方法**, 只需要思考 同步任务栈 宏任务队列 微任务队列 回调函数队列即可

## 异步编程

Event Loop（JS 执行机制）
主线程不断重复地获取任务和执行任务，叫做事件循环
三个位置: 执行栈 宿主环境 任务队列
异步任务委托给宿主环境执行，执行后的回调函数放入任务队列
异步任务又分为宏任务（ajax fs setTimeout setInterval）和微任务（click resize then catch finally nextTick），优先检测是否有微任务并执行

Promise 对象
一个 Promise 实例有三种状态，分别是 pending、resolved 和 rejected，分别代表了进行中、已成功和已失败
可以通过 resolve() 和 reject() 函数来**改变**状态，参数传递给后面的.then 或.catch 处理
.then 方法返回新的 Promise 实例
.catch 方法捕捉失败结果
.finally 方法是不管 promise 最后的状态，在执行完 then 或 catch 指定的回调函数以后，都会执行 finally 方法指定的回调函数

Promise.all([ p1,p2,p3 ])
当所有的子 Promise 都完成，该 Promise 完成，返回值是全部值的数组,这个数组按顺序保存着每一个 promise 对象 resolve 执行时的值
但如果有任何一个失败，该 Promise 失败，返回值是第一个失败的子 Promise 的结果
Promise.race([ p1,p2,p3 ])
与 all 不同的是，当最先执行完的事件执行完之后，就直接返回该 promise 对象的值。如果第一个 promise 对象状态变成 resolved，那自身的状态变成了 resolved；反之第一个 promise 变成 rejected，那自身状态就会变成 rejected
实际应用中常用来参合进去一个计时的，当超过多长时间，这些异步任务就都不做了
Promise.race([ p1,p2,p3,timeOutPromise(5000) ])

async await
捕捉异常：

```js
async function fn() {
  try {
    let a = await xxxxx
  } catch (err) {
    console.log(err)
  }
}
```

并发与并行
并发是宏观概念，同一时间通过任务间的切换完成多个任务也是并发
并行是微观概念，同一时间多个指令在处理器上同时进行

三个定时器函数
最常用的是 setTimeout，很多人认为 setTimeout 是延时多久，那就应该是多久后执行，其实这个观点是错误的，因为 JS 是单线程执行的，如果前面的代码影响了性能，就会导致 setTimeout 不会按期执行。当然了，可以通过代码去修正 setTimeout，从而使定时器相对准确。
setInterval，其实这个函数作用和 setTimeout 基本一致，只是该函数是每隔一段时间执行一次回调函数，通常来说不建议使用 setInterval。第一，它和 setTimeout 一样，不能保证在预期的时间执行任务。第二，它存在执行累积的问题，如果定时器执行过程中出现了耗时操作，多个回调函数会在耗时操作结束以后同时执行，这样可能就会带来性能上的问题。
requestAnimationFrame 会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率。在隐藏或不可见的元素中，requestAnimationFrame 将不会进行重绘或回流。如果有循环定时器的需求，其实完全可以通过 requestAnimationFrame 来实现，首先 requestAnimationFrame 自带函数节流功能，基本可以保证在 16.6 毫秒内只执行一次（不掉帧的情况下），并且该函数的延时效果是精确的，没有其他定时器时间不准的问题。

```js
let clock = setInterval(() => console.log('hi'), 1000)
clearInterval(clock)

let clock = setTimeout(() => console.log('hi'), 1000)
clearTimeout(clock)

window.requestAnimationFrame(回调函数)
```
