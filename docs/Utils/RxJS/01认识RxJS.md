# 认识 RxJS

ReactiveX 结合了观察者模式、迭代器模式和使用集合的函数式编程
并不是发布订阅模式的原因是, observable 内部没有维护订阅者清单, 订阅的过程只是在像执行一个 function

## pull push

拉取和推送是两种不同的协议, 用来描述数据生产者(Producer)如何与数据消费者(Consumer)进行通信.

拉取 pull 由消费者来决定何时从生产者那里接收数据. 生产者本身不知道数据是何时交付到消费者手中的.

推送 push 由生产者来决定何时把数据发送给消费者. 消费者本身不知道何时会接收到数据.

比如在 JS 中,
函数是一个生产值的 Producer, 但只有在调用它时候才会从它拉取值
Promise 是一个生产值的 Producer, 它来决定何时把值推送给回调函数

Rxjs 的 Observables 就是一个新的 JavaScript 推送体系, Observable 是多个值的生产者, 并将值“推送”给消费者

## 响应式编程

主动轮训, 我们把它称为 Proactive 方式. 被动接收反馈, 我们称为 Reactive 方式
就像 vue 的响应式数据变化后, 收集依赖的地方会自动更新

## Functional Programming

Functional Programming 是一种编程范式 (programming paradigm) , 就像 Object-oriented Programming (OOP) 一样, 是一种写程式的方法论, 这些方法论告诉我们如何思考及解决问题

特点:
Expression, no Statement
Pure Function, no Side Effect
Referential transparency
利用参数保存状态

优点:
可读性高
可维护性高
易于并行/平行处理

## Observer Pattern

观察者模式:
一群人 observer 观察一个人 observable
RxJS、或者说是观察者模式的优点. 在定义数据流时可以更专注于生产者的实现, 并且天然与消费者的逻辑解耦: 有几个消费者、哪个消费者要做哪些事情, 流本身并不关注, 更利于消费场景的变更和拓展.

## Iterator Pattern

Iterator 是一个对象, 它就像是一个指针 (pointer) , 指向一个数据结构并产生一个序列 (sequence) , 这个序列会有数据结构中的所有元素 (element) .

有两个优势, 第一它渐进式取得资料的特性可以拿来做延迟运算 (Lazy evaluation) , 让我们能用它来处理大数据结构. 第二因为 iterator 本身是序列, 所以可以实作所有阵列的运算方法像 map, filter... 等!

延迟运算 (Lazy evaluation)
延迟运算, 或说 call-by-need, 是一种运算策略 (evaluation strategy) , 简单来说我们延迟一个表达式的运算时机直到真正需要它的值在做运算.

迭代器模式:
Function: 调用时会同步地返回一个单一值
Generator: 调用时会同步地返回零到无限多个值
Promise: 是最终可能(或可能不)返回单个值的运算
Observable: 被调用后可以同步或异步地返回零到无限多个值

Observer 跟 Iterator 有个共通的特性, 就是他们都是 渐进式 (progressive) 的取得资料, 差别只在于 Observer 是生产者 (Producer) 推送资料 (push) , 而 Iterator 是使用者 (Consumer) 要求资料 ( pull)!

Observable 其实就是这两个 Pattern 思想的结合, Observable 具备生产者推送资料的特性, 同时能像序列, 拥有序列处理资料的方法 (map, filter...) !

## 核心概念

整个 RxJS 说白了就是一个核心三个重点.

一个核心是 Observable 再加上相关的 Operators (map, filter...)
另外三个重点分别是 Observer Subject Schedulers

Observable 是多个值的生产者, 并将值“推送”给消费者 具有延迟计算和渐进式取值的特性, 在处理大量数据时候渐进式取值会高效很多
定义一个数据流, 然后通过被订阅以启动数据流

Observer 是观察者, 一个回调函数的集合, 是一个对象, 有 next error complete 三个成员方法, 是 Observable 的 subscribe 方法的参数, 返回值是 Subscription, 表示 Observable 的执行, 可以被清理, 通过调用 Subscription 的 unsubscribe 方法

Subject 和它的变体
BehaviorSubject
ReplaySubject
AsyncSubject
既是一个 Observable 又是一个 Observer, 它可以同时接受 Observable 发射出的数据, 也可以向订阅了它的 observer 发射数据
是多播 (不是广播)

在 RxJS 中, 有热观察和冷观察的概念. 其中的区别:

Hot Observable: 可以理解为现场直播, 我们进场的时候只能看到即时的内容
Cold Observable: 可以理解为点播 (电影) , 我们打开的时候会从头播放
