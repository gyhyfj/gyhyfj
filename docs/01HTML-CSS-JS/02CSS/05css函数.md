# CSS 函数

## calc

width：calc(100% - 80px);

可以混合各种单位进行计算
注意：括号里面可以使用`+ - * /`来进行计算。注：`+ - * /`前后要各加上一个空格。
场景：使用计算属性来适应容器大小

## attr

获取选中元素的属性值
除了 content 外，其余都还是试验性的

```vue
<template>
  <div id="box" customArr="hello"></div>
</template>

<style lang="scss" scoped>
#box::after {
  content: attr(customArr);
}
</style>
```
