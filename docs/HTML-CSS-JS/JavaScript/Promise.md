# Promise

## Promise

Promise 是一个对象, 从它可以获取异步操作的消息

Promise 也有一些缺点. 首先, 无法取消 Promise, 一旦新建它就会立即执行, 无法中途取消. 其次, 如果不设置回调函数, Promise 内部抛出的错误, 不会反应到外部. 第三, 当处于 pending 状态时, 无法得知目前进展到哪一个阶段 (刚刚开始还是即将完成) .

Promise 构造函数接受一个函数作为参数, 该函数的两个参数分别是 resolve 和 reject. 它们是两个函数, 由 JavaScript 引擎提供, 不用自己部署.

resolve 函数的作用是, 将 Promise 对象的状态从 pending 变为 resolved

reject 函数的作用是, 将 Promise 对象的状态从 pending 变为 rejected

调用 resolve 或 reject 并不会终结 Promise 的参数函数的执行

一般来说, 调用 resolve 或 reject 以后, Promise 的使命就完成了, 后继操作应该放到 then 方法里面, 而不应该直接写在 resolve 或 reject 的后面

### then 方法

then 方法接受两个可选参数, 返回一个新的 Promise 实例
第一个参数是 resolved 状态的回调函数, 第二个参数是 rejected 状态的回调函数

一个 Promise 后面跟 then 方法, 会得到一个新 promise, 这个 promise 最终 resolve 的是 then 返回的结果, 如果 then 无返回, 则 resolve undefined

```ts
const b = a.then(res => 9) // .then运算先执行, 然后再执行赋值运算, 把新的promise赋值给b
```

then 方法的第二个回调不能捕捉第一个回调中抛出的错误，只能在后续的链式调用中捕捉本次链式调用抛出的错误

### catch 方法

catch 方法是 then(null, rejection)或 then(undefined, rejection)的别名, 用于指定发生错误时的回调函数
可以捕获前面未被捕获的错误或 reject

如果前面的 Promise 在 resolve 语句后再抛出错误, 不会被捕获, 因为 Promise 的状态一旦改变, 就不会再变了

Promise 和 try/catch 代码块不同的是, Promise 对象抛出的错误不会传递到外层代码, 即不会有任何反应

目前可以通过 unhandledRejection 事件监听未捕获的 reject 错误, 但这个事件有计划在未来被废弃

### finally 方法

finally 方法用于指定不管 Promise 对象最后状态如何, 都会执行的操作, 不接受任何参数, 本质上是 then 方法的特例

### Promise.all() 方法

Promise.all()方法接收一个 Promise 实例的数组, 返回一个新的 promise
只有全部 resolve 后才会 resolve
resolve 一个数组, 依次存放每个 Promise resolve 的东西

### Promise.race() 方法

Promise.race()方法接收一个 Promise 实例的 iterable, 返回一个新的 promise
只要有一个 resolve 就会 resolve
resolve 一个最快 resolve 的 Promise resolve 的内容

### Promise.allSettled() 方法

Promise.allSettled()方法接收一个 Promise 实例的 iterable, 返回一个新的 promise
只有等到参数数组的所有 Promise 对象都发生状态变更, 不论成功和失败, 才 resolve 出最终结果的数组, 形如:

```ts
;[
  { status: 'rejected', reason: 'xxx' }, // reject 的成员
  { status: 'fulfilled', value: 'xxx' }, // resolve 的成员
]
```

### Promise.any() 方法

Promise.any()方法接收一个 Promise 实例的 iterable, 返回一个新的 promise
只要参数实例有一个变成 fulfilled 状态, 包装实例就会变成 fulfilled 状态; 如果所有参数实例都变成 rejected 状态, 包装实例就会变成 rejected 状态

### Promise.resolve()方法

如果参数是 Promise 实例, 那么 Promise.resolve 将不做任何修改、原封不动地返回这个实例

```ts
Promise.resolve(promise) === promise // true
```

如果参数是一个 thenable 对象, 那么 Promise.resolve()方法会将这个对象转为 Promise 对象, 然后就立即执行 thenable 对象的 then()方法

如果参数是一个原始值, 或没有参数, 或者是一个不具有 then()方法的对象, 则 Promise.resolve()方法返回一个新的 Promise 对象, 状态为 resolved, 这会作为微任务执行

### Promise.reject()方法

Promise.reject()方法返回一个 Promise 对象, 接收的参数会原封不动地作为 reject 的理由

### Tips

链式调用中, 后面的链中访问不到前面链中的变量, 除非 resolve 过去, 或者存在外面作为全局变量

用 Promise 封装 setTimeout: `const wait = delay => new Promise(res => setTimeout(res, delay))`

.catch(e=>{}) 只能捕捉操作链顶部 Promise reject 的内容以及后续的 .then() 中同步操作抛出的错误

想要捕捉 setTimeout 的回调函数里可能抛出的错误, 可以将 setTimeout 包装成 promise, 然后把回调放在这个 promise 的回调的链式调用中, 在链尾用 .catch(e=>{}) 捕捉错误

```ts
const wait = (ms: number) => new Promise(res => setTimeout(res, ms))
wait(3000)
  .then(async () => {
    await Promise.reject(8)
  })
  .catch(err => console.log(err)) // 8 3秒后打印
```

```ts
const wait = (ms: number) => new Promise(res => setTimeout(res, ms))
wait(3000)
  .then(async () => {
    await wait(2000)
    await Promise.reject(8)
  })
  .catch(err => console.log(err)) // 8 5秒后打印
```

## async await 函数

async 函数是 Generator 函数的语法糖, 内置执行器, 更好的语义, 更广的适用性, 返回值是 Promise
只有 async 函数内部的 await 操作执行完或遇到 return 语句或抛出错误, 才会发生状态变化, 执行 then 方法指定的回调函数.

### async 函数的返回值

返回值是将多个异步操作, 包装成的一个 Promise 对象，
但又不是简单地通过`Promise.resolve`包装的，
因为`Promise.resolve(promise) === promise`, 但 async 函数如果 return promise 时候会在上面再套一层 promise,

```ts
const promise = new Promise<string>(resolve => setTimeout(resolve, 1000, 'RES'))
const fn = async () => promise
fn() === promise // false
```

如果返回 promise 会对这个 promise 进行包装得到一个新的 promise, 调用时候去解这个双层 promise
如果返回 await promise，会等这个 promise 解出来后再返回,把结果再包装一层再返回
非必要不返回 await promise

```ts
const fn1 = async () => promise
const fn2 = async () => await promise // 需要等这个promise解出来后再返回，计时模块需要注意
```

## try-catch-finally

如果 try 中抛出异常, 则进入 catch 语句
catch 块指定一个标识符作为形参, 保存由 throw 语句指定的值
如果从 finally 块中返回一个值, 那么这个值将会成为整个 try-catch-finally 的返回值, 无论是否有 return 语句在 try 和 catch 中.

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

await 后面的 Promise 可以通过.catch 捕获它的错误
也可以用 try catch 包裹代码块,

注意 await 搭配链式调用时候的代码执行顺序:
await 后的 promise 一定会被执行到链式调用调用完毕, 才会执行下一行代码

```ts
const fn = async () => {
  await Promise.resolve()
    .then(() => {
      console.log(1) // .then 后是微任务
    })
    .then(() => {
      console.log(2)
    })
  console.log('done') // await 后是微任务
}

fn() // 1 2 done

const fn = async () => {
  await Promise.resolve().then(() => {
    Promise.resolve(1).then(console.log) // .then 后是微任务, .then 的微任务中 Promise.resolve() 是同步任务, 它后面的 .then 又是微任务
    Promise.resolve(2).then(console.log)
  })
  console.log('done')
}

fn() // 1 2 done

let wait = new Promise((res, rej) => {
  setTimeout(res, 1000, 1) // setTimeout 是宏任务, 网络请求也是宏任务, 虽然比微任务早放入任务队列, 但却是随后执行的
})

const fn = async () => {
  await Promise.resolve().then(() => {
    wait.then(console.log)
  })
  console.log('done')
}

fn() // done 1
```

try{}catch(e){} 只能捕捉 try 中同步操作抛出的错误, 不能捕捉语法错误以及异步操作中抛出的错误
try{}catch(e){} 还能捕捉 try 中 await 的 Promise 的 then 语句里同步抛出的错误, 包括 then 语句 await 的 Promise 抛出的错误

try{}catch(e){} 还能捕捉 try 中 require 语句抛出的错误

```ts
const wait = (ms: number) => new Promise(res => setTimeout(res, ms))

const fn = async () => {
  try {
    await wait(3000)
    throw new Error('8')
  } catch (e) {
    console.log(e) // 8
  }
}

fn()
```

```ts
const wait = (ms: number) => new Promise(res => setTimeout(res, ms))

// const fn = async () => {
//   try {
//     setTimeout(() => {
//       throw new Error('8')
//     }, 3000)
//   } catch (e) {
//     console.log(e)
//   }
// }

const fn = async () => {
  try {
    Promise.reject(8)
  } catch (e) {
    console.log(e)
  }
}

fn() // 无法捕捉异步抛出的错误
```

```ts
const wait = (ms: number) => new Promise(res => setTimeout(res, ms))

const fn = async () => {
  try {
    await Promise.reject(8) // 只有await了才能捕捉到错误
  } catch (e) {
    console.log(e) // 8
  }
}

fn()
```

async 函数中的一列 await, 如果哪个 await 失败后面的 await 就不再执行,
即使用 try catch 包裹也没用, 因为它们只是捕捉错误, 错付发生了后面的代码就是不会继续执行
除非用 try catch 包裹每行 await

try{}catch{}finally{}的执行顺序:
try 块和 catch 块中的同步任务直接执行, 异步任务推进任务执行队列, 然后**直接执行** finally 块中的代码.

**finally 块中的代码不会等待 try 和 catch 块中的异步执行完毕**

```ts
const wait = (ms: number) => new Promise(res => setTimeout(res, ms))
try {
  wait(200).then(() => {
    console.log(1)
  })
  try {
    wait(200).then(() => {
      console.log(2)
    })
  } finally {
    wait(200).then(() => {
      console.log(3)
    })
  }
} finally {
  wait(200).then(() => {
    console.log(4)
  })
  console.log(5)
}
// 5 1 2 3 4
```
