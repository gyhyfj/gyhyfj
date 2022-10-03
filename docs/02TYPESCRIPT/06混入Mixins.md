# 混入 Mixins

## 对象混入

使用 es6 的`Object.assign`合并多个对象

```ts
interface Name {
  name: string
}
interface Age {
  age: number
}
interface Sex {
  sex: number
}

let people1: Name = { name: '小满' }
let people2: Age = { age: 20 }
let people3: Sex = { sex: 1 }

// 此时 people 会被推断成一个交差类型 Name & Age & sex
const people = Object.assign(people1, people2, people3)
```

## 类的混入

意义：
解决 TS 中继承一次只能继承一个类的问题

```ts
class Name {
  name: string = '天然气'
  getName(): void {
    console.log(`${this.name}`)
  }
}
class Age {
  age: number = 19
  getAge(): void {
    console.log(`${this.age}`)
  }
}
// ts是单继承
// 没使用 extends 而是使用 implements，把类当成了接口
class Person implements Name, Age {
  name: string
  age: number
  // 声明占位属性
  getName: () => void
  getAge: () => void
}
// 帮助函数
function Mixins(target: any, from: any[]) {
  from.forEach(item => {
    // Object.getOwnPropertyNames() 可以获取对象自身的属性，除去他继承来的属性
    // 对它所有的属性遍历
    Object.getOwnPropertyNames(item.prototype).forEach(name => {
      target.prototype[name] = item.prototype[name]
    })
  })
}

Mixins(Person, [Name, Age])
let pe = new Person()

pe.getName() // 天然气
```
