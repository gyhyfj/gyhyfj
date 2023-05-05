# this 指向

:::tip
在一些情形, 改变 this 指向是必要的, 比如调用 Object 的一些方法, 比如 hasOwnProperty

不要从目标对象访问 Object 原型方法!

因为 JavaScript 并没有保护 hasOwnProperty 这个属性名, 最好要直接从顶级对象 Object 来取这个方法, 然后用 call 改变 this 指向
测试发现, 在真机调试时候, 朋友圈打开的单页模式小程序, 直接访问 Object.prototype.hasOwnProperty 会报错, 导致小程序页面没办法渲染 // TODO

在 ECMAScript 5.1 中, 新增了 Object.create, 它支持使用指定的`__proto__`创建对象。Object.create(null)是一种常见的模式, 用于创建将用作映射的对象。当假定对象将包含来自 Object.prototype 的属性时, 这可能会导致错误。该规则防止直接从一个对象调用某些 Object.prototype 的方法。

此外, 对象可以具有属性, 这些属性可以将 Object.prototype 的内建函数隐藏, 可能导致意外行为或拒绝服务安全漏洞。例如, web 服务器解析来自客户机的 JSON 输入并直接在结果对象上调用 hasOwnProperty 是不安全的, 因为恶意客户机可能发送一个 JSON 值, 如{"hasOwnProperty": 1}, 并导致服务器崩溃。

为了避免这种细微的 bug, 最好总是从 Object 调用这些方法
:::

## 改变 this 指向

### Function.prototype.call()

`call()` 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来**调用一个函数**。
即 : 改变默认 this 指向地调用函数
比如 `fn(x,y)`, 执行 `fn.call(a,m,n)`仍是调用了 `fn(x,y)`, 只是这个函数执行的时候它的 `this` 变成了 `a`

```js
function fn(a, b) {
  console.log(this)
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

apply() 方法**调用一个**具有给定 this 值的函数, 以及以一个数组 (或一个类数组对象 ) 的形式提供的参数。
即 : 改变默认 this 指向地调用函数
apply 与 call() 非常相似, 不同之处在于提供参数的方式。apply 使用数组作为第二个参数而不是一个参数列表

示例 :
用 apply 将数组各项添加到另一个数组 : (如果用解构也可以, 就不需要 apply 了 ) (但不能用 concat : 会创建返回一个新数组, 且不改变原数组 )

```js
let a = [1, 2]
let b = [3, 4, 5]
// a.push(a, ...b) // <ref *1> [ 1, 2, [Circular *1], 3, 4, 5 ]
a.push.apply(a, b) // [ 1, 2, 3, 4, 5 ]
// 将数组b作为apply的参数数组, push到数组a中
```

示例 :
求数组的最值 :

```js
let a = [1, 2, 3, 4, 5]

let max = Math.max.apply(null, a) // 5 // 这里不是null是别的什么都行
let min = Math.min.apply(null, a) // 1
```

### Function.prototype.bind()

bind() 方法**创建一个新的函数**, 在 bind() 被调用时, 这个新函数的 this 被指定为 bind() 的第一个参数, 而其余参数将作为新函数的参数, 供调用时使用。
即 : 改变 this 指向地创建一个新函数
bind() 最简单的用法是创建一个函数, 不论怎么调用, 这个函数都有同样的 this 值。用原始的对象创建一个绑定函数, 可以避免 this 指向其他地方
