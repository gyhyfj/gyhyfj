## Redux

学 redux，其实就是学这三个核心概念之间的配合
state: 一个对象 存放着我们管理的数据
action: 一个对象 用来描述你想怎么改数据
reducer: 一个函数 根据 action 的描述更新 state

安装两个东西 @reduxjs/toolkit react-redux
src/store
下面 modules/ 和 index.js

### 在 modules/ 创建 store 模块

使用 toolkit 的 createSlice 方法创建一个独立的子模块
import { createSlice } from '@reduxjs/toolkit'
const counter = createSlice({name,initialState,reducers})
使用 configureStore 语法组合子模块

```js
import { createSlice } from '@reduxjs/toolkit'

const counter = createSlice({
  // 模块名称独一无二
  name: 'counter',
  // 初始数据
  initialState: {
    count: 1,
  },
  // 修改数据的同步方法
  reducers: {
    add(state) {
      state.count++
    },
  },
})

/* 这里很怪异 */
const { add } = counter.actions
const reducer = counter.reducer

// 导出修改数据的函数
export { add }
// 导出reducer
export default reducer
```

### 组合子模块

在 store/index.js

```js
import { configureStore } from '@reduxjs/toolkit'
import counterStore from './counterStore'

export default configureStore({
  reducer: {
    // 注册子模块
    counterStore,
  },
})
```

### 通过 Provider 提供 store 数据

在 main.jsx

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// 导入store
import store from './store'
// 导入store提供组件Provider
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  // 提供store数据
  <Provider store={store}>
    <App />
  </Provider>
)
```

### 组件使用 store

访问里面的数据
useSelector(state => state.模块名) 方法的返回值为一个对象，对象中包含 store 子模块中的所有数据

import { useSelector } from 'react-redux'
const { count } = useSelector(state => state.counterStore) 一定要用解构赋值

修改数据
修改 store 中的数据有俩个核心步骤：
在事件处理函数中：
1 使用 counterStore 模块导出的 add 创建 action const action = add()
2 导入 useDispatch，生成 dispatch，dispatch(action) 通过 dispatch 函数以 action 作为参数传入完成数据更新

```js
import { useSelector, useDispatch } from 'react-redux' // 导入useDispatch
import { add } from './store/counterStore' // 导入方法

function App() {
  // 使用数据
  const { count } = useSelector(state => state.counterStore)

  // 修改数据
  const dispatch = useDispatch()
  const clickHandler = () => {
    // 1. 生成action对象
    const action = add()
    // 2. 提交action进行数据更新
    dispatch(action)
  }
  return (
    <div className="App">
      {count}
      <button onClick={clickHandler}>+</button>
    </div>
  )
}

export default App
```

事件传参
store 模块文件中 action 使用第二个参数 action 和他的固定属性 payload

```js
 reducers: {
    fff(state, action) {
      state.id = action.payload
    },
  },
```

onClick={func} 改成 onClick={()=>func(1)}

后续添加方法：
在 store 模块文件的 reducers 选项中定义函数
然后导出

```js
reducers:{
  // 删除的方法
   delTask (state, action) {
      state.list = state.list.filter(task => task.id !== action.payload)
   }
}

// 导出删除action函数
// 导出action函数
const { delTask } = taskStore.actions
export { delTask }
```

然后组件导入方法
在事件处理函数中用 action=方法的返回值，再用 dispatch(action) 更新数据
或不单独定义函数 而是直接写在行内

onChange={() => dispatch(toggleTask(task.id))}
