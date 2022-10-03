# React-Router

路由的本质：
概念来源于后端：一个路径表示匹配一个服务器文件资源
共同的思想：一对一的关系
前端的路由：一个路径 path 对应唯一的一个组件，我们访问一个 path 自动把 path 对应的组件进行渲染

## 使用 router

安装 react-router-dom
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
BrowerRouter 与 HashRouter 包裹整个容器
Link 跳转组件
Routes，Route 组件的父组件，组件内部会存在多个内置的 Route 组件，满足条件的路由会被渲染到组件内部
类似于 router-view
Route 用于定义路由路径和渲染组件的对应关系

编程式导航
导入一个 useNavigate 钩子函数 import { useNavigate } from 'react-router-dom'
执行 useNavigate 函数 得到 跳转函数 const navigate = useNavigate()
在事件中执行跳转函数完成路由跳转 onClick={ ()=> navigate('/about') }

集中式路由
准备一个路由数组 数组中定义所有的路由对应关系
使用 useRoutes 方法传入数组生成 Routes 组件

```jsx
const routesList = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <Board />,
        index: true, // index设置为true 变成默认的二级路由
      },
      {
        path: 'article',
        element: <Article />,
      },
    ],
  },
  // 增加n个路由对应关系
  {
    path: '*',
    element: <NotFound />,
  },
]
function WrapperRoutes() {
  let element = useRoutes(routesList)
  return element
}

;<BrowserRouter>
  {/* 3. 替换之前的Routes和Route组件 */}
  <WrapperRoutes />
</BrowserRouter>
```
