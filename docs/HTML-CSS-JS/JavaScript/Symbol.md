# Symbol

从根本上防止属性名的冲突, 是一种类似于字符串的数据类型

## 构造

使用 Symbol()
不能能用 new 命令, 因为 Symbol 是原始类型, 不是对象

```ts
const s = Symbol()
typeof s // "symbol"
```

Symbol()函数可以接受一个字符串作为参数, 表示对 Symbol 实例的描述. 这主要是为了在控制台显示, 或者转为字符串时, 比较容易区分
可以通过 description 访问这个描述

```ts
const sym = Symbol('foo')
sym.description // "foo"
```

如果接收一个对象作为参数, 那么会调用这个对象的 toString 方法转成字符串, 然后再生成 Symbol 值

## 使用

### 1. 作为对象的属性名

Symbol 值作为属性名, 遍历对象的时候, 该属性不会出现在 for...in、for...of 循环中, 也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回
由于以 Symbol 值作为键名, 不会被常规方法遍历得到. 我们可以利用这个特性, 为对象定义一些非私有的、但又希望只用于内部的方法

第一种方法是通过对象索引签名添加这个属性
第二种方法是声明对象时, 就通过索引签名的形式添加这个属性
第三种方法是通过 Reflect.defineProperty, 将 Symbol 作为属性名参数传入, 添加到对象上


```ts
let mySymbol = Symbol()

// 第一种写法
let a = {}
a[mySymbol] = 'Hello!'

// 第二种写法
let a = {
  [mySymbol]: 'Hello!',
}

// 第三种写法
let a = {}
Reflect.defineProperty(a, mySymbol, { value: 'Hello!' })

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

### 2. 定义一组互不相等的常量

可以用来消除魔法字符串

```ts
const shapeType = {
  triangle: Symbol(),
  circle: Symbol(),
}
```

## 访问

Object.getOwnPropertySymbols()方法, 可以获取指定对象的所有 Symbol 属性名. 该返回一个数组, 成员是当前对象的所有用作属性名的 Symbol 值
Reflect.ownKeys()方法可以返回所有类型的键名, 包括常规键名和 Symbol 键名.

有时, 我们希望重新使用同一个 Symbol 值, Symbol.for()方法可以做到这一点. 它接受一个字符串作为参数, 然后搜索有没有以该参数作为名称的 Symbol 值. 如果有, 就返回这个 Symbol 值, 否则就新建一个以该字符串为名称的 Symbol 值, 并将其注册到全局.
Symbol.for()与 Symbol()这两种写法, 都会生成新的 Symbol. 它们的区别是, 前者会被登记在全局环境中供搜索, 后者不会
Symbol.for()的这个全局登记特性, 可以用在不同的 iframe 或 service worker 中取到同一个值

```ts
Symbol.for('bar') === Symbol.for('bar') // true
Symbol('bar') === Symbol('bar') // false

iframe = document.createElement('iframe')
iframe.src = String(window.location)
document.body.appendChild(iframe)
iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo') // true
```

## 内置的 Symbol 值

通常会被默认调用, 一般不需要显式地访问

对象的 Symbol.iterator 属性, 指向该对象的默认遍历器方法
对象进行 for...of 循环时, 会调用 Symbol.iterator 方法, 返回该对象的默认遍历器
