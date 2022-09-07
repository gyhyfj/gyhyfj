# Promise

## Promise 准确描述

一个 Promise 代表一个在它创建时不一定已知值的代理
一个 Promise 必然处于三种状态之一：pending、fulfilled、rejected

构造函数 Promise() 创建一个新的 Promise 对象，这个构造函数主要用于包裹还没添加 pormise 支持的函数

## 使用 Promise

Promise 是一个对象，代表一个异步操作的最终完成或者失败

本质上 Promise 是一个函数返回的对象，我们可以在上面绑定成功和失败后的回调函数，这样我们就不需要在一开始把成功和失败的回调函数作为参数传入这个函数了。

也就是这样的改写过程：

```js
// 改写前：成功和识别的回调都作为参数传入
asyncFunc(config, successCallback, failtureCallback)

// 改写后：异步函数调用
const promise = asyncFunc(config)
promise.then(successCallback, failtureCallback)
```

可以通过多次 then 方法添加多个回调，它们会按照插入顺序执行，也就是链式调用

## 链式调用

连续执行多个异步操作是一个常见的需求，在上一个操作成功后执行下一个操作，并带着上一次操作的结果

创建 Promise 链可以实现这个需求，then 函数会返回一个新的 Promise 对象
这样会解决回调地狱的问题

then 里的参数是可选的，常见的写法是只写一个 successCallback，如`then(res=>res + 1)`,
而 failtureCallback 交给 catch 方法处理，
catch(failureCallback) 其实是 then(null, failureCallback) 的缩写形式
所以，catch 的后面仍可以继续使用链式操作

通常，一遇到异常抛出，浏览器就会顺着 Promise 链寻找下一个 onRejected 失败回调函数或者由 .catch() 指定的回调函数

.finally()方法在前面的 Promise 无论被 resolve 还是 reject 都会被调用，返回一个 Promise

## Promise 拒绝事件

当 Promise 被拒绝时，会有下面两个事件之一被派发到全局作用域（window、Worker 等）：

1. rejectionhandled （当 Promise 被拒绝、并且在 reject 函数处理该 rejection 之后会派发此事件）
2. unhandledrejection（当 Promise 被拒绝，但没有提供 reject 函数来处理该 rejection 时，会派发此事件）

这两种情况，事件对象都有两个属性，一个是 promise 属性，指向被拒绝的 Promise，一个是 reason 属性，描述被拒绝的原因

用途是：
可以通过以上事件为 Promise 失败时候提供补偿。并且因为在每一个上下文中，这个事件都是全局的，因此不论源码如何，所有错误都会被自己所定义的同一个处理函数捕获和处理。
举例，nodejs 中，有些依赖的模块可能有未被处理的 Promise 拒绝，这些都会在运行时被打印到 console，我们可以在自己的代码中捕获这些信息，然后添加分析处理函数，或干脆不让这些信息在 console 显示，以维持输出整洁：

```js
window.addEventListener(
  'unhandledrejection',
  event => {
    /* 你可以在这里添加一些代码，以便检查
     event.promise 中的 promise 和
     event.reason 中的 rejection 原因 */

    event.preventDefault()
  },
  false
)
```

## 用 Promise 封装旧式 API

例如 setTimeout 函数，是一个异步函数，但不返回 Promise，仍用旧的方式来传入成功和失败的回调
混用旧式回调和 Promise 可能会出现时许问题

用 Promise 封装 setTimeout：

```js
// 改写前
setTimeout(() => console.log('3s passed'), 3000)

// 改写后
const wait = ms => new Promise(res => setTimeout(res, ms)) // res是resolve函数
wait(3000)
  .then(() => console.log('3s passed'))
  .catch(err => console.log(err))
```

Promise 的构造器接收一个执行函数，在这个执行函数里手动地 resolve 和 reject 一个 Promise
因为 setTimeout 不会真的执行失败，所以可以省略 reject 这个参数

## Promise.resolve() 和 Promise.reject()

Promise.resolve() 和 Promise.reject() 是手动创建一个已经 resolve 或者 reject 的 Promise 快捷方法

### Promise.resolve()

Promise.resolve(value)返回一个 Promise，如果 value 是 Promise，则返回这个 Promise；如果 value 是 thenable，则返回其最终状态

例如：

```js
Promise.resolve(1) // Promise { 1 }，1作为返回值传给后续操作
```

例如：

```js
var original = Promise.resolve(33) // Promise {33}
var cast = Promise.resolve(original) // 直接返回original Promise {33}
/* 异步任务 */
cast.then(function (value) {
  console.log('value: ' + value) // value: 33
})
/* 同步任务 */
console.log('original === cast ? ' + (original === cast)) // original === cast ? true

/*
 *  打印顺序如下，这里有一个同步异步先后执行的区别
 *  original === cast ? true
 *  value: 33
 */
```

### Promise.reject()

Promise.reject(reason) 返回一个带有拒绝原因的 Promise 对象

```js
Promise.reject(new Error('fail'))
```

## Promise.all() 和 Promise.race()

并行运行异步操作的两个组合式工具

### Promise.all()

接收一个 iterable 类型（Array，Map，Set），如一个 promise 数组，返回一个 Promise，值是一个结果数组。

Promise.all()等待所有都完成，或第一个失败

```js
const promise1 = Promise.resolve(3)
const promise2 = 42 // 输入不是Promise但也没关系
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo')
})

Promise.all([promise1, promise2, promise3]).then(values => {
  console.log(values) // [ 3, 42, 'foo' ]
})
```

如果传入为空迭代，则作为同步任务立即执行

### Promise.race()

接收一个 iterable 类型（Array，Map，Set），一旦某个 promise 被 resolve 或 inject，返回的 promise 就会 resolve 或 inject

## 书写规范

不要嵌套
总是返回或终止 Promise 链

## async await

async 标注的函数作为同步任务执行，但执行到内部的 await 语句，会作为微任务放入任务队列，await 语句下面的代码，其实相当于写在 Promise.then 里面的

```js
async function func() {
  console.log('X')
  await Promise.resolve()
  console.log('Y')
}

func()
console.log('Z')

// X Z Y
```

try 语句
try 语句包含了由一个或者多个语句组成的 try 块，和一个或多个（条件 catch 块） catch 块或者一个 finally 块的其中一个，或者两个兼有

如果 try 中抛出异常，则进入 catch 语句
catch 块指定一个标识符作为形参，保存由 throw 语句指定的值

如果从 finally 块中返回一个值，那么这个值将会成为整个 try-catch-finally 的返回值，无论是否有 return 语句在 try 和 catch 中。

```js
const func = () => {
  try {
    let a = 0 // a的作用域只在这个花括号内
    return a
  } catch (e) {
    console.log(e)
  } finally {
    return 1
  }
}
console.log(func()) // 1
```
