# Teleport 传送组件

`<Teleport>` 是一个内置组件，使我们可以将一个组件的一部分模板“传送”到该组件的 DOM 层次结构之外的 DOM 节点中。
不受逻辑上的父级的 style 和 v-show 属性控制，但接受 v-if 属性控制。
`<Teleport to="选择器">` 传送的内容，不受父级 style、v-show 等属性的影响，但 data、prop 依旧能够公用，类似于 Reactive 的 Portal
to 属性指定插入的位置

::: tip
`<Teleport>` 挂载时，传送门的 to 目标必须是已经存在于 DOM 之中。理想情况下，这应该是整个 Vue 应用程序之外的一个元素。如果目标是由 Vue 呈现的另一个元素，你需要确保在 `<Teleport>` 之前挂载该元素。
:::

如果 `<Teleport>` 里面的元素有绝对定位，那么**其绝对定位的实现，取决于传送后的环境**，即向上寻找有定位的祖先元素，直至 html

目前有 bug，css v-bind 在传送门组件不生效
