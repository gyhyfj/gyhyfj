/* 1. 原始类型 */

let num: number = 26
let nackname: string = 'gyhyfj'
let flag: boolean = false
// let unusable: void = undefined
// 定义为void类型其实不如直接定义为undefined或null
// 如果一个变量被定义为void然后赋值为undefined, 那么后续就不能再被赋值为void. 反之亦然
let u: undefined = undefined
let n: null = null

/* 2. 对象类型 */
/* 2.1 数组类型 */
let numberArr: number[] = [1, 3, 5]
let stringArr: string[] = ['a', 'b', 'c']
// 或
let numberArr2: Array<number> = [1, 3, 5]
// 数组的一些方法的参数也会根据数组在定义时约定的类型进行限制
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
let add2: (n1: number, n2: number) => number = (
  n1: number,
  n2: number
): number => {
  return n1 + n2
}
// 注意区别TypeScript的=>和ES6的=>, 在TS中, =>用来表示函数的滴定仪, 左侧是输入类型, 需要用括号括起来, 右侧是输出类型
// 而ES6中的=>用于箭头函数

// 注意: 没有返回值,返回类型就是 void
function greet(name: string): void {
  console.log('Hello ' + name)
}

// 用接口定义函数的形状
interface SearchFunc {
  (source: string, subString: string): boolean
}
let mySearch: SearchFunc = function (
  source: string,
  subString: string
): boolean {
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
// TypeScript会优先从最前面的函数定义开始批评, 所以多个函数定义如果有包含关系, 需要优先把精确的定义写在前面

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
// 注意: 对象的属性或方法必须与对象的类型注解吻合,只可少 (规定为可选类型的属性或方法) 不可多
let config: { url?: string; method?: string } = {
  // sayHi() {} 对象的结构中没有 sayHi() 这个方法
}

/* 3. 联合类型 */

let arr: (number | string)[] = ['1', 'a']
// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候, 我们只能访问此联合类型的所有类型里共有的属性或方法
function getLength(something: string | number): number {
  // return something.length; //  length不是string和number的共有属性, 会报错
  return 0
}
// 联合类型的变量在被赋值的时候, 会根据类型推论的规则推断出一个类型
// 推断出类型后, 可以且只可以访问它所有的属性和方法

/* 4. 自定义类型 ( 类型别名 ) */

// 使用 type 关键字来创建类型别名
// 类型别名常用于联合类型
type CustomArr = (number | string)[]
// 创建类型别名后, 直接使用该类型别名作为变量的类型注解
let arr1: CustomArr = ['1', 'a']

/* 5. 接口 */

// 在面向对象语言中, 接口(Interfaces)是一个很重要的概念, 它是对行为的抽象, 而具体如何行动需要由类去实现
// 在TypeScript里, 接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约
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

// 可选属性
// 有时我们希望不要完全匹配一个形状, 那么可以用可选属性:
interface xPerson {
  name: string
  age?: number
}

// 任意属性
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

// 只读属性
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

/* 6. 元组 */

// 元组类型是另一种类型的数组, 确切地知道包含多少个元素, 以及特定索引对应的类型
// 为元组类型的变量赋值时候, 需要提供所有指定的项
let position: [number, number] = [3.14, 3.14]
// 对比普通数组写法 let position: number[] = [3.14, 3.14]
// 当添加越界的元素时, 它的类型会被限制为元组中每个类型的联合类型
position.push(3.14)
console.log(position)

/* 7. 类型推论 */

// 一些地方的类型注解可以省略不写
// (1) 声明且初始化变量时候, 后面的代码会严格按赋值时推论的类型看待这个声明的的变量
// (2) 决定函数返回值的时候, 例如返回两个number的相加, 那么返回值必定是number, 可以省略而被推论
// (3) 如果定义的时候没有赋值, 不管之后有没有赋值, 都会被推断成 any 类型而完全不被类型检查

/* 8. 类型断言 */

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

/* 9. 字面量类型 */

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

/* 10. 枚举 */
// 枚举Wnum类型用于取值被限定在一定范围内的场景, 比如一周只能有七天, 颜色限定为红绿蓝等
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

// 一般情况下, 推荐使用字面量类型 + 联合类型组合的方式, 这样比枚举更直观

/* 11. any */
let obj: any = { x: 0 }
// 尽可能的避免使用 any 类型, 除非临时使用 any 来"避免"书写很长 / 很复杂的类型
// 其他隐式具有 any 类型的情况: 1.声明变量不提供类型也不提供默认值 2.函数参数不加类型
// 声明一个变量为任意值之后, 对它的任何操作, 返回的内容的类型都是任意值

/* 12. 类 */

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
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}
interface Point3d extends Point {
  z: number
} // 也成功创建了一个类, 但不推荐
let point3d: Point3d = { x: 1, y: 2, z: 3 }

/* 13. 泛型 */
// 1. 泛型是指在定义函数\接口\类的时候, 不预先指定具体类型, 而在使用时候再指定具体类型的一种特性
// 比较下面两段代码:
function createArr(len: number, val: any): Array<any> {
  let result = []
  for (let i = 0; i < len; i++) {
    result[i] = val
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

/* 14. 声明合并, 同名函数、接口、类的合并 */
// 如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型

// 函数: 之前学习过，我们可以使用重载定义多个函数类型
function reverse1(x: number): number
function reverse1(x: string): string
function reverse1(x: number | string): number | string {
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
