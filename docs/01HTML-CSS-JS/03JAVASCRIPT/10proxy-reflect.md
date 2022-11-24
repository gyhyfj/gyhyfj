# Proxy & Reflect

https://xiaoman.blog.csdn.net/article/details/122740383

## Proxy

Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义。

const p = new Proxy(target, handler)

target 是需要代理的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。

handler 是包含各个捕获器（trap）的对象。如果为空对象，就只有 set、get 这两个默认捕获器，并且不会有过多的操作，get 捕获器就直接返回访问属性的值，set 捕获器就将新的值赋值给访问属性。

## Reflect

Reflect 是一个对象，字面意思是"反射"。
它主要提供了很多操作 JavaScript 对象的方法，有点像 Object 中操作对象的方法。

如果我们有 Object 可以做这些操作，那么为什么还需要有 Reflect 这样的新增对象呢？
这是因为在早期的 ECMA 规范中没有考虑到这种对 对象本身 的操作如何设计会更加规范，所以将这些 API 放到了 Object 上面；但是 Object 作为一个构造函数，这些操作实际上放到它身上并不合适；另外还包含一些类似于 in、delete 操作符，让 JS 看起来是会有一些奇怪的；所以在 ES6 中新增了 Reflect，让我们这些操作都集中到了 Reflect 对象上。

用 Reflect 的好处是
之前的方式是说到底还是在操作原对象，因为都是在用 target、key 等直接去操作，改用 Reflect 就真正意义上不直接操作原对象。
在有的时候 Reflect 会更加有用。比如：使用 Object.freece(obj)将对象冻结后，之前的方式就无法判断出设置值到底是设置成功了还是失败了。而 Reflect 可以有返回值，代表是设置成功还是失败。
