# Subject

Subject 可以拿去订阅 Observable(source) 代表他是一个 Observer, 同时 Subject 又可以被 Observer(observerA, observerB) 订阅, 代表他是一个 Observable
它会对内部的 observers 清单进行多播

可以通过 new Subject 创建, 再调用实例的 next 方法推出传入 next 方法的值
也可以作为 Observer 订阅其他 Observable
但是一旦订阅其他 Observable 就不能通过 next 方法推值

在一些无法直接使用 fromEvent 之类 creation operators 建立 observable 的前端框架中, 可以用 subject 来做 DOM 或组件监听
比如 vue 组件的自定义事件, 可以通过`@自定义事件名称 = value => subject.next(value)`来把值从 subject 推出
但不可以用`@自定义事件名称 = subject.next`!这样会导致 this 执行错误!

## 变种

BehaviorSubject 会存储送出的最新的那个值, 当又新的 observer 订阅时都会立即发送这个值. 这种行为是一种状态的表达而不是单纯的事件
可以用于解决 子组件接收未初始化时 Observable 就已经发送的消息

ReplaySubject 接受一个数字参数, 相比 BehaviorSubject 会记录这些数量的最新值并送给新订阅者
AsyncSubject 会在 subject 结束时送出最后一个值, 很少用

TS: 如果什么参数都不派发, 只是派发通知本身, 那么泛型可以传 void, 有助于类型检查避免错误

## 操作符

observable 后接上 share 管道操作符后, 会被转换成 subject
同步的 observable 是会瞬间被执行完毕的, 那么 share 后即使订阅也是已经变冷的观察对象
那么就要用 connect 操作符 connect 接受一个回调, 参数是 observable, 返回仍是 observable, 可以使用 merge 之类的对 observable 进行加工拓展

## 一定要使用 Subject 时机

通常在不知道要怎么建立 Observable 时候会使用 Subject
但是会存在一些问题
而一定要使用 Subject 时机则是 observable 里有副作用时, 如果不希望这些副作用每次订阅都发生一次, 就用 Subject
