# JS 总结

## 数组的原生方法

toString()、toLocalString()、join()
pop() 和 push()，push 方法可以传入多个参数
shift() 和 unshift() unshift 方法可以传递多个参数，表示在数组开头增加
reverse() 和 sort()，sort() 方法可以传入一个函数来进行比较，传入前后两个值，如果返回值为正数，则交换两个参数的位置
concat() ，返回的是拼接好的数组，不影响原数组
slice(begin [ end ])，用于截取数组中的一部分返回，不影响原数组。
array.splice(start[, deleteCount[, item1[, item2[, ...]]]])，改变原数组
reduce() 和 reduceRight() 方法 （数组归并）

## use strict

是 ES5 添加的严格模式
禁止使用 with 语句 禁止 this 指向全局对象 对象不能有重名的属性
目的：
提高编译器效率，增加运行速度
消除 Javascript 语法的不合理、不严谨之处，减少怪异行为
消除代码运行的不安全之处，保证代码运行的安全
为未来新版本的 Javascript 做好铺垫

## for in 和 for of 的区别

for… in 会遍历对象的整个原型链，性能非常差不推荐使用，而 for … of 只遍历当前对象不会遍历原型链
对于数组的遍历，for…in 会返回数组中所有可枚举的属性(包括原型链上可枚举的属性)，for…of 只返回数组的下标对应的属性值

## 数组的遍历方法：

for...of 不改变原数组
forEach() 视情况是否改变原数组
filter() 不改变原数组，有返回值，返回一个符合筛选规则的新数组
every() 和 some() 不改变原数组，some()只要有一个是 true，便返回 true；而 every()只要有一个是 false，便返回 false.
map() 不改变原数组 数组方法，不改变原数组，有返回值，生成一个一一对应的新数组
find() 和 findIndex() 不改变原数组，find()返回的是第一个符合条件的值；findIndex()返回的是第一个返回条件的值的索引值
reduce() 和 reduceRight() 不改变原数组，reduce()对数组正序操作；reduceRight()对数组逆序操作

## forEach 和 map 方法有什么区别

forEach()方法会针对每一个元素执行提供的函数，对数据的操作会改变原数组，该方法没有返回值
map()方法不会改变原数组的值，有返回值，返回一个新数组，新数组中的值为原数组调用函数处理之后的值

## 实现深拷贝的方法

JSON.stringify()
函数库 lodash 的`_.cloneDeep` 方法
手写实现深拷贝函数

```js
function deepCopy(obj) {
  if (!obj || typeof obj !== 'object') return
  let newObj = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }
  return newObj
}
```

## 原型

每个函数都有显式原型`prototype`，
每个对象都有隐式原型`__proto__`，

```js
// 构造函数
function Point(x, y) {
  this.x = x
  this.y = y
}

// 实例
const point = new Point(1, 1)

console.log(Point.prototype)
/*
 * {
 *   constructor: f Point(x,y),
 *   [[prototype]]: Object
 * }
 *
 * 构造函数的原型对象，默认有两个属性：
 * 一个是 constructor，指向构造函数本身；
 * 另一个是`__proto__`，也就是`[[prototype]]`指向其上一级的原型
 */
console.log(Point.prototype.constructor === Point) // true

console.log(point.__proto__ === Point.prototype) // true
/*
 * 实例对象的`__proto__`，指向它构造函数的显式原型
 * `point.__proto__ === Point.prototype`
 */
```

原型的属性被所有实例共享，
原型的方法 this 指向实例本身

## 原型链

JS 原型链的本质：建立了对象属性（包括方法）的查找机制
当**某个对象访问某个属性的时候**：先查自身，再查其隐式原型，向上直到 Object.prototype 为止，因为它的隐式原型为 null `Object.prototype.__proto__ = null`
`point.__proto__.__proto__.__proto__`
`` point-----(`__proto__`)----->Point.prototype-----(`__proto__`)----->Object.prototype-----(`__proto__`)----->null ``

## 闭包

执行上下文
在执行 js 代码前会创建执行上下文
● 全局上下文：变量定义，函数声明
● 函数上下文：变量定义，函数声明，this，arguments
作用域链

```js
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i++)
  }, 4000)
}
console.log(i) // 5 5 6 7 8 9
```

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

## 浏览器的垃圾回收机制

当变量不再参与运行时，就需要系统收回被占用的内存空间，这就是垃圾回收。
Javascript 具有自动垃圾回收机制，会定期对那些不再使用的变量、对象所占用的内存进行释放。
全局变量的生命周期会持续要页面卸载；而局部变量声明在函数中，它的生命周期从函数执行开始，直到函数执行结束，在这个过程中，局部变量会在堆或栈中存储它们的值，当函数执行结束后，这些局部变量不再被使用，它们所占有的空间就会被释放。
当局部变量被外部函数使用时，其中一种情况就是**闭包**，在函数执行结束后，函数外部的变量依然指向函数内部的局部变量，此时局部变量依然在被使用，所以不会回收。

垃圾回收的方式：
标记清除：
当变量出入执行环境时，会加上标记。垃圾收集器在运行的时候会给存储在内存中的所有变量都加上标记。然后，它会去掉环境中的变量以及被环境中的变量引用的标记。在此之后再被加上标记的变量将被视为准备删除的变量。
引用计数：
引用计数就是跟踪记录每个值被引用的次数，当这个引用次数变为 0 时，说明这个变量已经没有价值，因此，在在机回收期下次再运行时，这个变量所占有的内存空间就会被释放出来。但这种方法会引起循环引用的问题。

应尽量减少垃圾回收，主动释放内存：
数组：清空数组时，可以将数组的长度设置为 0，以此来达到清空数组的目的
对象：对于不再使用的对象，就将其设置为 null，尽快被回收
函数：在循环中的函数表达式，如果可以复用，尽量放在函数的外面

内存泄露：
无法垃圾回收就是内存泄露

1. 意外的全局变量（使用未声明的变量，而意外的创建了一个全局变量，无法被回收）
2. 被遗忘的计时器或回调函数
3. 脱离 DOM 的引用（获取一个 DOM 元素的引用，而后面这个元素被删除，但这个引用一直都在）
4. 闭包（不合理的使用闭包，从而导致某些变量一直被留在内存当中）

## 防抖和节流

函数防抖是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时
场景：
按钮提交场景：防⽌多次提交按钮，只执⾏最后提交的⼀次
服务端验证场景：表单验证需要服务端配合，只执⾏⼀段连续的输⼊事件的最后⼀次，还有搜索联想词功能

函数节流是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效
场景：
拖拽 缩放 滚动 滑动

实现：
防抖：

```js
function debounce(fn, wait) {
  let timer = null
  // 返回了一个匿名函数作为事件的回调函数
  return function (...rest) {
    let context = this

    /* 如果存在定时器 */
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    timer = setTimeout(() => {
      fn.apply(context, rest)
    }, wait)
  }
}
```

节流：

```js
function throttle(fn, delay) {
  let preTime = Date.now()
  return function (...rest) {
    let context = this
    nowTime = Date.now()
    if (nowTime - preTime >= delay) {
      preTime = Date.now()
      return fn.apply(context, args)
    }
  }
}
// 或
function throttle(fn, delay) {
  let timeout = null
  return function (...rest) {
    let context = this
    if (!timeout) {
      timeout = setTimeout(() => {
        fn.apply(context, rest)
        timeout = null
      }, delay)
    }
  }
}
```

## 判断对象是否为空

1. JSON.stringify 不行，因为会把`{a:()=>{}}`也转为`{}`

   ```js
   let a = {
     x: () => {},
   }
   console.log(JSON.stringify(a)) // {}
   ```

2. for in 有时不行，因为 for in 会遍历整个原型链，需要用 hasOwnProperty()方法过滤掉
3. Object.keys()方法可以，返回一个属性的数组，判断数组长度是否为 0
4. Object.getOwnPropertyNames()方法，返回一个由指定对象的所有自身属性的属性名组成的数组，判断是否长度为 0

这些方法遇到 Symbol 值作为名称的属性，或不可枚举属性，很可能会出问题

```js
let a = {
  [Symbol()]: 'hi',
}
console.log(a) // { [Symbol()]: 'hi' }
console.log(Object.keys(a)) // []
```
