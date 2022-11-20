# 作用域、预解析、this 指向

## 作用域与闭包

闭包提供了一个在外部访问另一个函数内部局部变量的方式。
闭包就是一个函数引用另一个函数的变量，因为变量被引用着所以不会被回收，因此可以用来封装一个私有变量。这是优点也是缺点，不必要的闭包只会增加内存消耗。

JavaScript 变量有不同的层级
私有变量可以用到闭包
嵌套的函数可以访问上一层的函数变量

执行上下文
在执行 js 代码前会创建执行上下文
全局上下文：变量定义，函数声明
函数上下文：变量定义，函数声明，this，arguments

```js
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i++)
  }, 4000)
}
console.log(i) // 5 5 6 7 8 9
```

## 预解析

变量预解析
就是把所有的声明变量提升到当前作用域最前面，不提升赋值操作。

函数预解析
就是把所有的函数声明提升到当前作用域的最前面，不调用函数。

## this 指向汇总

1.构造函数
指向实例对象（调用构造函数时生成的那个实例对象），原型对象里面的方法也指向实例对象

```js
function Point(x, y) {
  this.x = x
  this.y = y
  console.log(this)
}

let p = new Point(1, 2) // Point { x: 1, y: 2 }
```

2.对象方法
若对象中的方法为普通函数写法，则 this 指向该方法所属对象；
若为箭头函数，则 this 指向为 window

3.事件绑定函数
绑定事件对象

4.箭头函数
外层作用域中的 this（且 this 指向不可改变）

5.定时器、立即执行函数、普通函数
全局对象

## 改变 this 指向

:::tip
在一些情形，改变 this 指向是必要的，比如调用 Object 的一些方法，比如 hasOwnProperty

不要从目标对象访问 Object 原型方法!

因为 JavaScript 并没有保护 hasOwnProperty 这个属性名，最好要直接从顶级对象 Object 来取这个方法，然后用 call 改变 this 指向
测试发现，在真机调试时候，朋友圈打开的单页模式小程序，直接访问 Object.prototype.hasOwnProperty 会报错，导致小程序页面没办法渲染 // TODO

在 ECMAScript 5.1 中，新增了 Object.create，它支持使用指定的`[[Prototype]]`创建对象。Object.create(null)是一种常见的模式，用于创建将用作映射的对象。当假定对象将包含来自 Object.prototype 的属性时，这可能会导致错误。该规则防止直接从一个对象调用某些 Object.prototype 的方法。

此外，对象可以具有属性，这些属性可以将 Object.prototype 的内建函数隐藏，可能导致意外行为或拒绝服务安全漏洞。例如，web 服务器解析来自客户机的 JSON 输入并直接在结果对象上调用 hasOwnProperty 是不安全的，因为恶意客户机可能发送一个 JSON 值，如{"hasOwnProperty": 1}，并导致服务器崩溃。

为了避免这种细微的 bug，最好总是从 Object 调用这些方法
:::

### Function.prototype.call()

`call()` 方法使用一个指定的 `this` 值和单独给出的一个或多个参数**来调用一个函数**。
即：改变默认 this 指向地调用函数
比如 `fn(x,y)`，执行 `fn.call(a,m,n)`仍是调用了 `fn(x,y)`，只是这个函数执行的时候它的 `this` 变成了 `a`

```js
function fn(a, b) {
  console.log(this) // Object [global]{...}
  console.log(a + b)
}

// fn(1, 2) // console.log(this) // Object [global]{...} 3

let obj = {
  name: 'zs',
  age: 10,
}

fn.call(obj, 1, 2) // console.log(this) // { name: 'zs', age: 10 } 3
```

### Function.prototype.apply()

apply() 方法**调用一个**具有给定 this 值的函数，以及以一个数组（或一个类数组对象）的形式提供的参数。
即：改变默认 this 指向地调用函数
apply 与 call() 非常相似，不同之处在于提供参数的方式。apply 使用数组作为第二个参数而不是一个参数列表

示例：
用 apply 将数组各项添加到另一个数组：
如果用 concat 则会创建返回一个新数组，用 apply 则不必写一个循环

```js
let a = [1, 2]
let b = [3, 4, 5]
// a.push(a, ...b) // <ref *1> [ 1, 2, [Circular *1], 3, 4, 5 ]
a.push.apply(a, b) // [ 1, 2, 3, 4, 5 ]
// 将数组b作为apply的参数数组，push到数组a中
```

示例：
求数组的最值：

```js
let a = [1, 2, 3, 4, 5]

let max = Math.max.apply(null, a) // 5 // 这里不是null是别的什么都行
let min = Math.min.apply(null, a) // 1
```

### Function.prototype.bind()

bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
即：改变 this 指向地创建一个新函数
bind() 最简单的用法是创建一个函数，不论怎么调用，这个函数都有同样的 this 值。用原始的对象创建一个绑定函数，可以避免 this 指向其他地方

```js
/* 在浏览器中，this 指向全局的 "window" 对象 */
/* 定义一个全局变量x */
this.x = 9 // this 是 {x: 9}

/* 定义一个对象 */
let modulex = {
  x: 0,
  get: function () {
    return this.x
  },
}

let re = modulex.get() // 0

/* 直接将方法从对象中拿出来，然后调用 */
let ezFunc = modulex.get
ezFunc() // undefined??不应该是9吗 TODO

/* 用原始的对象创建一个绑定函数 */
let bindFunc = modulex.get.bind(modulex)
bindFunc() // 0
console.log(bindFunc())
```

## 实践-数组的冒泡排序

首先是一个数组的冒泡排序

```js
let arr = [5, 6, 6, 7, 1, 2, 3, 4]
const compare = (x, y) => (x - y < 0 ? true : false)

const sortFn = (array, compare) => {
  let len = array.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (!compare(array[j], array[j + 1])) {
        let tmp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = tmp
      }
    }
  }
}

sortFn(arr, compare)
console.log(arr) // [1, 2, 3, 4,  5, 6, 6, 7]
```

如果想通过`arr.sortFn(compare)`排序：
思路：
把 sortFn 方法挂载到 arr 的原型链上
因为`arr.__proto__ === Array.prototype`，所以可以挂载在构造函数`Array`上，把箭头函数改为普通函数，this 自动指向实例对象

```js
let arr = [5, 6, 6, 7, 1, 2, 3, 4]
const compare = (x, y) => (x - y < 0 ? true : false)

function sortFn(compare) {
  let len = this.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (!compare(this[j], this[j + 1])) {
        let tmp = this[j]
        this[j] = this[j + 1]
        this[j + 1] = tmp
      }
    }
  }
}

console.log(arr.__proto__ === this.prototype) // true

Array.prototype.sortFn = sortFn
arr.sortFn(compare)
console.log(arr) // [1, 2, 3, 4,  5, 6, 6, 7]
```
