# Proxy & Reflect

## Proxy

Proxy 是一个构造函数，用于创建一个对象的代理，从而实现对基本操作的拦截

const p = new Proxy(target, handler)

target 是需要代理的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
handler 是对目标对象的劫持，成员是各个处理函数，也叫捕获器（trap）。

一共有 13 种拦截操作：

1. get(target, propKey, receiver)：拦截对象属性的读取
2. set(target, propKey, value, receiver)：拦截对象属性的设置，返回一个布尔值
3. has(target, propKey)：拦截 propKey in proxy 的操作，返回一个布尔值
4. deleteProperty(target, propKey)：拦截`delete proxy[propKey]`的操作，返回一个布尔值
5. ownKeys(target)：拦截 Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in 循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
6. getOwnPropertyDescriptor(target, propKey)：拦截 Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象
7. defineProperty(target, propKey, propDesc)：拦截 Object.defineProperty(proxy, propKey, propDesc)、Object.defineProperties(proxy, propDescs)，返回一个布尔值
8. preventExtensions(target)：拦截 Object.preventExtensions(proxy)，返回一个布尔值
9. getPrototypeOf(target)：拦截 Object.getPrototypeOf(proxy)，返回一个对象。
10. isExtensible(target)：拦截 Object.isExtensible(proxy)，返回一个布尔值。
11. setPrototypeOf(target, proto)：拦截 Object.setPrototypeOf(proxy, proto)，返回一个布尔值。
12. apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
13. construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如 new proxy(...args)

## Reflect

Reflect 是一个对象, 是 ES6 为了操作对象而提供的新 API

设计目的是：

1. 将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty），放到 Reflect 对象上。现阶段，某些方法同时在 Object 和 Reflect 对象上部署，未来的新方法将只部署在 Reflect 对象上。
2. 修改某些 Object 方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误
3. 让 Object 操作都变成函数行为。某些 Object 操作是命令式，如 in 和 delete
4. Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为。不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取默认行为。

Reflect 一共有 13 种静态方法

- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target, prototype)
