# Scheduler

What is a Scheduler? A scheduler controls when a subscription starts and when notifications are delivered. It consists of three components.

A Scheduler is a data structure. It knows how to store and queue tasks based on priority or other criteria.
A Scheduler is an execution context. It denotes where and when the task is executed (e.g. immediately, or in another callback mechanism such as setTimeout or process.nextTick, or the animation frame).
A Scheduler has a (virtual) clock. It provides a notion of "time" by a getter method now() on the scheduler. Tasks being scheduled on a particular scheduler will adhere only to the time denoted by that clock.

null
queueScheduler
asapScheduler （as soon as possible 调度器，尽可能快） Schedules on the micro task queue, which is the same queue used for promises 在瀏覽器其實就是 setTimeout 設為 0 秒 (在 NodeJS 中是用 process.nextTick).因為都是在 setTimeout 中執行，所以不會有 block event loop 的問題，很適合用在永遠不會退訂的 observable，例如在背景下持續監聽 server 送來的通知
asyncScheduler Schedules work with setInterval. Use this for time-based operations
animationFrameScheduler Schedules task that will happen just before next browser content repaint 它是利用 Window.requestAnimationFrame 這個 API 去實作的，所以執行週期就跟 Window.requestAnimationFrame 一模一樣。

Static creation operators usually take a Scheduler as argument:
bindCallback
bindNodeCallback
combineLatest
concat
empty
from
fromPromise
interval
merge
of
range
throw
timer

Time-related operators like bufferTime, debounceTime, delay, auditTime, sampleTime, throttleTime, timeInterval, timeout, timeoutWith, windowTime all take a Scheduler as the last argument, and otherwise operate by default on the asyncScheduler.
Other instance operators that take a Scheduler as argument: cache, combineLatest, concat, expand, merge, publishReplay, startWith.

Notice that both cache and publishReplay accept a Scheduler because they utilize a ReplaySubject. The constructor of a ReplaySubjects takes an optional Scheduler as the last argument because ReplaySubject may deal with time, which only makes sense in the context of a Scheduler. By default, a ReplaySubject uses the queue Scheduler to provide a clock.

Use subscribeOn to schedule in what context will the subscribe() call happen
Use observeOn to schedule in what context will notifications be delivered
