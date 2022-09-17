# Recoil

https://recoiljs.org/

## 安装 recoil

安装 `npm i recoil`

## 配置 RecoilRoot

在需要共享数据的公有父组件外包裹 RecoilRoot 标签
`import { RecoilRoot } from 'recoil`
` <RecoilRoot><App /></RecoilRoot>`

## 创建 atom

可以创建一个`store/index.ts`，在里面写各个 atom 并导出

```ts
import { atom } from 'recoil'
export const countState = atom({
  key: 'countState',
  default: 0,
})
```

## 使用 atom

```ts
import { useRecoilState } from 'recoil'
const [count, setCount] = useRecoilState(countState) // 类似useState的用法，接受一个atom参数
```

## 派生状态

是一种类似 vue 计算属性的响应式状态，自动跟踪依赖

```ts
import { selector, useRecoilValue } from 'recoil'

/* 创建派生状态 */
const doubleCountState = selector({
  key: 'doubleCountState',
  get: ({ get }) => {
    const countValue = get(countState) // 获取一个派生状态，接受一个atom参数
    return countValue * 2 // 返回一个计算结果，只读的
  },
})

/* 拿到派生状态的值 */
const doubleValue = useRecoilValue(doubleCountState)
```

## Atom Effects

类似 React 的 useEffect，但 useEffect 只能在函数组件内部使用
写在 atom 函数入参的 effects 节点上，是一个数组，数组中为一个个函数，按先后顺序执行

```ts
type AtomEffect<T> = ({
  node: RecoilState<T>, // A reference to the atom itself
  storeID: StoreID, // ID for the <RecoilRoot> or Snapshot store associated with this effect.
  // ID for the parent Store the current instance was cloned from.  For example,
  // the host <RecoilRoot> store for `useRecoilCallback()` snapshots.
  parentStoreID_UNSTABLE: StoreID,
  trigger: 'get' | 'set', // The action which triggered initialization of the atom

  // Callbacks to set or reset the value of the atom.
  // This can be called from the atom effect function directly to initialize the
  // initial value of the atom, or asynchronously called later to change it.
  setSelf: (
    | T
    | DefaultValue
    | Promise<T | DefaultValue> // Only allowed for initialization at this time
    | WrappedValue<T>
    | ((T | DefaultValue) => T | DefaultValue),
  ) => void,
  resetSelf: () => void,

  // Subscribe to changes in the atom value.
  // The callback is not called due to changes from this effect's own setSelf().
  onSet: (
    (newValue: T, oldValue: T | DefaultValue, isReset: boolean) => void,
  ) => void,

  // Callbacks to read other atoms/selectors
  getPromise: <S>(RecoilValue<S>) => Promise<S>,
  getLoadable: <S>(RecoilValue<S>) => Loadable<S>,
  getInfo_UNSTABLE: <S>(RecoilValue<S>) => RecoilValueInfo<S>,

}) => void | () => void; // Optionally return a cleanup handler
```

例如：

```ts
export const countState = atom({
  key: 'countState',
  default: 0,
  effects: [
    () => {
      console.log('hello')
    },
    ({ onSet }) => {
      // 状态变化时触发，类似vue的侦听器
      onSet((newVal, oldVal) => {
        console.log(newVal, oldVal)
      })
    },
  ],
})
```
