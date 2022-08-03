# 兄弟组件传参、Bus

兄弟组件传参，如果借助父组件，方法很多，只要先子传父，再父传子即可。
如果不借助父组件，也不借助状态管理，可以用 mitt 插件来做

## mitt

1. 下载安装 `npm i mitt -S`
2. plugins/Bus.js

   ```js
   import mitt from 'mitt'
   export default const emitter=mitt()
   ```

3. A 组件

   ```js
   emitter.emit('fn', str)
   ```

4. B 组件

   ```js
   // 可以用在onBeforeMount中
   emitter.on('fn', e => {
     s.value = e.value
   })
   ```
