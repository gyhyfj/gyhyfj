process.stdout.write('\x1bc')
export {}
// 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字
// 例如输入一个长度为9的数组{1,2,3,2,2,2,5,4,2}
// 由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0

// 解法1 开辟一个新空间遍历时去记录每个元素出现的次数
// 解法2 摩尔投票算法
// 目标值的个数比其他所有值加起来的数多
// 初始化候选元素和计数器, 初始值分别为数组的第一个元素和 1
// 遍历数组, 当前元素和候选元素相等 ? 计数器+1 : 计数器-1
// 计数器变为0后更新候选元素, 并将计数器重置为1
// 结束投票后, 再遍历一遍, 验证候选元素是否符合条件

const arr = [1, 2, 3, 2, 2, 2, 5, 4, 2]
const fn = (arr: number[]) => {
  let candidate = arr[0]
  let count = 1
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === candidate) {
      count++
    } else {
      count--
    }
    if (count === 0) {
      candidate = arr[i]
      count = 1
    }
  }
  // 重置计数器, 也可以额外用一个新变量
  count = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === candidate) {
      count++
    }
  }
  return count > arr.length / 2 ? candidate : 0
}

console.log(fn(arr))
