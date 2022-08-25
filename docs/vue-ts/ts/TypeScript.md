# TypeScript

> npm i typescript -g
> npm i ts-node -g
> npm i nodemon -g

## 概念

1. TypeScript 是添加了类型系统的 JavaScript, 是 JavaScript 的超集. TypeScript 的类型系统，在很大程度上弥补了 JavaScript 的缺点
2. TypeScript 是静态类型
   > 类型系统按照「类型检查的时机」来分类
   > 动态类型是指在运行时才会进行类型检查, 所以这种语言的类型错误往往会导致运行时出错 (比如没有编译阶段的 JavaScript, 比如 Python)
   > 静态类型是指编译阶段就能确定每个变量的类型, TypeScript 会先编译为 JavaScript 再运行, 在编译阶段就运行类型检查
3. TypeScript 是弱类型
   > 按是否允许隐式类型转换, 来区分强类型和弱类型
   > 因为 TypeScript 是完全兼容 JavaScript 的, 不会修改 JavaScript 运行的特性, 所以它们都是弱类型

## 安装和编译

1. 需要 Nodejs 环境
2. 安装 TypeScript: `npm i typescript -g` // 检查 ts 版本号 `tsc -v`
3. 编译 ts 文件: `tsc index.ts`
4. 运行编译后的文件: node index.js
5. 简化的编译运行: 安装 ts-node 包 `npm i ts-node -g`, 编译运行 `ts-node index.ts`

## 类型系统

约定了什么类型, 就只能给变量赋值该类型的值
TS 类型分为两类

1. JS 已有类型
   原始类型: number/string/boolean/null/undefined/symbol(ES6)/bigint(ES10)
   对象类型: object ( 包括，数组、对象、函数等对象 )
2. TS 新增类型
   联合类型、自定义类型（类型别名）、接口、元组、字面量类型、枚举、void、any 等

## 原始类型

```ts
/* 1.字符串string */
let nackname: string = 'gyhyfj'
let fullname: string = `${firstname} ${lastname}` // ts也可以用es6模板字符串

/* 2.数字number */
let nanNum: number = NaN
let infNum: number = Infinity
let num: number = 26
let hex: number = 0xf00d // 十六进制
let binary: number = 0b1010 // 二进制
let octal: number = 0o744 // 八进制

/* 3.布尔boolean */
let flag: boolean = false
// let createdBoolean: boolean = new Boolean(1) // 报错！返回的是一个Boolean对象
// let createdBoolean: Boolean = new Boolean(1) // 正确
// let createdBoolean: boolean = Boolean(1) // 正确，返回值是boolean类型

/* 4.空值void undefinede null */
let unusable: void = undefined
// 定义为void类型其实不如直接定义为undefined或null
// 如果一个变量被定义为void然后赋值为undefined, 那么后续就不能再被赋值为void. 反之亦然
let u: undefined = undefined
let n: null = null

// 如果你配置了tsconfig.json 开启了严格模式, 则null和undefined不能赋给void类型
{
    "compilerOptions":{
        "strict": true
    }
}
```

## 对象类型

```ts
/* 2.1 数组类型 */
let numberArr: number[] = [1, 3, 5]
let stringArr: string[] = ['a', 'b', 'c']
// 或数组泛型
let numberArr: Array<number> = [1, 3, 5]
// 多维数组
let data: number[][] = [
  [1, 2],
  [3, 4],
]
// arguments类数组
function Arr(...args: any): void {
  //ts内置对象IArguments 定义
  let arr: IArguments = arguments
}
//其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
interface IArguments {
  [index: number]: any
  length: number
  callee: Function
}

// 数组的一些方法的参数也会受限
numberArr.push(1) // ok, 参数会被约定类型

/* 2.2 函数类型 */
// 在JavaScript中, 有两种常见的定义函数的方式, 函数声明和函数表达式
// function sum(x, y) {
//   return x + y
// }
// let mySum = function (x, y) {
//   return x + y
// }
// 一个函数有输入和输出, 要在TypeScript中对其进行约束, 需要把输入和输出都考虑
// 输入多的或少的参数, 都是不被允许的

function add(n1: number, n2: number): number {
  return n1 + n2
}
let add1 = (n1: number, n2: number): number => {
  return n1 + n2
}
// 注意add1函数的写法, 可以通过编译, 不过事实上, 这段代码只对等号右侧的匿名函数进行了类型定义
// 而等号左边的add1是通过赋值操作进行类型推论而推断出来的
let add2: (n1: number, n2: number) => number = (n1: number, n2: number): number => {
  return n1 + n2
}
// 注意区别TypeScript的=>和ES6的=>, 在TS中, =>用来表示函数的定义, 左侧是输入类型, 需要用括号括起来, 右侧是输出类型
// 而ES6中的=>用于箭头函数

// 注意: 没有返回值,返回类型就是 void
function greet(name: string): void {
  console.log('Hello ' + name)
}

// 用接口定义函数的形状
interface SearchFunc {
  (source: string, subString: string): boolean
}
let mySearch: SearchFunc = function (source: string, subString: string): boolean {
  return source.search(subString) !== -1
}

// 采用函数表达式+接口定义函数的方式时, 对等号左侧进行类型限制, 可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变
// mySearch = function () {
//   return 0
// } // 报错

// 可选参数
// 注意: 可选参数只能出现在参数列表的最后, 即可选参数后面不允许再出现必需参数
function func(a?: number, b?: number): void {
  console.log(a, b)
}

// 参数默认值
// ES6允许给函数的参数添加默认值, TypeScript会将添加了默认值的参数识别为可选参数
// 函数调用时候, 可以缺省给这样参数的赋值
// 在TypeScript中定义这样的函数时, 不受「可选参数必须接在必需参数后面」的限制, 带默认值的参数允许出现在参数列表任意位置

// 剩余参数
// ES6中, 可以使用...rest的方式获取函数中的剩余参数
// function push(array, ...items) {
//   items.forEach(function (item) {
//     array.push(item)
//   })
// }
// 事实上, items是一个数组, 所以TypeScript的写法是:
function push(array: any[], ...items: any[]) {
  items.forEach(function (item) {
    array.push(item)
  })
}
let a: any[] = []
push(a, 1, 2, 3, '4')
console.log(a)

// 重载
function reverse(x: number): number
function reverse(x: string): string
function reverse(x: number | string): number | string | void {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''))
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('')
  }
}
// 这个例子中我们重复定义了多次函数reverse, 前几次都是函数定义, 最后一次是函数实现
// TypeScript会优先从最前面的函数定义开始匹配, 所以多个函数定义如果有包含关系, 需要优先把精确的定义写在前面

/* 2.3 对象类型 */
// TS 中对象的类型就是在描述对象的结构 ( 有什么类型的属性和方法 )
// 如果方法有参数, 就在方法名后面的小括号中指定参数类型
// 在一行代码中指定对象的多个属性类型时, 既可使用 ; 来分隔, 也可用换行分隔
// 方法的类型也可以使用箭头函数形式, 如 sayHi: () => void
let person: { name: string; age: number; sayHi(name: string): void } = {
  name: 'zs',
  age: 26,
  sayHi(name) {
    console.log('Hi ' + name)
  },
}
// 对象的属性或方法也可设置可选类型, 用问号表示
// 注意: 对象的属性或方法必须与对象的类型注解吻合,只可少 (少也只是少规定为可选类型的属性或方法) 不可多
let config: { url?: string; method?: string } = {
  // sayHi() {} 对象的结构中没有 sayHi() 这个方法
}
```

## 内置对象

当你在使用一些常用的方法的时候，TypeScript 实际上已经帮你做了很多类型判断的工作了，
而他们的定义文件，则在[TypeScript 核心库的定义文件](https://github.com/Microsoft/TypeScript/tree/main/src/lib)中

ES 内置对象
Boolean、Number、string、RegExp、Date、Error

```ts
let b: Boolean = new Boolean(1)
console.log(b)
let n: Number = new Number(true)
console.log(n)
let s: String = new String('哔哩哔哩关注小满zs')
console.log(s)
let d: Date = new Date()
console.log(d)
let r: RegExp = /^1/
console.log(r)
let e: Error = new Error('error!')
console.log(e)
```

DOM 和 BOM 内置对象
Document、HTMLElement、Event、NodeList 等

```ts
let body: HTMLElement = document.body
let allDiv: NodeList = document.querySelectorAll('div')
//读取div 这种需要类型断言 或者加个判断应为读不到返回null
let div: HTMLElement = document.querySelector('div') as HTMLDivElement
document.addEventListener('click', function (e: MouseEvent) {})
//dom元素的映射表
interface HTMLElementTagNameMap {
  a: HTMLAnchorElement
  abbr: HTMLElement
  address: HTMLElement
  applet: HTMLAppletElement
  area: HTMLAreaElement
  article: HTMLElement
  aside: HTMLElement
  audio: HTMLAudioElement
  b: HTMLElement
  base: HTMLBaseElement
  bdi: HTMLElement
  bdo: HTMLElement
  blockquote: HTMLQuoteElement
  body: HTMLBodyElement
  br: HTMLBRElement
  button: HTMLButtonElement
  canvas: HTMLCanvasElement
  caption: HTMLTableCaptionElement
  cite: HTMLElement
  code: HTMLElement
  col: HTMLTableColElement
  colgroup: HTMLTableColElement
  data: HTMLDataElement
  datalist: HTMLDataListElement
  dd: HTMLElement
  del: HTMLModElement
  details: HTMLDetailsElement
  dfn: HTMLElement
  dialog: HTMLDialogElement
  dir: HTMLDirectoryElement
  div: HTMLDivElement
  dl: HTMLDListElement
  dt: HTMLElement
  em: HTMLElement
  embed: HTMLEmbedElement
  fieldset: HTMLFieldSetElement
  figcaption: HTMLElement
  figure: HTMLElement
  font: HTMLFontElement
  footer: HTMLElement
  form: HTMLFormElement
  frame: HTMLFrameElement
  frameset: HTMLFrameSetElement
  h1: HTMLHeadingElement
  h2: HTMLHeadingElement
  h3: HTMLHeadingElement
  h4: HTMLHeadingElement
  h5: HTMLHeadingElement
  h6: HTMLHeadingElement
  head: HTMLHeadElement
  header: HTMLElement
  hgroup: HTMLElement
  hr: HTMLHRElement
  html: HTMLHtmlElement
  i: HTMLElement
  iframe: HTMLIFrameElement
  img: HTMLImageElement
  input: HTMLInputElement
  ins: HTMLModElement
  kbd: HTMLElement
  label: HTMLLabelElement
  legend: HTMLLegendElement
  li: HTMLLIElement
  link: HTMLLinkElement
  main: HTMLElement
  map: HTMLMapElement
  mark: HTMLElement
  marquee: HTMLMarqueeElement
  menu: HTMLMenuElement
  meta: HTMLMetaElement
  meter: HTMLMeterElement
  nav: HTMLElement
  noscript: HTMLElement
  object: HTMLObjectElement
  ol: HTMLOListElement
  optgroup: HTMLOptGroupElement
  option: HTMLOptionElement
  output: HTMLOutputElement
  p: HTMLParagraphElement
  param: HTMLParamElement
  picture: HTMLPictureElement
  pre: HTMLPreElement
  progress: HTMLProgressElement
  q: HTMLQuoteElement
  rp: HTMLElement
  rt: HTMLElement
  ruby: HTMLElement
  s: HTMLElement
  samp: HTMLElement
  script: HTMLScriptElement
  section: HTMLElement
  select: HTMLSelectElement
  slot: HTMLSlotElement
  small: HTMLElement
  source: HTMLSourceElement
  span: HTMLSpanElement
  strong: HTMLElement
  style: HTMLStyleElement
  sub: HTMLElement
  summary: HTMLElement
  sup: HTMLElement
  table: HTMLTableElement
  tbody: HTMLTableSectionElement
  td: HTMLTableDataCellElement
  template: HTMLTemplateElement
  textarea: HTMLTextAreaElement
  tfoot: HTMLTableSectionElement
  th: HTMLTableHeaderCellElement
  thead: HTMLTableSectionElement
  time: HTMLTimeElement
  title: HTMLTitleElement
  tr: HTMLTableRowElement
  track: HTMLTrackElement
  u: HTMLElement
  ul: HTMLUListElement
  var: HTMLElement
  video: HTMLVideoElement
  wbr: HTMLElement
}
```

定义 Promise

```ts
function promise(): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    resolve(1)
  })
}

promise().then(res => {
  console.log(res)
})
```

## 接口

```ts
// 在面向对象语言中, 接口(Interfaces)是一个很重要的概念, 它是对行为的抽象, 而具体如何行动需要由类去实现
// 在TypeScript里, 接口的作用就是为这些类型命名和为你的代码或第三方代码定义约定
// 使用接口来定义一种约束，让数据的结构满足约束的格式
// 使用 interface 关键字来声明
// 接口一般首字母大写, 有时候会建议给接口名称加上I前缀
// 注意: 换行分隔各个属性, 那么属性类型后没有分号
interface IPerson {
  name: string
  age: number
  sayHi(name: string): void
  // sayHi: (name: string) => void
}
// 声明接口后, 直接使用接口名作为对象变量的类型
let person1: IPerson = {
  name: 'zs',
  age: 26,
  sayHi(name) {
    console.log('Hi ' + name)
  },
}

// 赋值的时候, 变量的形状必须和接口的形状保持一致
// 定义的变量比接口少了一些属性是不允许的
// 多一些属性也是不允许的

/* 可选属性 */
// 有时我们希望不要完全匹配一个形状, 那么可以用可选属性:
interface xPerson {
  name: string
  age?: number
}

/* 任意属性 */
// 有时候我们希望一个接口允许有任意的属性, 可以用任意属性:
interface xxPerson {
  name: string
  age?: number
  [propName: string]: any // 这里不需要一定写做propName, 类似于形参, 可以随便写, 但后面似乎必须是any
}

let tom: xxPerson = {
  name: 'Tom',
  is: 'cat',
  gender: 'male', // 可以赋予不止一个任意属性
}

// 注意: interface 和 type 都可以给对象指定类型, 但 interface 只能给对象指定类型
// 且使用 type 时候要用等号连接规定和类型名, interface不需要
type IPerson1 = {
  name: string
  age: number
  sayHi(name: string): void
}

/* 只读属性 */
// 时候我们希望对象中的一些字段只能在创建的时候被赋值, 那么可以用readonly定义只读属性:
interface xxxPerson {
  readonly id: number
  name: string
  age?: number
}

// 接口的继承
// 如果两个接口之间有相同的属性或方法, 可以将公共的属性或方法抽离出来, 通过继承来实现复用
interface Point2D {
  x: number
  y: number
}
interface Point3D extends Point2D {
  z: number
}

// 使用 extends 关键字继承 Ponit2D全部属性和方法 且新增属性和方法
```

## 联合类型，交叉类型

```ts
/* 联合类型 */
let arr: (number | string)[] = ['1', 'a']
// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候, 我们只能访问此联合类型的所有类型里共有的属性或方法
function getLength(something: string | number): number {
  // return something.length; //  length不是string和number的共有属性, 会报错
  return 0
}
// 联合类型的变量在被赋值的时候, 会根据类型推论的规则推断出一个类型
// 推断出类型后, 可以且只可以访问它所有的属性和方法

/* 交叉类型 */
interface People {
  age: number,
  height： number
}
interface Man{
  sex: string
}
const xiaoman = (man: People & Man) => {
  console.log(man.age)
  console.log(man.height)
  console.log(man.sex)
}
xiaoman({age: 18,height: 180,sex: 'male'});
```

## any 类型和 unknown 顶级类型

```ts
// 可以对 any 进行任何操作，不需要检查类型
let obj: any = { x: 0 }
obj = 3
// 所有类型都可以分配给 unknown，但 unknown 比 any 更加安全和严格：
// 1. unkonwn 不能赋值给 any/unknown 外的其他类型
let a: unknown = 1
let b: number = a // 报错
// 2. 如果是 any 类型的对象，获取它即使没有的属性不会报错，如果是 unknown，获取存在的属性也不行
let obj: unkonwn = { a: 1, b: 2 }
obj.a
```

## 类型别名（自定义类型）

```ts
// 使用 type 关键字来创建类型别名
// 类型别名常用于联合类型
type CustomArr = (number | string)[]
// 创建类型别名后, 直接使用该类型别名作为变量的类型注解
let arr1: CustomArr = ['1', 'a']
```

## 元组

```ts
// 元组类型是另一种类型的数组, 确切地知道包含多少个元素, 以及特定索引对应的类型
// 为元组类型的变量赋值时候, 需要提供所有指定的项
let position: [number, number] = [3.14, 3.14]
// 对比普通数组写法 let position: number[] = [3.14, 3.14]
// 当添加越界的元素时, 它的类型会被限制为元组中每个类型的联合类型
position.push(3.14)
console.log(position)
```

## 类型推论

```ts
// 一些地方的类型注解可以省略不写
// (1) 声明且初始化变量时候, 后面的代码会严格按赋值时推论的类型看待这个声明的的变量
// (2) 决定函数返回值的时候, 例如返回两个number的相加, 那么返回值必定是number, 可以省略而被推论
// (3) 如果定义的时候没有赋值, 不管之后有没有赋值, 都会被推断成 any 类型而完全不被类型检查
```

## 类型断言

```ts
// 通过类型断言避免警告（读取的属性可能不存在）
const fn = (type: A | B): string => {
  return (type as A).run
}
// 可以使用类型断言来推断他传入的是A接口的值

// as const 对字面值的断言
let names2 = '小满' as const
names2 = 'aa' //无法修改

let a1 = [10, 20] as const
a1.unshift(30) // 错误，此时已经断言字面量为[10, 20],数据无法做任何修改

// 用来手动指定一个值的类型
// 语法:  值 as 类型,  或:  <类型>值 (第二种不推荐, 在jsx语法的ts版中不适用), as 类型是一种修饰符, 类似 : 类型
// 用例1: 使用类型断言, 将一个联合类型断言为其中一个类型, 以访问其独有的属性或方法
// 注意: 类型断言只能欺骗编译器, 无法避免运行时的错误, 所以尽量避免断言后调用方法或引用深层属性
// 用例2: 将一个父类断言为更加具体的子类, 以调用其属性和方法
// 注意: 如果只是互相继承的类而不是接口, 可以用instanceof实现同样的功能
// 用例3: 将任何一个类型断言为any
// (window as any).foo = 1 // 临时将window断言为any, 添加一个属性foo
// 注意: 将一个变量断言为any是解决TypeScript中类型问题的最后一个手段, 我们需要在类型的严格性和开发的便利性之间掌握平衡
// 用例4: 将any断言为一个具体的类型
// 遇到any类型的变量时, 我们可以选择无视它, 任由它滋生更多的any
// 我们也可以选择改进它, 通过类型断言及时的把 any 断言为精确的类型, 亡羊补牢, 使我们的代码向着高可维护性的目标发展
// 例如调用某个吃any吐any的函数, 可以调用完后立即将它断言为一个类型
// const tom=fooFunc('tom') as Cat
// 注意: 并不是任何一个类型都可以被断言为任何另一个类型, 只有他们能一方兼容另一方才可以

// 双重断言
// as any as Cat 可以先断言any再断言为其他任何类型, 打破断言限制, 非迫不得已勿用

// 类型断言 vs 类型转换
// 类型断言只会影响TypeScript编译时的类型, 类型断言语句在编译结果中会被删除
// 所以类型断言不是类型转换, 它不会真的影响到变量的类型

// 类型断言 vs 类型声明
// const tom=fooFunc('tom') as Cat
// const tom: Cat=fooFunc('tom') 可以同样解决这个问题, 接下来的代码中tom都变成了Cat类型
// 但两者有区别:
// a断言为b时, a和b有重叠的部分即
// a声明为b时, a必须具备b的所有属性和方法
// 所以类型声明是比类型断言更加严格的
// 所以为了增加代码的质量, 我们最好优先使用类型声明, 这也比类型断言的 as  语法更加优雅

// 类型断言 vs 泛型
// function getCacheData(key: string): any {
//   return (window as any).cache[key];
// }
// interface Cat {
//   name: string;
//   run(): void;
// }
// const tom = getCacheData('tom') as Cat;
// tom.run()
// 我们还有第三种方式可以解决这个问题, 那就是泛型
// function getCacheData<T>(key: string): T {
//   return (window as any).cache[key];
// }
// interface Cat {
//   name: string;
//   run(): void;
// }
// const tom = getCacheData<Cat>('tom');
// tom.run()
// 通过给getCacheData函数添加了一个泛型<T>, 我们可以更加规范的实现对getCacheData返回值
// 的约束, 这也同时去除掉了代码中的any, 是最优的一个解决方案.
```

## 字面量类型

```ts
// 某个特定的字符串也可以作为 TS 中的类型
// 除字符串外, 任意的 JS 字面量 (比如, 对象、数字等) 都可以作为类型使用
let str = 'Hello TS'
const str1 = 'Hello TS'
// str 是一个变量, 类型是 string
// str1 是常量, 类型是 'Hello TS', 一个字面量类型

// 相比于 string 类型, 使用字面量类型更加精确和严谨
// 比如如下函数只能接收传入上下左右四个类型的一个 (用了联合类型), 如: 传入 const a= 'up'
function changeDirection(direction: 'up' | 'down' | 'left' | 'right'): void {
  console.log(direction)
}
```

## 枚举

```ts
// 枚举enum类型用于取值被限定在一定范围内的场景, 比如一周只能有七天, 颜色限定为红绿蓝等
// 枚举中的标识符不能重复
// 功能类似于字面量类型 + 联合类型

// 使用 enum 关键字定义枚举
// 注意: 一般约定枚举名称 / 枚举中的值以大写字母开头
// 注意: 枚举中的值以逗号分隔
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

// 定义好后直接使用枚举名称作为类型注解
function changeDirection1(direction: Direction) {
  console.log(direction)
}

// 枚举成员会被赋值为从 0  开始递增的数字
// 直接通过点 (.) 语法访问枚举的成员
// changeDirection1(Direction.Up) // 打印结果是 0
// 同时也会对枚举值到枚举名进行反向映射
// console.log(Direction['Right']) // 打印结果是 3

// 也可以给枚举中的成员初始化值, 可以有缺省, 若没有全部赋值, 则后面的按前面已赋值的自增
enum Direction1 {
  Up = 2,
  Down,
  Left = 5,
  Right,
}
function changeDirection2(direction: Direction1) {
  console.log(direction)
}
// changeDirection2(Direction1.Up) // 打印结果是 2
// changeDirection2(Direction1.Down) // 打印结果是 3
// changeDirection2(Direction1.Right) // 打印结果是 6

// 也可以给枚举赋值字符串, 称为字符串枚举
// 字符串枚举的每个成员必须有初始值
enum Direction2 {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right',
}

// 注意: 枚举不仅用作类型, 而且枚举成员还有值,
// 所以其他的类型会在编译为 JS 代码时自动移除, 但枚举类型会被编译为 JS 代码
// 可以当做一个命名空间来用了
enum Names {
  TEST = 'TEST',
  BASE = 'NAME',
}
console.log(Names.BASE) // NAME

// 一般情况下, 推荐使用字面量类型 + 联合类型组合的方式, 这样比枚举更直观
```

## 类

```ts
// JavaScript中类的简单介绍:
// 类(Class): 定义了一件事物的抽象特点, 包含它的属性和方法
// 对象(Object): 类的实例, 通过 new  生成
// 面向对象(OOP)的三大特性: 封装、继承、多态
// 封装(Encapsulation): 将对数据的操作细节隐藏起来, 只暴露对外的接口. 外界调用端不需要
// (也不可能)知道细节, 就能通过对外提供的接口来访问该对象, 同时也保证了外界无法任意更改
// 对象内部的数据
// 继承(Inheritance): 子类继承父类, 子类除了拥有父类的所有特性外, 还有一些更具体的特性
// 多态(Polymorphism): 由继承而产生了相关的不同的类, 对同一个方法可以有不同的响应. 比
// 如 Cat 和 Dog 都继承自 Animal, 但是分别实现了自己的 eat 方法. 此时针对某一个实例, 我
// 们无需了解它是 Cat 还是 Dog, 就可以直接调用 eat 方法, 程序会自动判断出来应该如何执行
// eat
// 存取器(getter & setter): 用以改变属性的读取和赋值行为
// 修饰符(Modifiers): 修饰符是一些关键字, 用于限定成员或类型的性质. 比如 public 表示公
// 有属性或方法
// 抽象类(Abstract Class): 抽象类是供其他类继承的基类, 抽象类不允许被实例化. 抽象类中的
// 抽象方法必须在子类中被实现
// 接口(Interfaces): 不同类之间公有的属性或方法, 可以抽象成一个接口. 接口可以被类实现
// (implements). 一个类只能继承自另一个类, 但是可以实现多个接口
// 使用 class 定义类, 使用 constructor 定义构造函数.
// 通过 new 生成新实例的时候, 会自动调用构造函数.

// 类与接口 implements

interface Alarm {
  alert(): void
}

interface Light {
  on(): void
  off(): void
}

class Car implements Alarm, Light {
  alert(): void {
    console.log('car alert')
  }
  on(): void {
    console.log('light on')
  }
  off(): void {
    console.log('light off')
  }
}
// 上例中Car实现了Alarm和Light接口, 技能报警, 也能开关车灯

// 接口继承类(常见语言中是不可以的, 但TypeScript可以)
// 不推荐这样
class Point {
  x: number
  y: number
  // TypeScript不允许直接在constructor定义变量，需要在constructor上面先声明
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}
interface Point3d extends Point {
  z: number
} // 也成功创建了一个类, 但不推荐
let point3d: Point3d = { x: 1, y: 2, z: 3 }

/* 类的修饰符 public private protected */
// public 修饰符 可以让你定义的变量 内部访问 也可以外部访问 如果不写默认就是public
// protected 修饰符 代表定义的变量私有的只能在内部和继承的子类中访问 不能在外部访问
// private 修饰符 代表定义的变量私有的只能在内部访问 不能在外部访问

/* static静态属性和方法 */
// 用static定义的属性，不可以通过this去访问，只能通过类名去调用
// static静态函数，同样也是不能通过this去调用，也是通过类名去调用

/* interface定义类 extends一个类，implements多个接口 */
interface PersonClass {
  get(type: boolean): boolean
}

interface PersonClass2 {
  set(): void
  school: string
}

class A {
  name: string
  constructor() {
    this.name = 'zs'
  }
}

class Person extends A implements PersonClass, PersonClass2 {
  school: string
  constructor() {
    super() // 在constructor中必须调用super方法,因为子类没有自己的this对象,而是继承父类的this对象,然后对其进行加工,而super就代表了父类的构造函数
    this.school = 'TSU'
  }
  get(type: boolean): boolean {
    return type
  }
  set() {}
}

/* 抽象类 abstract */
// 如果你写的类实例化之后毫无用处，此时你可以把他定义为抽象类
abstract class A {
  name: string
  constructor(name: string) {
    this.name = name
  }
  print(): string {
    return this.name
  }
  abstract getName(): string
}

class B extends A {
  constructor() {
    super('小满') // 在constructor中必须调用super方法,因为子类没有自己的this对象,而是继承父类的this对象,然后对其进行加工,而super就代表了父类的构造函数
  }
  getName(): string {
    return this.name
  }
}

let b = new B()
console.log(b.getName())
```

## 泛型

```ts
// 1. 泛型是指在定义函数\接口\类的时候, 不预先指定具体类型, 而在使用时候再指定具体类型的一种特性
// 比较下面两段代码:
function createArr(len: number, val: any): Array<any> {
  let result = []
  for (let i = 0; i < len; i++) {
    result[i] = val // err: 不能将类型"any"分配给类型"never"
  }
  return result
}

function createArray<T>(len: number, val: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < len; i++) {
    result[i] = val
  }
  return result
}
// T用来指代任意类型
// 用<>括起来放在参数列表括号前面
// 调用时候可以指定它的具体类型, 也可以不手动指定, 而让类型推论自动推算出来
createArray<string>(3, 'x') // ['x','x','x']
createArray(3, 'x') // ['x','x','x']

// 2. 定义泛型时候, 可以一次定义多个类型参数
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

// 3. 泛型约束
// 在函数内部使用泛型变量的时候,由于事先不知道它是哪种类型,所以不能随意的操作它的属性或方法

// function loggingIdentity<T>(arg: T): T {
//   console.log(arg.length);
//   return arg;
// }
// index.ts(2,19): error TS2339: Property 'length' does not exist on type 'T'
// 上例中, 泛型 T 不一定包含属性 length, 所以编译的时候报错了
// 这时, 我们可以对泛型进行约束, 只允许这个函数传入那些包含 length 属性的变量, 这就是泛型约束
interface Lengthwise {
  length: number
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}
// 上例中, 我们使用了 extends 约束了泛型 T 必须符合接口 Lengthwise 的形状, 也就是必须包含 length 属性
// 此时如果调用 loggingIdentity 的时候, 传入的 arg 不包含 length, 那么在编译阶段就会报错

// 4. 泛型接口
// 可以用接口来定义函数的形状
// 所以也可以用含有泛型的接口来定义函数的形状
interface SearchFunc {
  // 接口重复写了不报错??
  (source: string, subString: string): boolean
}
interface CreateArrayFunc {
  <T>(length: number, value: T): Array<T>
}
let createArray1: CreateArrayFunc
createArray1 = function <T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}
createArray(3, 'x') // ['x', 'x', ']

// 进一步, 可以把泛型参数提前到接口名上
interface CreateArrayFunc2<T> {
  (length: number, value: T): Array<T>
}
let createArray2: CreateArrayFunc2<any>
createArray2 = function <T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}
createArray(3, 'x') // ['x', 'x', 'x']

// 5. 泛型类
// 与泛型接口类似, 泛型也可以用于类的类型定义中
class createSth<T> {
  value: T
  func: (x: T, y: T) => T
}
let myCreateSth = new createSth<number>()

// 泛型参数的默认类型
// 我们可以为泛型中的类型参数指定默认类型
// 当使用泛型时没有在代码中直接指定类型参数, 从实际值参数中也无法推测出时, 这个默认类型就会起作用
function createArray3<T = string>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}
```

## 声明合并，同名函数、接口、类的合并

```ts
// 如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型

// 函数: 之前学习过，我们可以使用重载定义多个函数类型
function reverse1(x: number): number
function reverse1(x: string): string
function reverse1(x: number | string): number | string | undefined {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''))
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('')
  }
}

// 接口: 接口中的属性在合并时会简单的合并到一个接口
// 注意，合并的属性的类型必须是唯一的, 如果重复了但类型不同则会报错
// 接口中方法的合并，与函数的合并一样

// 类: 类的合并与接口的合并规则一致

// TypeScript 参考: https://www.tslang.cn/docs/home.html
```

## 实践

在 onMounted 中获取 DOM 元素，需要断言

```ts
let elem = document.querySelector('#china') as HTMLElement
```

插件：json2ts
获取 json 对象类型：
复制 json 文本，然后在编辑器内键入 `ctrl+alt+v`

使用 ts 写 express 服务器
需要安装额外的包
├── @types/express
├── @types/node
类型从 express 中按需引入
`import express, { Express, Router, Request, Response } from 'express'`
并且在 package.json 的 scripts 节点中配置：` "dev":"ts-node index.ts"`
