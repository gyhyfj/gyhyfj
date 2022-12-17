# asserts - is

## 类型守卫

类型保护的意思是，通过 if 等条件语句的判断告诉编译器，我知道某变量的具体类型了，可以放心调用这种类型的方法
普通的方法有：

1. in 关键字 （判断某个成员在对象里之类，是 JS 的运算符，对值进行运算）
2. typeof 关键字
3. instanceof 关键字
4. 自定义类型保护的类型谓词 （自己写一些 isXXX 的函数，里面执行判断逻辑，返回布尔值）

## asserts

以往我们的类型守卫是这样的：

```ts
/* 方式1 只有类型相符才能执行许需要的逻辑 */
function yell(str: any) {
  if (typeof str === 'string') {
    // 借助条件判断，具体化str的类型为string
    return str.toUppercase()
  }
}
/* 方式2 如果类型不符就抛出错误并不再执行需要的逻辑 */
function yell(str) {
  if (typeof str !== 'string') {
    throw new TypeError('str should have been a string.')
  }
  // Error caught!
  return str.toUppercase()
}
```

但如果把这样的条件判断抽离到函数外，编译器就无法具体化其类型，尽管它们的逻辑是一样的：

```ts
function yell(str: any) {
  assert(typeof str === 'string')
  return str.toUppercase()
  // Oops! We misspelled 'toUpperCase'.
  // Would be great if TypeScript still caught this!
}

function assert(condition: any, msg?: string) {
  if (!condition) {
    throw new Error(msg)
  }
}
```

TS3.7 开始，只要给抽离出的检测工具函数使用 asserts 关键字设置返回值类型，就能继续帮助编译器实现类型守卫功能：

> Ultimately the goal of TypeScript is to type existing JavaScript constructs in the least disruptive way. For that reason, TypeScript 3.7 introduces a new concept called “assertion signatures” which model these assertion functions.

```ts
function yell(str) {
  assert(typeof str === 'string')
  return str.toUppercase()
  // Error caught!
}

function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg)
  }
}
```

上面这个例子里，
类型守卫函数添加 asserts condition 返回类型后，只要这个函数能返回（即不抛出错误），编译器就认为后面的区域内， condition（即 typeof str === 'string'） 绝对是 true

还有一种使用 asserts 的实现方式:
类型守卫函数不接收条件判断语句，而是直接接收要守卫类型的变量，借助 is，直接告诉编辑器某个变量必须是某个类型

```ts
function yell(str) {
  assertIsString(str)
  return str.toUppercase()
  // Error caught!
}

function assertIsString(val: any): asserts val is string {
  if (typeof val !== 'string') {
    throw new Error('Not a string!')
  }
}
```

示例：
工具函数，断言接收的参数不是 null 或 undefined

```ts
function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new AssertionError(
      `Expected 'val' to be defined, but received ${val}`
    )
  }
}
/* 如果写成箭头函数，需要这样写： */
const assertIsDefined: <T>(val: T) => asserts val is NonNullable<T> = <T>(
  val: T
) => {
  if (val === undefined || val === null) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`)
  }
}
```

即使调用了这样的函数作为类型守卫，生效的区域还是十分狭窄，比如下文的回调函数、if 语句块等等，就生效不到，意义不是特别大

示例：
工具函数，判断是否是对象类型

```ts
const isObject = (value: unknown): value is Record<string | number, any> =>
  typeof value === 'object' && value !== null // 返回一个布尔值
```
