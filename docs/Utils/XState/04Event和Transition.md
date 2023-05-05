## Event

事件不一定导致状态转换，但一定是导致状态机状态转换的原因

定义事件：
事件是具有 type 属性的对象 {type:'CLICK'} // 约定是使用 CONST_CASE 作为事件名称
如果事件对象只有 type 属性，可以直接简写成字符串类型

发送事件：
machine 的 transition 方法
或 service 的 send 方法

```ts
let nextState = lightMachine.transition(initialState, 'TIMER') // 字符串事件
console.log(nextState.value)
// => 'yellow'

nextState = lightMachine.transition(nextState, { type: 'TIMER' }) // 事件对象
```

许多原生事件，例如 DOM 事件，是兼容的，可以直接与 XState 一起使用，通过在 machine config 的 on 属性上指定事件类型
再用 service.send(event)方法直接 send event 给 machine <!-- TODO -->

always <!-- TODO -->

## Transition

状态转换定义在每个状态的 on 属性的事件上

状态转换可以定义为：
一个字符串，例如 RESOLVE: 'resolved'
具有 target 属性的对象，例如 RESOLVE: { target: 'resolved' },
转换对象数组，用于并行状态

状态转换方法：
machine 的 transition 方法是个纯函数 接受两个参数
state - 基于哪个状态转换
event - 导致转换的事件
返回的是一个新的 State 对象，转换后得到的结果

选择启用转换：
当且仅当：
它在与当前状态值匹配的 状态节点 上定义
转换守卫（cond 属性）得到条件满足（为 true）
它不会被更具体的 转换 所取代

在 分层状态机 中，转换的优先级取决于它们在树中的深度； 更深层次的转换更具体，因此具有更高的优先级。 这与 DOM 事件的工作方式类似：如果单击按钮，则直接在按钮上的单击事件处理程序比 window 上的单击事件处理程序更具体。

事件描述符：
也就是状态的 on 属性下定义的成员
通常，这等效于发送到状态机的 event 对象上的 event.type 属性
但也有两种额外的：
Null 事件描述 ("")，不匹配任何事件（即 "null" 事件），并表示进入状态后立即进行的转换
通配符事件描述 ("\*")，如果事件没有被状态中的任何其他转换显式匹配，则匹配任何事件

自转换：
自转换是当一个状态转换到自身时，它 可以 退出然后重新进入自身。自转换可以是 内部 或 外部 转换：
内部转换 不会退出也不会重新进入自身，但可能会进入不同的子状态。
外部转换 将退出并重新进入自身，也可能退出/进入子状态。

内部转换：
内部转换是通过指定 相对目标（例如，'.left'的写法，状态名前面加上一个点表示路径关系）或通过在转换上显式设置 { internal: true } 来创建的
具有 { target: undefined } （或无 target，定义时候事件上没写 target）的转换也是内部转换：

外部转换：
默认情况下，转换是外部的，所以内部转换才要用 internal 字段。但任何转换只要显式设置 { internal: false }，即使是点开头写法的内部转换，也会变成外部转换

无事件转换：
在状态节点的 always 属性上定义
无事件转换，是当状态机处于定义的状态，并且其 cond 守卫为 true 时 始终进行 的转换。 他们被检查：
：立即进入状态节点
：每次状态机接收到一个可操作的事件（无论该事件是触发内部转换还是外部转换）

```ts
const gameMachine = createMachine(
  {
    id: 'game',
    initial: 'playing',
    context: {
      points: 0,
    },
    states: {
      playing: {
        // 无事件转换 两种触发方式：
        // 如果条件满足，将在进入 'playing' 状态或接收到 AWARD_POINTS 事件后立即转换为 'win' 或 'lose'。
        always: [
          { target: 'win', cond: 'didPlayerWin' },
          { target: 'lose', cond: 'didPlayerLose' },
        ],
        on: {
          // 自转换
          AWARD_POINTS: {
            actions: assign({
              points: 100,
            }),
          },
        },
      },
      win: { type: 'final' },
      lose: { type: 'final' },
    },
  },
  {
    guards: {
      didPlayerWin: (context, event) => {
        // 检测玩家是否赢了
        return context.points > 99
      },
      didPlayerLose: (context, event) => {
        // 检测玩家是否输了
        return context.points < 0
      },
    },
  }
)

const gameService = interpret(gameMachine)
  .onTransition(state => console.log(state.value))
  .start()

// 仍处于 'playing' 状态，因为不满足瞬间转换条件
// => 'playing'

// 当发送“AWARD_POINTS”时，会发生自我转换到“PLAYING”。
// 由于满足“didPlayerWin”条件，因此会进行到“win”的瞬间转换。
gameService.send({ type: 'AWARD_POINTS' })
// => 'win'
```

通配符转换：
通配符转换 在进入状态节点时不被检查。 无事件转换是，在做任何其他事情之前（甚至在进入动作的守卫判断之前）的转换。
无事件转换的重新判断，由任何可操作的事件触发。 通配符转换的重新判断，仅由与显式事件描述符不匹配的事件触发。
每当状态处于活动状态时都会立即进行瞬态转换，而通配符转换仍然需要将某些事件发送到其状态才能触发。

禁止转换：
通过将 target 明确指定为 undefined 来进行禁止转换。 这与将其指定为没有操作的内部转换相同

多个目标：
事件导致转换到多个状态（并行状态机）
事件对象的 target 可以是一个字符串数组<!-- TODO -->

通配描述符：
如果是普通写法，则作为找不到事件时的 fallback 来执行，
除非写在数组中，转换的顺序决定了选择哪个转换。

```ts
// 对于 SOME_EVENT，将显式转换到“here”
on: {
  "*": "elsewhere",
  "SOME_EVENT": "here"
}

// 对于 SOME_EVENT，将采用通配符转换为“elsewhere”
on: [
  { event: "*", target: "elsewhere" },
  { event: "SOME_EVENT", target: "here" },
]
```
