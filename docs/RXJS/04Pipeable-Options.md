Pipeable-Options
所有這些函式都會拿到原本的 observable 並回傳一個新的 observable

take 取几个
first 取第一个 相当于 take(1)
takeUntil 返回一个 Observable 但当接受的参数的 Observable 发出数据时立刻结束这个返回的 Observable。 这个参数 Observable 只要定义了就行，不需要在外部被订阅
concatAll 把高阶 Observable 降阶，但只会按顺序处理并输出，当前处理结束后才处理下一个
switchAll 把高阶 Observable 降阶，当后一个 Observable 开始推数据时不再订阅前一个 Observable
mergeAll 把多个 observable 同时处理，而非串行，这是和 concatAll 和 switchAll 的区别

```vue
<!-- 拖拽 -->
<template>
  <div class="absolute aspect-square w-10 bg-pink-600" ref="dragRef"></div>
</template>

<script setup lang="ts">
import { fromEvent, map, concatAll, takeUntil } from 'rxjs'

const dragRef = ref()
onMounted(() => {
  const mouseDown = fromEvent(dragRef.value, 'mousedown')
  const mouseUp = fromEvent(document, 'mouseup')
  const mouseMove = fromEvent(document, 'mousemove')

  mouseDown
    .pipe(
      map(() => mouseMove.pipe(takeUntil(mouseUp))), // 发送一个数据时转成一个mouseMove并开启 // mouseUp是用来终结mouseMove的，不可以放到这个pipe外面
      concatAll(), // 取出 mouseMove.pipe(takeUntil(mouseUp)) 里的数据流
      map((e: any) => ({ x: e.clientX, y: e.clientY })) // 转换数据
    )
    .subscribe(pos => {
      console.log(pos)
      dragRef.value.style.left = pos.x + 'px'
      dragRef.value.style.top = pos.y + 'px'
    }) // 疑惑：mouseMove和mouseUp分别是在哪一步被启动的？
})
</script>
```

skip 忽略前几个
takeLast 取最后几个，同步送出（只能同步送出，因为不知道什么时候 complete）
last 取最后一个 相当于 takeLast(1)
startWidth 流的开始加塞数据 接受的参数是普通数据而不是 Observable，这就是和 concatAll 的不同

```ts
of(timer(1000, 1000).pipe(take(3)), timer(1500, 1500).pipe(take(3)))
  .pipe(mergeAll())
  .subscribe(console.log)
```

combineLatest 会取得各个 observable 最后送出的值，再输出成一个值
withLatestFrom 会取得各个 observable 最后送出的值，但只有主 observable 输出值时候才推值，其他时候不推值，顺序是`[主, 从]`

```ts
interval(2000)
  .pipe(withLatestFrom(interval(1000)))
  .subscribe(console.log)
```

filter 过滤但不终止

```vue
<!-- 拖拽完整代码 -->
<template>
  <div class="absolute aspect-square w-52 bg-pink-600" ref="dragRef"></div>
</template>

<script setup lang="ts">
import { fromEvent, map, concatAll, takeUntil, withLatestFrom } from 'rxjs'

const dragRef = ref()
onMounted(() => {
  const mouseDown = fromEvent(dragRef.value, 'mousedown')
  const mouseUp = fromEvent(document, 'mouseup')
  const mouseMove = fromEvent(document, 'mousemove')

  const validValue = (value: number, max: number, min: number) => {
    return Math.min(Math.max(value, min), max)
  }

  mouseDown
    .pipe(
      map(() => mouseMove.pipe(takeUntil(mouseUp))), // 发送一个数据时转成一个mouseMove并开启 // mouseUp是用来终结mouseMove的，不可以放到这个pipe外面
      concatAll(), // 取出 mouseMove.pipe(takeUntil(mouseUp)) 里的数据流
      withLatestFrom(mouseDown),
      map(([em, ec]: any) => ({
        x: validValue(
          em.clientX - ec.offsetX,
          window.innerWidth - em.target.getBoundingClientRect().width,
          0
        ),
        y: validValue(
          em.clientY - ec.offsetY,
          window.innerHeight - em.target.getBoundingClientRect().height,
          0
        ),
      })) // 转换数据
    )
    .subscribe(pos => {
      console.log(pos)
      dragRef.value.style.left = pos.x + 'px'
      dragRef.value.style.top = pos.y + 'px'
    }) // 疑惑：mouseMove和mouseUp分别是在哪一步被启动的？
})
</script>
```

scan 相当于 JS 的 reduce `scan((acc,curr)=>acc+curr, 0)`

buffer 接收一个 Observable，原 Observable 的数据会被缓存直到接收这个参数 Observable 的 emit 时候才向外推数据，以数组形式存放缓存的数据，如果没有则仍会推送，推送出一个空数组
bufferCount 按次数缓存
bufferTime 按时间缓存

delay 延迟当前接受的数据的发送 可以接受毫秒数 也可以传入 Date 类型的时间结点
delayWhen 接受一个回调 这个回调每次都会返回一个 Observable，当这个 Observable 推送数据时候，就放出 Observable 发送的这个数据
可以通过控制延迟的大小可以改变主 Observable 最终发送出数据的先后顺序

```ts
interval(300)
  .pipe(delayWhen(x => EMPTY.pipe(startWith(0), delay(x * x * x))))
  .subscribe(console.log)
```

throttle
throttleTime 接受毫秒数 更常用
debounce
debounceTime 接受毫秒数 更常用

distinct 可以接受一个回调，来比较这个回调的返回值， 以及第二个参数 flushes observable 用來清除暂存的数据 Set
distinctUntilChanged 不会维护一个 Set，只会和最后一次送出的比较，不会和之前送出的每个比

catchError 捕捉管道前面未捕捉的错误，接受一个回调，参数 1 是收到的错误，参数 2 是当前的这个 Observable 自己，返回值可以是另一个 Observable 或字符串之类的 ObservableInput
可以让返回个 EMPTY 这样就直接结束了 可以让返回参数 2 这样就可以重试

retry 遇错重试 接受一个 number 或 RetryConfig 重试还不行后会推出错误，然后 observer 里需要定义 error 字段，否则就无法捕捉错误，导致进程挂掉
repeat 重复 接受一个 number 或 RepeatConfig

concatMap map 加上 concatAll 的简写 适合连续请求

```ts
fromEvent(document, 'click').pipe(
  map(() => of(1, 2, 3)),
  concatAll()
)
fromEvent(document, 'click').pipe(concatMap(() => of(1, 2, 3)))
```

switchMap 适合只让最后一次请求发生副作用
mergeMap 限制并行
