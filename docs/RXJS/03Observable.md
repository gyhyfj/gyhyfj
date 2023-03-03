# Observable

建立 Observable 的方法有非常多种，其中 new Observable 是最基本的方法，要传入一个 callback function，这个 callback function 会定义 observable 将会如何发送值

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
