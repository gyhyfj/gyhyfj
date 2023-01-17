# vitest

```ts
class Pointer {
  constructor(public x: number, public y: number) {}
}

const p = new Pointer(1, 2)
const q = new Pointer(1, 2)

it('test', () => {
  expect(p).toBe(q) // toBe 引用类型要完全地址一致
  expect(p).toEqual({ x: 1, y: 2 }) // toEqual 递归比较结构和数值 但要求类型一致，即使值相同，object就不能等同于构造函数的实例
  expect(p).toStrictEqual({ x: 1, y: 2 }) // toStrictEqual 其实是限制类型也相等的二连等
})
```
