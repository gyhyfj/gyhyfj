# TS 总结

## 跳过 ts 检查

只能用单行注释，不支持多行注释的写法

```ts
/* 单行忽略 */
// @ts-ignore

/* 忽略全文 */
// @ts-nocheck

/* 取消忽略全文 */
// @ts-check

/* 跳过eslint检查 */
/* eslint-disable */
const watermark = require('watermark-dom') // @ts-ignore
/* eslint-enable */
```

## interface 和 type 的区别

1.类型别名可以用于其它类型 （联合类型、元组类型、基本类型（原始值）），interface 不支持

```ts
type PartialPointX = { x: number }
type PartialPointY = { y: number }

// union(联合)
type PartialPoint = PartialPointX | PartialPointY

// tuple(元祖)
type Data = [PartialPointX, PartialPointY]

//primitive(原始值)
type Name = Number

// typeof的返回值
let div = document.createElement('div')
type B = typeof div
```

2.interface 可以多次定义，并被视为合并所有声明成员。type 不支持

```ts
interface Point {
  x: number
}
interface Point {
  y: number
}

const point: Point = { x: 1, y: 2 }
```

3.type 能使用 in 关键字生成映射类型，但 interface 不行

```ts
type Keys = 'firstname' | 'surname'

type DudeType = {
  [key in Keys]: string
}

const test: DudeType = {
  firstname: 'Pawel',
  surname: 'Grzybek',
}
```

4.默认导出方式不同

```ts
// inerface 支持在导出同时声明，默认导出 而type必须先声明后导出
export default interface Config {
  name: string
}
// Tips: 同一个js模块只能存在一个默认导出
type Config2 = { name: string }
export default Config2
```

## TS 函数类型

```ts
// 平时常用的这两种一样的写法，函数类型不同
// 所以如果要严格限制handleClick类型为()=>void，则只能用第二种写法
let handleClick = () => count.value++

let handleClick = () => {
  count.value++
}
```
