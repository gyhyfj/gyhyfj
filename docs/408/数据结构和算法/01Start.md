# Get Start

数据结构和算法 对 建立解决问题的思想 非常重要,
先设计数据结构, 再施加算法即可

学习方法是:
全方位了解 分类练习 定期回顾和总结(每种题目的规律)

资料是:
先剑指 offer 然后力扣的简单、中等问题,
不可在刁钻古怪的问题上浪费太多时间

https://juejin.cn/post/6844903919722692621

https://www.conardli.top

## 复杂度

时间复杂度 和 空间复杂度 排序是:
1
log n
n
n^2
n^3
2^n
n!

## 数据结构

可以从 逻辑结构+存储结构 理解

逻辑结构有:
线性结构 - 栈 队列 链表 线性表
非线性结构 - 二位数组 树

存储结构有:
(存储结构是逻辑结构用计算机语言的实现)
顺序存储 链式存储 散列存储

## 算法

排序 二分查找 递归 广度优先搜索 深度优先搜索 回溯算法 动态规划 贪心算法

## 数组

双指针
这种技巧经常在排序数组中使用

<!-- prettier-ignore-start -->
::: code-group
<<< ./code/调整数组顺序使奇数位于偶数前面.ts
<<< ./code/和为S的两个数字.ts
<<< ./code/和为S的连续正数序列.ts
:::
<!-- prettier-ignore-end -->

N 数之和问题
基本上都是一个套路, 主要考虑如何降低时间复杂度, 而且也会用到上面的双指针技巧
做法都是先排序, 然后通过首尾双指针来逼近结果, 从而达到降低一层时间复杂度的效果

<!-- prettier-ignore-start -->
::: code-group
<<< ./code/两数之和.ts
<<< ./code/三数之和.ts
<<< ./code/四数之和.ts
:::
<!-- prettier-ignore-end -->

二维数组
需要用到抽象建模能力

<!-- prettier-ignore-start -->
::: code-group
<<< ./code/构建乘积数组.ts
<<< ./code/顺时针打印矩阵.ts
:::
<!-- prettier-ignore-end -->

数据统计
数组的统计和计算, 如何降低算法复杂度

<!-- prettier-ignore-start -->
::: code-group
<<< ./code/数组中出现次数超过数组长度一半的数字.ts
<<< ./code/连续子数组的最大和.ts
<<< ./code/扑克牌顺子.ts
<<< ./code/第一个只出现一次的字符.ts
:::
<!-- prettier-ignore-end -->

## 链表

需要遍历才能查询到元素, 查询慢
插入元素只需断开连接重新赋值, 插入快

基本应用

<!-- prettier-ignore-start -->
::: code-group
<<< ./code/从尾到头打印链表.ts
<<< ./code/删除链表中的节点.ts
<<< ./code/反转链表.ts
<<< ./code/复杂链表的复制.ts
:::
<!-- prettier-ignore-end -->

环类问题

<!-- prettier-ignore-start -->
::: code-group
<<< ./code/链表中环的入口.ts
<<< ./code/圆圈中最后剩下的数字.ts
:::
<!-- prettier-ignore-end -->

双指针

两个指针从不同位置出发
两个指针以不同速度移动

<!-- prettier-ignore-start -->
::: code-group
<<< ./code/两个链表的第一个公共节点.ts
<<< ./code/链表的倒数第k个节点.ts
:::
<!-- prettier-ignore-end -->

## 栈和队列

两种限制访问顺序的数据结构: 栈 (后进先出) 、队列 (先进先出)

<!-- prettier-ignore-start -->
::: code-group
<<< ./code/用两个栈实现队列.ts
<<< ./code/包含最小值函数的栈.ts
<<< ./code/栈的压入弹出序列.ts
<<< ./code/滑动窗口的最大值.ts
:::
<!-- prettier-ignore-end -->

## 二叉树

二叉树是每个节点最多有两个子树的树结构, 通常子树被称作“左子树”和“右子树”

二叉树遍历
