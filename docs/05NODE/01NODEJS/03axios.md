## 设置代理和封装 axios 和解耦 API

一般情况下不会把整串请求地址写于 url 中，所以会配置代理 proxy

```ts
/* vite.config.ts */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': 'http://testapi.xuexiluxian.cn',
    },
  },
})
```

```js
import axios from 'axios'

//1. 创建axios对象
const service = axios.create()

//2. 请求拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

//3. 响应拦截器
service.interceptors.response.use(
  response => {
    //判断code码
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
```

使用创建的 axios 实例：

```js
import request from '../utils/request'

export function mostNew(data) {
  return request({
    url: '/api/course/mostNew',
    method: 'post',
    data,
  })
}
```
