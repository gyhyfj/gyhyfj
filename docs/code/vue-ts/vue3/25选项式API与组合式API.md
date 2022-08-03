# 选项式 API 与组合式 API

## 响应式数据区别

组合式 API 中创建的响应式对象，重新赋值：

数组：
从一个数组替换为另一个数组：
组合式 API： 要先清空原数组再 push 进新数组的元素
选项式 API：直接赋值替换

```vue
<!-- 组合式API -->
<script lang="ts" setup>
import { reactive } from 'vue'

let arr = reactive([1, 2, 3])
let change = () => {
  arr.length = 0 // 清空数组
  arr.push(7, 8, 9)
  // 或：
  // let data = [7, 8, 9]
  // arr.splice(0, arr.length, ...data)
  console.log(arr.length)
}
</script>

<!-- 选项式API -->
<script lang="ts">
// export default {
//   data() {
//     return {
//       arr: [1, 2, 3],
//     }
//   },
//   methods: {
//     change() {
//       this.arr = []
//       console.log(this.arr)
//       this.arr.push(7, 8, 9)
//     },
//   },
// }
</script>

<template>
  {{ arr }}
  <button @click="change">change</button>
</template>
```

对象：
组合式 API：要先清空原对象，再添加新对象的属性 Object.assign(obj1, obj2)
但不能用 obj1 = { ...obj2 }，会改变 obj1 指针指向
选项式 API：直接赋值替换

```vue
<script lang="ts" setup>
import { reactive } from 'vue'

let obj1 = reactive<any>({ a: 2 })
let change = () => {
  for (let key in obj1) {
    delete obj1[key]
  }
  let obj2 = { b: 1 }
  Object.assign(obj1, obj2)
}
</script>
```
