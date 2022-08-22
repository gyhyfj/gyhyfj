# 21css 新特性

## 深度选择器 插槽选择器 全局选择器

```less
:deep(el-button) {
  color: white;
} // 修改组件样式

:slotted(.a) {
  color: red;
} // 写在子组件中，会作用这个组件的插槽中的内容

:global(div) {
  color: pink;
} // 即使写在下面，也不会覆盖上面这个样式
```

## 动态 CSS

第一种方式：css 属性值用 v-bind 绑定为 script 中的字符串或对象成员 `color: v-bind(style);`
如果对象成员要加引号 ` color: v-bind('style2.color');`

```vue
<script setup lang="ts">
import { ref } from 'vue'

const style = ref('red') // 字符串
const style2 = ref({
  color: 'red',
})
</script>

<template>
  <div class="div">动态CSS</div>
</template>

<style lang="less" scoped>
.div {
  color: v-bind(style); // v-bind 绑定css属性值为script中的字符串
  color: v-bind('style2.color'); // v-bind 绑定 css属性值为script中的对象成员（要加引号）
}
</style>
```

第二种方式：css module

```vue
<script setup lang="ts"></script>

<template>
  <!-- 默认是$style.类名，如果是多个类名，要写成数组形式，否则不用写成数组 -->
  <div :class="[$style.div, $style.border]">动态CSS</div>
</template>

<style lang="less" module>
.div {
  color: red;
}
.border {
  border: 1px solid black;
}
</style>
```

```vue
<script setup lang="ts">
import { useCssModule } from 'vue'
const css = useCssModule('zs') // 打印出来后是一个对象，里面是哈希生成后的类名
// 常用于tsx render
</script>

<template>
  <!-- 如果moduel被命名，那么这里的$style必须换成那个名字 -->
  <div :class="[zs.div, zs.border]">动态CSS</div>
</template>

<style lang="less" module="zs">
/* 对module进行命名 */
.div {
  color: red;
}
.border {
  border: 1px solid black;
}
</style>
```

## 其他用 vue 控制 css 样式

```js
:class="isActive?'active':''"
:class="[三元1，三元2，三元3]" // 更通用
:class="obj"  // obj 是一个对象，可定义在script中，也可以直接写在行内。形如 {'active':isActive,'hide':isHide}

:style="字符串变量" // 可以用计算属性返回这个变量。形如 "color:red;"
:style="[字符串变量1, 字符串变量2]" // 更通用

/* 也可以用操作dom的方式修改样式 */
DOM元素.style.color="red"
DOM元素.style.background="blue"
```
