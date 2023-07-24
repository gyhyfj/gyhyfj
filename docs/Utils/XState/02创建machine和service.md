# XState

## 建立 machine

调用 createMachine 方法, 传入状态机配置 (machine config)
需要提供:
id 标识状态机
initial 指定这台状态机应该处于的初始状态节点
states 字段定义每个状态

然后, 我们需要向状态节点添加 转换, 写在每个状态的 on 节点

如果有最终状态, 需要标记为最终状态节点, 在状态节点内写上`type: 'final'`字段, 状态机一旦达到这些状态就会终止运行

可以给每个状态添加 tags 字段, 接受字符串或字符串数组
可以给每个状态添加 meta 字段, 接受一个对象作为元数据, 描述该状态节点 相关属性的静态数据
可以给每个状态添加 always 字段, 定义无事件转换

```ts
import { createMachine } from 'xstate'

const lightMachine = createMachine({
  // 初始状态
  initial: 'red',

  // 中间状态
  states: {
    // 不同状态
    red: {
      on: {
        CLICK: 'green', // 事件名 下一个状态
      },
    },
    green: {
      on: {
        CLICK: 'yellow',
      },
    },
    yellow: {
      on: {
        CLICK: 'red',
      },
    },
  },
})

const state0 = lightMachine.initialState // 得到初始状态的State对象
console.log(lightMachine.initial) // red // 初始状态的状态名
const state1 = lightMachine.transition(state0, 'CLICK') // 从state0这个状态通过CLICK事件进入的新的状态的State对象

// State对象 有常用的一个属性value和两个方法matches和nextEvents:
// value 可以拿到當前的狀態
console.log(state0.value) // red
// matches 則可以用來判斷現在是否在某個狀態
console.log(state0.matches('red')) // true
console.log(state1.matches('green')) // true
// nextEvents 則可以拿到該 state 有哪些 events 可以使用
console.log(state0.nextEvents) // ['CLICK']

// 使用transition方法转换状态, 每次都要傳入當前的 state 跟 event 才能做狀態轉換,
// 這是為了讓 transition 保持是一個 Pure Function, 它不會改變 lightMachine 物件的狀態,
// 也方便我們做單元測試
```

createMachine 方法接受第二个参数 (machine option)
该对象有 5 个可选属性:
actions - action 名称到它们的执行的映射
delays - delays 名称与其执行的映射
guards - 转换守卫 (cond) , 名称与其执行的映射
services - 调用的服务 (src) , 名称与其执行的映射
activities (deprecated) - activities 名称与其执行的映射

扩展状态机
可以使用.withContext .withConfig() 扩展现有状态机, 从而得到一个新的状态机 (原状态机对象保持不变)
.withConfig()接受 createMachine 的第二个参数 (machine option)

## Interpret

XState 提供了一個叫 interpret 的 function 可以把一個 machine 實例轉換成一個具有狀態的 service

interpret 得到的 service 具有自己的狀態
调用 start 方法后就会回到初始状态,
然后可以用 send 方法对它传送事件,
还可以用 getSnapshot 方法拿到当前状态快照,
不需要适合可以用 stop 方法关闭

```ts
// interpret 得到的 service 具有自己的狀態
const service = interpret(lightMachine)
service.start() // 启动服务
from(service).subscribe(console.log) // 可以得到一个Observable
// 每次推送一个State对象出去, 如果调用stop则触发complete, 不传值
console.log(service.getSnapshot()) // 是一个State对象
console.log(service.getSnapshot().value) // red // State对象的value
service.send('CLICK') // 触发事件
console.log(service.getSnapshot().value) // green // State对象的value
service.stop() // 关闭服务 // 关闭后nextEvents将会是空数组
```

使用示例:

```tsx
import { createMachine, interpret } from 'xstate'

const enum LIGHT_STATES {
  RED = 'RED',
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
} // 用枚举值的索引签名有一个缺陷, 就是ts编译器无法识别重复字段

const enum LIGHT_EVENTS {
  CLICK = 'CLICK',
}

const lightMachine = createMachine({
  id: 'light-machine',
  // 初始状态
  initial: LIGHT_STATES.RED,

  // 中间状态
  states: {
    // 不同状态
    [LIGHT_STATES.RED]: {
      on: {
        [LIGHT_EVENTS.CLICK]: [LIGHT_STATES.GREEN], // 事件名 下一个状态
      },
    },
    [LIGHT_STATES.GREEN]: {
      on: {
        [LIGHT_EVENTS.CLICK]: [LIGHT_STATES.YELLOW],
      },
    },
    [LIGHT_STATES.YELLOW]: {
      on: {
        [LIGHT_EVENTS.CLICK]: [LIGHT_STATES.RED],
      },
    },
  },

  predictableActionArguments: true,
})
// interpret 得到的 service 具有自己的狀態
const service = interpret(lightMachine)
service.start() // 启动服务

const App = () => {
  return (
    <>
      <button onClick={handleClick} className="bg-slate-500">
        BUTTON
      </button>
    </>
  )
}

const handleClick = () => {
  service.send(LIGHT_EVENTS.CLICK)
  console.log('done: ', service.getSnapshot().value)
}

export default App
```
