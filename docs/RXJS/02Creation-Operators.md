# Creation Operators

## Observable 构造函数

建立 Observable 的方法有非常多种，其中 new Observable 是最基本的方法，要传入一个 callback function，这个 callback function 会定义 observable 将会如何发送值

然后 observable 的 subscribe 方法会接收一个 observer，启动序列
observer 是一个有 next error complete 三个成员函数的对象
但有时候 Observable 会是一个无限的序列，例如 click 事件， error 和 complete 方法就有可能永远不会被呼叫
所以 observer 可以缺省其他两个成员或是直接写成 next 回调函数本身，observable.subscribe 会在内部自动组成 observer 对象来操作

```ts
import { Observable } from 'rxjs'

const observable = new Observable<number>(subscriber => {
  subscriber.next(1)
  subscriber.next(2)
  subscriber.complete()
})

const observer = (val: number) => console.log(val) // 简写形式

const subscription = observable.subscribe(observer)
```

Observable 的订阅跟 addEventListener 在有很大的差异，Observable 不会维护一个订阅名单，也只是单播模式
订阅 Observable 的行为比较像是执行一个 function，并把数据和配置传进这个 function 中。

## Creation Operators

使用 Creation Operators 建立 Observable 对象
of - 参数列表 ，不可以包装 Promise
from - 参数数组 字符串 Promise 多个 Observable 以组成高阶 Observable 以在管道符中调用 mergeAll concatAll
fromEvent
throwError - 回调函数写法是返回一个 error，会在订阅时生成这个 error
interval - 按间隔送出 0 1 2 ..序列，不立即送出 0
timer - 开始送出的时间 送出间隔 送出自然数序列 没有第二个参数则只送出 0

defer 接受一个生成 Observable 的回调，当被订阅时生产这个 Observable
// from(Promise)定义的 Observable 里面的 Promise 会被立即执行的，副作用也是会立即执行
// defer(()=>from(Promise))这种方式定义的 Observable 只会在定义的时候才会执行里面的 Promise
// 不仅仅是 Promise，需要从外部读值来创建 Observable 的非纯函数 Observable，可以用 defer 在 subscribe 时候再执行创建，从外部读值。`defer(() => of(mainInputRef.value.files![0]))`
// `fromEvent(target,evName)`这样的代码如果不是放在 defer 的回调里延迟执行，写下的瞬间就已经要读取这个 dom 对象了，
所以只能写在回调里靠 defer 延迟执行这个回调直至 subscribe
fromEventPattern 传入注册监听和移除监听的方法来建立 Observable 实例
ajax
bindCallback
bindNodeCallback
generate

range 接受两个参数 表示开始值和结束值，生成闭区间的整数序列
timer
iif

常量实例
EMPTY NEVER

接受一个 observable 数组/列表的
concat 拼接 推送高阶 observable
merge 融合 接受 observable 列表 推送高阶 observable
combineLatest 每次推送一个数组
zip 每次推送一个数组 每次都是等每个 observable 都推出值了然后一起推送 所以当某个是异步 observable 时，其他的同步 observable 的数据会跟随异步的节奏被推出
