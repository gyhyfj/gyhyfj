## Action

动作, 是即发即弃的 作用. 它们可以通过三种方式声明:

entry 动作, 进入状态时执行 - 写在某个状态的 entry 节点
exit 动作, 退出状态时执行 - 写在某个状态的 exit 节点
执行转换时, 执行转换的动作 - 以函数形式内联写在事件的 actions 节点, 或以事件名数组形式写在 actions 节点, 但在 createMachine 的 machine options 的 actions 节点定义定义具体实现

状态切换时 action 调用顺序是 先执行 exit, 再执行触发离开的这个事件的 action, 再执行进入的下一个状态的 entry

action 可以集中定义在 createMachine 的第二个参数的 actions 字段, 并在 createMachine 的第一个参数 machine config 内对应位置 通过 string 数组来指定执行的 action
定义的是是一个个回调函数, 接受三个参数 context, event 以及 actionMeta
context 是当前状态机的 context, event 形如`{type: "CLICK"}`是触发这个 action 的事件, actionMeta 是存放`action` `_event`两个字段的对象<!-- TODO -->

## raise

raise() 动作 创建者在内部事件队列中, 将一个事件排入状态图. 这意味着事件会在 解释 (interpret) 的当前“步骤”上立即发送.

```ts
import { createMachine, raise } from 'xstate'

const raiseActionDemo = createMachine({
  id: 'raiseDemo',
  initial: 'entry',
  states: {
    entry: {
      on: {
        STEP: {
          target: 'middle',
        },
        RAISE: {
          target: 'middle',
          // 立即为“middle”调用 NEXT 事件
          actions: raise('NEXT'),
        },
      },
    },
    middle: {
      on: {
        NEXT: { target: 'last' },
      },
    },
    last: {
      on: {
        RESET: { target: 'entry' },
      },
    },
  },
})
```

## send

的 send 方法接受参数:
event: string or event object or event expression
options 可选: id? send ID (用于取消) to? 事件的目标 (默认为 self) delay? 发送事件前的超时时间 (毫秒) , 如果在超时前没有取消事件

send(...) 函数是一个 动作 创建者; 它是一个纯函数, 它只返回一个 动作 对象, 并 不会 命令式地发送一个事件.
