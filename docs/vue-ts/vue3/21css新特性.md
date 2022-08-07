# 21css 新特性

## vue 控制 css 样式

```js
:class="isActive?'active':''"
:class="[三元1，三元2，三元3]"
:class="obj"  // obj 是一个对象，可定义在script中，也可以直接写在行内。形如 {'active':isActive,'hide':isHide}

:style="字符串变量" // 可以用计算属性返回这个变量。形如 "color:red;"
:style="[字符串变量1, 字符串变量2]"

/* 也可以用操作dom的方式修改样式 */
DOM元素.style.color="red"
DOM元素.style.background="blue"
```
