# nodejs

## JSON

JSON 是一种基于文本的轻量级的数据交换格式。
在前端通过将一个符合 JSON 格式的数据结构序列化为 JSON 字符串，然后将它传递到后端，后端通过 JSON 格式的字符串解析后生成对应的数据结构，以此来实现前后端数据的一个传递。

JSON 和 js 中的对象不是一回事，JSON 中对象格式更加严格，比如说在 JSON 中属性值不能为函数，不能出现 NaN 这样的属性值等

JSON.stringify
JSON.parse
两个函数来实现 js 数据结构和 JSON 格式的转换处理

## axios 二次封装和 API 解耦

一般情况下不会直接用 axios.get axios.post 在分散的各个地方发送请求，所以会封装到统一的地方，便于维护
做一个 request.js 做拦截，再做若干个 api.js 做请求

```js
/* request.js */
import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: 'https://www.gyhyfj.com/api',
  timeout: 3000,
  // header:[]
})
// 请求拦截器
service.interceptors.request.use(
  config => {
    // 部分接口需要拿到token
    let token = localStorage.getItem('token')
    if (token) {
      config.headers.token = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// 响应拦截器
service.interceptors.response.use(
  res => {
    return res
  },
  err => {
    return Promise.reject(err)
  }
)
// 整体导出
export default service
```

```js
/* api.js */
// 将request.js整体导入
import request from '../utils/request'
// 按需导出每个api
export const mostNew = () => request.get('/test')
```
