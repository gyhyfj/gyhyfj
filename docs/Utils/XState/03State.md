# State

状态是系统 (例如应用) 在特定时间点的抽象表示

lightMachine.initialState
lightService.getSnapshot() 都能获取到 machine 的 State 对象

State 对象实例是 JSON 可序列化的, 并具有以下属性:
value - 当前状态的值. (例如, {red: 'walk'})
context - 当前状态的 context
event - 触发转换到此状态的事件对象
actions - 要执行的 动作 数组
activities - 如果 活动 开始, 则活动映射到 true, 如果活动停止, 则映射到 false.
history - 上一个 State 实例
meta - 在 状态节点 的元属性上定义的任何静态元数据
done - 状态是否表示最终状态

State 对象自带的一些方法/属性:
state.matches(parentStateValue) 返回布尔值判断是否处在这个状态
如果要匹配多个状态中的一个, 可以在状态值数组上使用 .some()

```ts
const isMatch = [{ customer: 'deposit' }, { customer: 'withdrawal' }].some(
  state.matches
)
```

state.nextEvents 在确定可以采取哪些下一个事件, 以及在 UI 中表示这些潜在事件 (例如启用/禁用某些按钮) 方面很有用

state.changed 指定此 state 是否已从先前状态更改. 在以下情况下, 状态被视为“已更改”:
它的值不等于它之前的值 改变了状态
它有任何新动作 (副作用) 要执行 未必改变了状态
初始状态 (没有历史记录) 将返回 undefined

state.done 指定 state 是否为“最终状态”

state.toStrings()方法返回表示所有状态值路径的字符串数组

```ts
console.log(state.value)
// => { red: 'stop' }

console.log(state.toStrings())
// => ['red', 'red.stop']
```

state.children 是将生成的 服务/演员 ID 映射到其实例的对象. <!-- TODO -->

state.hasTag(tag) 方法, 当前状态配置是否具有给定标签的状态节点

state.can(event)用来确定一个 event 在发送到解释的(interpret)状态机时, 是否会导致状态改变

将 State 对象序列化为字符串 JSON 格式来持久化它
再使用静态 State.create(...) 方法恢复状态
::: code-group

```ts [stringify]
const jsonState = JSON.stringify(currentState)

// 例如: 持久化到 localStorage
try {
  localStorage.setItem('app-state', jsonState)
} catch (e) {
  // 不能保存 localStorage
}
```

```ts [parse]
import { State, interpret } from 'xstate'
import { myMachine } from '../path/to/myMachine'

// 从 localStorage 检索状态定义, 如果 localStorage 为空, 则使用状态机的初始状态
const stateDefinition =
  JSON.parse(localStorage.getItem('app-state')) || myMachine.initialState

// 使用 State.create() 从普通对象恢复状态
const previousState = State.create(stateDefinition)
```

:::

状态节点可以添加元数据
状态机的当前状态, 收集所有状态节点的 .meta 数据, 由状态值表示, 并将它们放在一个对象上作为状态机的 meta
key 是 状态节点 ID
value 是状态节点 .meta 的值

```ts
console.log(failureTimeoutState.meta)
// => {
//   failure: {
//     alert: 'Uh oh.'
//   },
//   'failure.timeout': { // 状态的子状态的元数据
//     message: 'The request timed out.'
//   }
// }
```

如何处理元数据取决于你. 理想情况下, 元数据应 仅 包含 JSON 可序列化值.
