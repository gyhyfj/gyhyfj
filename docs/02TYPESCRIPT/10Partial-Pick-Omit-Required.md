# Partial & Pick & Omit & Required

## Partial

```ts
/**
 * Make all properties in T optional
  将T中的所有属性设置为可选
 */
type Partial<T> = {
  [P in keyof T]?: T[P]
}
// keyof 将一个接口对象的全部属性取出来变成联合类型
// in 我们可以理解成for-in，P是key，遍历keyof T联合类型的每一项
// ?这个操作就是将每一个属性变成可选项
// T[P] 索引访问操作符，与JS中访问属性值的操作类似
```

```ts
// 使用前：
type Person = {
  name: string
  age: number
}

type p = Partial<Person>

//  相当于：
type p = {
  name?: string | undefined
  age?: number | undefined
}
```

## Pick

```ts
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

```ts
interface Person {
  name: string
  age: number
  id: number
  sex: 0 | 1
}

// 问女生年纪不太礼貌，所以我们不需要 age 这个属性
type Woman = Pick<Person, 'name' | 'id'>

// 此时 Woman 等效于 Female
interface Female {
  name: string
  id: number
}
```

## Omit

```ts
type Omit<T, K extends string | number | symbol> = {
  [P in Exclude<keyof T, K>]: T[P]
}
```

Omit 与 Pick 作用相似，只不过 Omit 是：以一个类型为基础支持剔除某些属性，然后返回一个新类型

```ts
interface User {
  id: number
  name: string
  age: number
  sex: 0 | 1
  tel: number
}

type EditUser = Omit<User, 'id' | 'name'> // 就是在 User 的基础上，去掉 id 和 name 属性
```

## Required

```ts
/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P]
}
```

将类型中所有选项变为必选，移除允许 undefined 这样的类型

```ts
type Person = {
  name?: string | undefined
  age?: number | undefined
}

type p = Required<Person>

// 相当于
type p = {
  name: string
  age: number
}
```
