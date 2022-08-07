# KeepAlive 缓存组件

也可写作`keep-alive`

## 基本使用

切换组件时候，第一种方法是使用动态组件，第二方法是用 v-if 和 v-else 控制组件切换

如果使用内置的 `<KeepAlive>` 组件将这些切换的组件包装起来，那么在组件切换时状态也能被保留，不会发生 unMounted。

一个持续存在的组件可以通过 `onActivated()` 和 `onDeactivated()` 注册相应的两个状态的生命周期钩子

## 包含/排除

默认情况下，`<KeepAlive>` 会缓存内部的任何组件实例。但我们可以通过 `include` 和 `exclude` prop 来定制该行为。这两个 prop 的值都可以是一个以英文逗号分隔的字符串、一个正则表达式，或是包含这两种类型的一个数组。

```vue
<!-- 以英文逗号分隔的字符串 -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```

它会根据组件的 `name` 选项进行匹配，**所以组件如果想要条件性地被 KeepAlive 缓存，就必须显式声明一个 name 选项**。

## 最大缓存实例数

我们可以通过传入 `max` prop 来限制可被缓存的最大组件实例数。
如果缓存的实例数量即将超过指定的那个最大数量，则**最久没有被访问的缓存实例将被销毁**，以便为新的实例腾出空间

```vue
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```
