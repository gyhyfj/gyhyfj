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
12. apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)
13. construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如 new proxy(...args)

## Reflect

Reflect 是一个对象，字面意思是"反射"。
它主要提供了很多操作 JavaScript 对象的方法，有点像 Object 中操作对象的方法。

如果我们有 Object 可以做这些操作，那么为什么还需要有 Reflect 这样的新增对象呢？
这是因为在早期的 ECMA 规范中没有考虑到这种对 对象本身 的操作如何设计会更加规范，所以将这些 API 放到了 Object 上面；但是 Object 作为一个构造函数，这些操作实际上放到它身上并不合适；另外还包含一些类似于 in、delete 操作符，让 JS 看起来是会有一些奇怪的；所以在 ES6 中新增了 Reflect，让我们这些操作都集中到了 Reflect 对象上。

用 Reflect 的好处是
之前的方式是说到底还是在操作原对象，因为都是在用 target、key 等直接去操作，改用 Reflect 就真正意义上不直接操作原对象。
在有的时候 Reflect 会更加有用。比如：使用 Object.freeze(obj)将对象冻结后，之前的方式就无法判断出设置值到底是设置成功了还是失败了。而 Reflect 可以有返回值，代表是设置成功还是失败。
