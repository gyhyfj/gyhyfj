# Transition 过渡组件

## 简介

`<Transition>` 可以将进入和离开动画应用到通过默认插槽传递给它的元素或组件上。
进入或离开由以下条件触发：

- v-if
- v-show
- component 动态组件

::: tip
`<Transition>` 仅支持单个元素或组件作为其插槽内容。如果内容是一个组件，这个组件必须仅有一个根元素。
:::

当一个 `<Transition>` 组件中的元素被插入或移除时，会发生下面这些事情：

1. Vue 会自动检测目标元素是否应用了 CSS 过渡或动画。如果是，则一些 CSS 过渡 class 会在适当的时机被添加和移除。
2. 如果有作为监听器的 JavaScript 钩子，这些钩子函数会在适当时机被调用。
3. 如果没有探测到 CSS 过渡或动画、没有提供 JavaScript 钩子，那么 DOM 的插入、删除操作将在浏览器的下一个动画帧上执行

## 基于 CSS 的 transition 的过渡

一共有 6 个用于进入与离开过渡效果的 CSS class。

![](https://staging-cn.vuejs.org/assets/transition-classes.f0f7b3c9.png)

用法：

1. 为 Transition 组件命名
   ```vue
   <Transition name="slide">...</Transition>
   ```
2. 对已命名的 Transition 组件添加 class 类。类名由 Transition 组件的 name 属性拼接而成

   ```css
   /*
   进入和离开动画可以使用不同
   持续时间和速度曲线。
   */
   .slide-fade-enter-active {
     transition: all 0.3s ease-out;
   }
   .slide-fade-leave-active {
     transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
   }
   .slide-fade-enter-from,
   .slide-fade-leave-to {
     transform: translateX(20px);
     opacity: 0;
   }
   ```

3. 可以通过向 `<Transition>` 组件传入 duration prop 来显式指定过渡的持续时间 (以毫秒为单位)

   ```vue
   <Transition :duration="550">...</Transition>
   ```

此外，还可以对这 6 个类名进行自定义的重命名：
这样，Transation 组件的 name 属性就不是必须的了
（好处是可以结合一些**第三方 css 样式**库来使用，如 [Animate](https://animate.style/)）。

```ts
<Transition enter-from-class="e-from" name="slide"> ... </Transiton>
```

## Transition 的生命周期

[JavaScript 钩子](https://staging-cn.vuejs.org/guide/built-ins/transition.html#javascript-hooks)
[JavaScript 钩子](https://www.bilibili.com/video/BV1dS4y1y7vd?p=32&spm_id_from=pageDriver&vd_source=ff2fd86e72864c50e704e6c654ed5e5f)

## 基于 CSS 的 animation 的过渡

## TransitionGroup
