# 虚拟 Dom 和 diff 算法

https://www.bilibili.com/video/BV1dS4y1y7vd?p=9

## 虚拟 Dom

// TODO 是否正确？
为什么要有虚拟 DOM？因为一个 dom 上面的属性是非常多的，直接操作 DOM 非常浪费性能
解决方案就是 我们可以用 JS 的计算性能来换取操作 DOM 所消耗的性能，既然我们逃不掉操作 DOM 这道坎，但是我们可以尽可能少的操作 DOM。操作 JS 是非常快的

## diff 算法
