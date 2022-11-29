# Record & Readonly

## Record

```ts
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
  [P in K]: T
}
```

即将 K 中的每个属性([P in K]),都转为 T 类型
示例 1：

```ts
type petsGroup = 'dog' | 'cat' | 'fish'
interface IPetInfo {
  name: string
  age: number
}

type IPets = Record<petsGroup, IPetInfo>

const animalsInfo: IPets = {
  dog: {
    name: 'dogName',
    age: 2,
  },
  cat: {
    name: 'catName',
    age: 3,
  },
  fish: {
    name: 'fishName',
    age: 5,
  },
}
```

示例 2（自己再添加个属性）：

```ts
type petsGroup = 'dog' | 'cat' | 'fish'
interface IPetInfo {
  name: string
  age: number
}

type IPets = Record<petsGroup | 'otherAnamial', IPetInfo>

const animalsInfo: IPets = {
  dog: {
    name: 'dogName',
    age: 2,
  },
  cat: {
    name: 'catName',
    age: 3,
  },
  fish: {
    name: 'fishName',
    age: 5,
  },
  otherAnamial: {
    name: 'otherAnamialName',
    age: 10,
  },
}
```

示例 3：
用了 reduce 的特性，遍历了一下数据，然后将所有的方法体放在一个对象中，最终结果用 httpMethods 接受，再将 httpMethods 对外暴露出去，那么外面就可直接调用了

```ts
enum IHttpMethods {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PUT = 'put',
}

const methods = ['get', 'post', 'delete', 'put']

interface IHttpFn {
  <T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
}

type IHttp = Record<IHttpMethods, IHttpFn>

const httpMethods: IHttp = methods.reduce((map: any, method: string) => {
  map[method] = (url: string, options: AxiosRequestConfig = {}) => {
    const { data, ...config } = options
    return (axios as any)
      [method](url, data, config)
      .then((res: AxiosResponse) => {
        if (res.data.errCode) {
          //todo somethins
        } else {
          //todo somethins
        }
      })
  }
  return map
}, {})

export default httpMethods
```

## Readonly

将所有属性变为只读
将所有只读属性（如果有）变为非只读

```ts
type Readonly<T> = {
  readonly [K in keyof T]: T[K]
}

type ToMutable<T> = {
  -readonly [K in keyof T]: T[K]
}
```

示例：（除了接口的成员外，对数组也同样生效）

```ts
type Obj = typeof obj
// type Obj = {
//   name: string;
//   age: number;
// }

type ReadonlyObj = Readonly<Obj>
// type ReadonlyObj = {
//   readonly name: string;
//   readonly age: number;
// }

type MutableObj = ToMutable<ReadonlyObj>
// type MutableObj = {
//   name: string;
//   age: number;
// }

type Test = {
  readonly name: string
  age: number
}

type MutableTest = ToMutable<Test>

type Arr = readonly [1]
type MutableArr = ToMutable<Arr>
// type MutableArr = [1]
```
