## context

machine 的 state 是有限且确定的 但 data 是可变的
这些 data 会存储在 context 中

可以在 createMachine 时传入 context 字段，放置 data
然后通过 machine.context 或 service.getSnapshot().context 读到状态机的 context

理想上，context 應該是一個 JS 的 plain object，並且應該可以被序列化

## effect

Fire-and-forget effects:
Actions - 用於單次、離散的 Effect
Activities - 用於連續的 Effect

Invoked effects:
Invoked Promises
Invoked Callbacks
Invoked Observables
invoked Machines

### action

action 是一个回调函数，接受三个参数 context, event 以及 actionMeta
context 是当前状态机的 context，event 形如`{type: "CLICK"}`是触发这个 action 的事件，actionMeta 是存放`action` `_event`两个字段的对象<!-- TODO -->

transition action 可以写在某个状态的 on 节点下的事件的 actions 字段，当这个状态下这个事件被执行时调用
还有两种 action 写在某个状态的 entry 和 exit 节点，在进入和离开这个状态时被调用，
状态切换时 action 调用顺序是 先执行 exit，再执行触发离开的这个事件的 action，再执行进入的下一个状态的 entry

```ts
[LIGHT_STATES.GREEN]: {
  entry: (ctx, ev) => console.log('entry green', ctx, ev), // 进入状态执行
  // exit: (ctx, ev) => console.log('exit green', ctx, ev), // 离开状态执行
  on: {
    [LIGHT_EVENTS.CLICK]: {
      target: [LIGHT_STATES.YELLOW],
      actions: (ctx, ev, actMeta) =>
        console.log('hello yellow', ctx, ev, actMeta),
      // 事件发生时会执行action，叫做 transition actions
      // ctx: context节点内容 ev: {type: "CLICK"}
      // 先执行这个事件的actions，再执行要进入状态的entry
    },
  },
  exit: (ctx, ev) => console.log('exit green', ctx, ev), // 离开状态执行
},

[LIGHT_STATES.YELLOW]: {
  entry: (ctx, ev) => console.log('entry yellow', ctx, ev), // 进入状态执行
  on: {
    [LIGHT_EVENTS.CLICK]: [LIGHT_STATES.RED],
  },
},
```

除了上述的 inline 写法（不推荐）外，
action 可以集中定义在 createMachine 的第二个参数的 actions 字段，并在 createMachine 的第一个参数 machine config 内对应位置 通过 string 数组来指定执行的 action

```ts
[LIGHT_STATES.YELLOW]: {
  entry: ['entryYellow'], // 进入状态执行
  on: {
    [LIGHT_EVENTS.CLICK]: [LIGHT_STATES.RED],
  },
}

...

 // 传入createMachine的第二个参数
{
  actions: {
    entryYellow: (ctx, ev) => console.log('entry yellow', ctx, ev),
  },
}

```

### assign action

从 xstate 中导入 assign 方法，接受一个参数，这个参数表示 context 要更新成什么值，然后把 assign(...args)作为 action。（不再是接受三个入参的回调形式）
assign 方法可以接受一个回调返回要更新的新值，也可以接受一个对象，然后对象的每个字段是一个回调，回调返回值是要更新的新值

但不论是 assign 还是 withContext 都必须是对原 context 上已有字段的赋值，ts 编译器会检查这一点
并且实际上传入 createMachine 时 context 是外部定义好的对象的话，创建机器后就不再有对这个外部变量的引用，不论是 assign 还是 withContext 都不会再改变这个外部的值

assign 方法改变 context 时如果要依靠外部的值，那么需要在 service 的 send 方法中不再传入事件名，而是传入一个对象`{type: 事件名, value: 值}`，然后再通过回调函数内`ev.value`的方式读值

实际上，assign 只是 pure function 回傳一個 action 物件，並直接對 machine 造成影響。
