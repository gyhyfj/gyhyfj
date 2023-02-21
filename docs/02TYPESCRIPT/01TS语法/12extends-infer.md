# extends & infer

## extends

书写泛型的时候，作为对类型参数的约束，`<T extends B>`表示 T 被约束为必须是对 B 的继承/拓展

```ts
T extends object // 表示 T 被限制为对象类型
U extends keyof T // 表示 U 被限制为 T 的键名的字面量联合类型
```

## 条件类型

语法如下，其中 T、U、X 和 Y 这些都是类型占位符：
可以理解为：当类型 T 可以赋值给类型 U 时，那么返回类型 X，否则返回类型 Y

```ts
T extends U ? X : Y
```

https://blog.csdn.net/qq_36380426/article/details/124657643?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166610676116800182118181%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=166610676116800182118181&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-1-124657643-null-null.nonecase&utm_term=%E7%94%A8%E4%BA%86%20TS%20%E6%9D%A1%E4%BB%B6%E7%B1%BB%E5%9E%8B%EF%BC%8C%E5%90%8C%E4%BA%8B%E7%9B%B4%E5%91%BC%20YYDS&spm=1018.2226.3001.4450

## infer

infer 是 TypeScript 新增到的关键字，充当占位符，通常用法是 infer R，R 表示待推推断的类型

infer 只能在条件类型的 extends 子句中使用，同时 infer 声明的类型变量只在条件类型的 true 分支中可用

infer 是 inference 的缩写，用于构造类型工具，进行类型提取，类型系统在获得足够的信息后，就能将 infer 后跟随的类型参数推导出来

类型工具示例：

```ts
// 获取数组中的元素的类型
type Flatten<T> = T extends Array<infer U> ? U : T
type Elem = Flatten<string[]> // type Elem = string
// 也可以这样写来获取数组中元素的类型
type Elem = typeof arr[number]

// 获取函数的返回值类型
type GetReturnType<T> = T extends (...args: any[]) => infer U ? U : T
type Fn = () => string
type Return = GetReturnType<Fn> // type Return = string

// 获取数组中的某个特定元素
type Arr = [1, 2, 3] // 字面量类型
type First<T extends any[]> = T extends [infer first, ...any[]] ? first : T
type a = First<Arr> // type a = 1

type Second<T extends any[]> = T extends [
  infer first,
  infer second,
  infer third
]
  ? second
  : T
type b = Second<Arr> // type b = 2

type Last<T extends any[]> = T extends [...any[], infer last] ? last : T
type c = Last<Arr> // type c = 3

// 剔除数组中的某个元素，获取数组中的剩余元素
type Arr = [1, 2, 3] // 字面量类型
type Pop<T extends any[]> = T extends [...infer rest, unknown] ? rest : T // 这里最后一个unknown也可以写成 infer last，但不可以是不符合extends的，比如never
type Part = Pop<Arr> // type type Part = [1, 2]

// 将元组类型转为联合类型
type TupleToUni<T> = T extends Array<infer E> ? E : never
type TTuple = [string, number]
type ToUnion = TupleToUni<TTuple> // string | number

// 去除元组之类的readonly
type ToMutable<T> = { -readonly [Key in keyof T]: T[Key] }
```

infer 递归：

已有类型 `type Arr = [1, 2, 3, 4]`，希望通过类型工具得到一个新类型 `type NewArr = [4,3,2,1]`

具体思路：首先使用泛型约束，约束只能传入数组类型的东西，然后从数组中提取第一个，放入新数组的末尾，反复此操作，形成递归，满足结束条件返回该类型

```ts
type Arr = [1, 2, 3, 4]
type ReveArr<T extends any[]> = T extends [infer First, ...infer rest]
  ? [...ReveArr<rest>, First]
  : T
type NewArr = ReveArr<Arr> // type Res = [4, 3, 2, 1]
```

https://pingan8787.blog.csdn.net/article/details/124791356?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-124791356-blog-122760342.t5_landing_title_tags&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-124791356-blog-122760342.t5_landing_title_tags&utm_relevant_index=1
