# React Hooks

hooks 的作用是让函数组件拥有自己的状态
解决的问题：1.组件的状态逻辑复用 2.class 组件自身的问题

hooks 只能在函数组件中使用

## useState

useState 为函数组件提供状态（state）

使用步骤：

1. 导入 useState 函数 `import { useState } from 'react'`
2. 调用 useState 函数，并传入状态的初始值，从 useState 函数的返回值中，拿到状态和修改状态的方法 `const [count, setCount] = useState(0)`
3. 在 JSX 中展示状态 `<div>{count}</div>`
4. 调用修改状态的方法更新状态，并引起视图更新 `setCount(count + 1)`

注意：

- 修改状态的时候，一定要给修改状态的方法传入新的状态替换旧的状态，不能直接修改旧的状态，尤其是引用类型
- useState 函数可以执行多次，每次执行互相独立，每调用一次为函数组件提供一个状态
- useState 只能出现在函数组件或者其他 hook 函数中， 不能嵌套在 if/for/其它函数中，因为 React 是按照 hooks 的调用顺序来识别每一个 hook，而不是靠变量名
- useState 的参数可以是一个值，也可以是一个回调，取其返回值作为初始状态，这个回调函数只会在组件初始化时候执行一次，组件重新渲染并不会执行
- 修改状态的方法，可以接受一个状态，也可以接受一个回调 `setCount(count => count + 1)`
- 连续调用修改状态的方法，会合并执行并触发组件一次重新渲染，不同的是如果传入回调，状态会迭加
- 可以通过开发者工具查看 hooks 状态
- 修改状态的方法貌似是异步执行的？

组件的更新过程：
useState 的初始值(参数)只会在组件第一次渲染时生效

组件第一次渲染：

- 从头开始执行该组件中的代码逻辑
- 调用 useState() 将传入的参数作为状态初始值
- 渲染组件

组件第二次渲染：

- 调用修改状态的方法改变状态，引发组件重新渲染
- 开始重新渲染，再次执行该组件中的代码逻辑
- 再次调用 useState()，此时 React 内部会拿到最新的状态值而非初始值
- 完成再次渲染组件

## useEffect

useEffect 为 react 函数组件提供副作用处理

副作用是相对于主作用来说的，一个函数除了主作用，其他的作用就是副作用。
对于 React 组件来说，主作用就是根据数据（state/props）渲染 UI，除此之外都是副作用

使用步骤：

1. 导入 useEffect 函数 `import { useEffect } from 'react'`
2. 调用 useEffect 函数，并传入回调函数 ` useEffect(()=>{})`

useEffect 回调函数中用到的数据就是依赖数据

依赖项控制执行时机（useEffect 的第二个参数）：

- 不添加依赖项
  组件首次渲染执行一次，以及不管是哪个状态更改引起组件更新时都会重新执行
- 添加空数组
  组件只在首次渲染时执行一次
- 添加特定依赖项
  副作用函数在首次渲染时执行，在依赖项发生变化时重新执行

清理副作用：
可以在传入 useEffet 的回调函数的末尾 return 一个新的函数，在新的函数中编写清理副作用的逻辑，比如清理定时器等
会在这些时机自动执行：

- 组件卸载时自动执行
- 组件更新时，下一个传入这个 useEffect 的副作用函数执行之前自动执行

注意：

- React18 在 dev 环境下的严格模式， 会将每个组件挂载两次进行测试。useEffect 的默认运行是两次
  如果注释掉严格模式，则只执行 1 次
- render 完成之后，执行 Effect，貌似是异步执行的？
- 如果定义了多个 Effect，则按顺序执行
- 如果要在 useEffect 中执行异步任务，不可以直接在 useEffect 的回调函数外层直接包裹 await ，因为异步会导致清理函数无法立即返回。正确写法是 在内部单独定义一个 async 修饰的函数

useEffect 执行异步操作：
1、useEffect 中的第一个回调参数返回的是一个 clean-up 函数，所以不能返回 promise 对象，更不能直接使用 async/await，否则会报错；
2、可以在回调参数中使用 async/await：
方法一：使用自执行函数
方法二：在 useEffect 的回调参数内部定义一个 async 函数：

```ts
useEffect(()=>{
	// 使用自执行函数 IIFE
	（async function fn(){
		await otherFn();
	})()
},[])

useEffect(()=>{
	const fn=async ()=>{
		// do something
		await otherFn()
	}
	fn()
},[])
```

案例：执行顺序

```tsx
import { useState, useEffect } from 'react'
function App() {
  const [count, setCount] = useState(0)

  const clickHandle = () => {
    setCount(count => count + 1)
    setCount(count => count + 1)
  }

  useEffect(() => {
    // console.log('初始状态，count为', count)
    setCount(count => count + 1)
    console.log('执行了副作用，count为', count)
  }, [])

  console.log('count:', count)

  // let i = 0
  // console.log('i:', i)
  // i++

  return (
    <>
      {count}
      <hr />
      <button onClick={clickHandle}>count++</button>
    </>
  )
}
export default App
```

案例：自定义 hook

自定义一个 hook 函数，实现获取动态的 滚动距离 Y `const [y] = useWindowScroll()`
TODO: 为什么这里的 y 是响应式的？

```tsx
import { useState } from 'react'

export function useWindowScroll() {
  const [y, setY] = useState(0)
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollTop
    setY(h)
  })
  return [y]
}
```

## useRef

1.获取 DOM 对象
useRef 在函数组件中获取 DOM 元素对象或组件对象（函数组件由于没有实例，不能使用 ref 获取）

使用步骤：

1. 导入 useRef 函数 `import { useRef } from 'react'`
2. 用 ref 绑定要获取的元素或者组件 `<h1 ref={h1Ref}>this is h1</h1>`
3. 执行 useRef 函数并传入 null，返回值为一个对象`const h1Ref = useRef(null)`，内部有一个 current 属性存放拿到的 dom 对象（组件实例），可以在 useEffect 中拿到 DOM 元素

```tsx {3,9}
import { useEffect, useRef } from 'react'
function App() {
  const h1Ref = useRef(null)
  useEffect(() => {
    console.log(h1Ref)
  }, [])
  return (
    <div>
      <h1 ref={h1Ref}>this is h1</h1>
    </div>
  )
}
export default App
```

2.响应式
和 useEffect useState 一起使用解决拿不到 useState 新值的问题

```ts
const [isInpainting, setIsInpainting] = useState(false) // TODO: 异步问题
let forbid = useRef(false)
useEffect(() => {
  forbid.current = isInpainting
}, [isInpainting])
```

## useContext

useContext 跨组件通信

实现步骤：

1. 导入 createContext 和 useContext `import { createContext, useContext } from 'react'`
2. 使用 createContext 创建 Context 对象 `const Context = createContext()`，要声明在关联的组件之外外面
3. 在顶层组件通过 Provider 提供数据 `<Context.Provider value={'this is name'}> <子组件 /> </Context.Provider> `
4. 在底层组件通过 useContext 函数获取数据，参数为创建的 Context 对象 `const name = useContext(Context)`
