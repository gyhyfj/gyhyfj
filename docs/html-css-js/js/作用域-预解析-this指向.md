# 作用域、预解析、this 指向

## 作用域

## 预解析

变量预解析
就是把所有的声明变量提升到当前作用域最前面，不提升赋值操作。

函数预解析
就是把所有的函数声明提升到当前作用域的最前面，不调用函数。

## this 指向

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
window

## 改变 this 指向

## Function.prototype.call()

call() 方法使用一个指定的 this 值和单独给出的一个或多个参数**来调用一个函数**。
比如 fn(x,y)，执行 fn(a,m,n)仍是调用了 fn(x,y)，只是这个函数执行的时候它的 this 变成了 a

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

## Function.prototype.apply()

apply() 方法**调用一个**具有给定 this 值的函数，以及以一个数组（或一个类数组对象）的形式提供的参数。
apply 与 call() 非常相似，不同之处在于提供参数的方式。apply 使用参数数组而不是一组参数列表

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

## Function.prototype.bind()

bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

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

更多：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
