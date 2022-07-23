# ES6 的类

类(Class): 定义了一件事物的抽象特点, 包含它的属性和方法
对象(Object): 类的实例, 必须通过 new 生成 `let b = new B()`
面向对象(OOP)的三大特性: 封装、继承、多态

JS 中, 传统的生成实例对象的方法是通过构造函数
ES6 提供了更接近传统语言的写法, 引入 Class 这个概念作为对象的模板.
ES6 的类可以看作只是一个语法糖, 它的绝大部分功能 ES5 都可以做到, 新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已

```js
// 传统的构造函数写法
function Point(x, y) {
  this.x = x
  this.y = y
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')'
}

var p = new Point(1, 2)

// ES6 中类的写法
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')'
  }
}
```

上例中可以看到:

- constructor()方法, 是构造方法, this 关键字代表实例对象
- 除了构造方法, 还可以定义其他方法, 前面不需要加 function 关键字, 方法与方法之间不需要逗号分隔

## JS 中类的本质

```js
typeof Point // "function"
Point === Point.prototype.constructor // true
```

类的数据类型就是函数, 类本身就指向构造函数

```js
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
}
```

因此, 在类的实例上面调用方法, 其实就是调用原型上的方法:

```js
class B {}
const b = new B()

b.constructor === B.prototype.constructor // true
```

## 类的实例

1. 必须通过 new 命令调用 class
2. **实例的属性除非显式定义在其本身（即定义在 this 对象上）, 否则都是定义在原型上（即定义在 class 上）**

```js
Class Point{
  ...
  toString(){
  }
}

let point = new Point()
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
```

3. 类的所有实例共享一个原型对象, 即`p1.__proto__===p2.__proto__`, 这也就意味着可以通过实例的`__proto__`属性为`class`添加方法. 或可以用 `Object.getPrototypeOf` 方法来获取实例对象的原型, 再为其添加属性或方法

```js
class Pointer {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

p = new Pointer(1, 2)
p.__proto__.fuck = () => {
  return 'Oops'
}
Object.getPrototypeOf(p).suck = () => {
  return 'Wew'
}

 //Pointer { x: 1, y: 2 }
] }
] }
 // true
```

4. 用 instanceof 判断是否为某个类的实例 point instanceof Point // true

## getter 与 setter

在 class 的内部可以使用 get 和 set 关键字, 对某个属性设置存值函数和取值函数, **拦截该属性的存取行为**

```js
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter'
  }
  set prop(value) {}
}

let inst = new MyClass()

inst.prop = 123
// setter: 123

inst.prop
// 'getter'
```

## class 表达式

1. 类的数据类型就是函数, 所以类也可以使用表达式的形式定义

```js
const MyClass = class Me {
  XXX() {
    return 0
  }
}
```

上例中,这个类的名字是 Me, 但 Me 只能在 class 内部可用, 指当前类
在 class 外部, 这个类只能用 MyClass 引用
Me 不需要时候可以省略, 写作`const MyClass = class{}`

2. 采用 class 表达式可以写出立即执行的 class

```js
let person = new (class {
  constructor(name) {
    this.name = name
  }

  sayName() {}
})('张三')

person.sayName() // "张三"
```

也就是 `let xxx = new class{}('arg')`, 直接搞出一个实例 xxx

## 注意

1. 类和模块的内部, 默认就是严格模式, 所以不需要使用 use strict 指定运行模式
2. 类不存在变量提升, 因此定义必须在使用前面
3. 由于本质上, ES6 的类只是 ES5 的构造函数的一层包装, 所以函数的许多特性都被 class 继承, 例如 `name` 属性

```js
class Point {}
Point.name // "Point"
```

4. 类的方法内部如果含有 this, 它默认指向类的实例. 一旦单独使用这个方法, 很可能会报错(this 指向 undefined)
5. 4 的解决办法: a) 在构造方法中绑定 this `this.printName = this.printName.bind(this);` b) 使用箭头函数(箭头函数内部的 this 总是指向定义时所在的对象) c) 使用`Proxy` 参考: https://es6.ruanyifeng.com/#docs/class

## 属性的三种访问修饰符: public、private 和 protected

public: 全局的, 公共的
private: 私有的, 只能在类内部使用, 无法在实例化后通过类的实例.属性来访问
protected: 受保护的, 子类可以访问, 其他相当于 private

## readonly

使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值

```js
class Animal{
  readonly name;
  public constructor(name){
    this.name=name
  }
}
```

## abstract

abstract 用于构成抽象类或抽象方法
抽象类不允许被实例化
抽象类的抽象方法必须被子类实现, 如果子类继承了抽象类但没有实现抽象方法, 就会被报错

## 类的继承

class 可以通过 extends 关键字继承, 让子类继承父类的属性和方法。
extends 的写法比 ES5 的原型链继承，要清晰和方便很多。

```js
class Point {}

class ColorPoint extends Point {}
```

下面在 ColorPoint 中加上代码:

```js
class Point {
  /* ... */
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y) // 调用父类的constructor(x, y)
    this.color = color
  }

  toString() {
    return this.color + ' ' + super.toString() // 调用父类的toString()
  }
}
```

其中:

1. super 关键字表示父类的构造函数，用来新建一个父类的实例对象
2. ES6 规定，子类必须在 constructor()方法中调用 super()，否则就会报错。这是因为子类自己的 this 对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，添加子类自己的实例属性和方法。如果不调用 super()方法，子类就得不到自己的 this 对象. 这意味着新建子类实例时，父类的构造函数必定会先运行一次
3. 在子类的构造函数中，只有调用 super()之后，才可以使用 this 关键字，否则会报错。这是因为子类实例的构建，必须先完成父类的继承，只有 super()方法才能让子类实例继承父类。

```js
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color // ReferenceError
    super(x, y)
    this.color = color // 正确
  }
}
```

4. 如果子类没有定义 constructor()方法，这个方法会默认添加，并且里面会调用 super()。也就是说，不管有没有显式定义，任何一个子类都有 constructor()方法, 即:

```js
class ColorPoint extends Point {}

// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args)
  }
}
```

5. 除了私有属性，父类的所有属性和方法，都会被子类继承，其中包括静态方法

6. Object.getPrototypeOf()方法可以用来从子类上获取父类. 然后可以用`===`判断是否是某个类

## super 关键字

super 这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同.

1. super 作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次 super 函数.
   super 虽然代表了父类 A 的构造函数，但是返回的是子类 B 的实例，即 super 内部的 this 指的是 B 的实例
2. super 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类, 而不是父类的原型对象
   由于 super 指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过 super 调用的

```js
class A {
  p() {
    return 2
  }
}

class B extends A {
  constructor() {
    super()
    console.log(super.p()) // 2
  }
}

let b = new B()
```

```js
class Parent {
  static myMethod(msg) {
    console.log('static', msg)
  }

  myMethod(msg) {
    console.log('instance', msg)
  }
}

class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg)
  }

  myMethod(msg) {
    super.myMethod(msg)
  }
}

Child.myMethod(1) // static 1

var child = new Child()
child.myMethod(2) // instance 2
```

## 静态方法

1. 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。
2. 如果在一个方法前，加上 static 关键字，就表示该方法不会被实例继承，而是**只能直接通过类来调用**，这就称为“静态方法”

```js
class Foo {
  static classMethod() {
    return 'hello'
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo()
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

3. 如果静态方法包含 this 关键字，这个 this 指的是类，而不是实例
4. 静态方法可以和非静态方法重名
5. 父类的静态方法，可以被子类继承
6. 静态方法也是可以从 super 对象上调用的

## 实例属性的新写法

实例属性除了定义在 constructor()方法里面的 this 上面，也可以定义在类的最顶层

```js
class IncreasingCounter {
  constructor() {
    this._count = 0
  }
  get value() {
    console.log('Getting the current value!')
    return this._count
  }
  increment() {
    this._count++
  }
}
```

实例属性 `this._count` 定义在 `constructor()` 方法里面。另一种写法是，这个属性也可以定义在类的最顶层，其他都不变

```js
class IncreasingCounter {
  _count = 0
  get value() {
    console.log('Getting the current value!')
    return this._count
  }
  increment() {
    this._count++
  }
}
```

上面代码中，实例属性\_count 与取值函数 value()和 increment()方法，处于同一个层级。这时，不需要在实例属性前面加上 this

这种新写法的好处是，所有实例对象自身的属性都定义在类的头部，看上去比较整齐，一眼就能看出这个类有哪些实例属性。

## 静态属性

静态属性指的是 Class 本身的属性，即 Class.propName，而不是定义在实例对象（this）上的属性。

```js
// 先定义一个类
class Foo {}

// 再给类加个属性, 通过赋值处理
Foo.prop = 1

Foo.prop // 1
```
