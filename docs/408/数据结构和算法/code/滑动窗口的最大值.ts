export {}

// 给定一个数组 nums, 有一个大小为 k 的滑动窗口
// 滑动窗口从数组的最左侧移动到数组的最右侧
// 你只可以看到在滑动窗口 k 内的数字
// 滑动窗口每次只向右移动一位
// 返回滑动窗口中任意时刻出现的最大的数值

// 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
// 输出: [3,3,5,5,6,7]
//
//  滑动窗口的位置               最大值
// ----------------              -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7

const nums = [1, 3, -1, -3, 5, 3, 6, 7]
const k = 3

// 使用一个队列存储处于窗口中的值的下标, 同时保证窗口头部元素永远是窗口最大值
// 1.当前进入的元素下标 - 窗口头部元素的下标 >= k , 则头部元素移出队列
// 2.如果当前进入的元素大于队列尾, 则删除队列尾, 直到当前数字小于等于队列尾, 或者队列空
//  (保证窗口中左侧的值均大于当前入队列的值, 这样做可以保证当下次循环窗口头部的元素出队后, 窗口头部元素仍然为最大值)
// 3.完成上述操作后 当前元素正式入队
// 4.第k次遍历后 (此时第一个窗口已完成加载) 开始向结果中添加最大值
const fn = (arr: number[], k: number) => {
  const result: number[] = [] // 结果数组
  const window: number[] = [] // 窗口元素索引队列
  for (let i = 0; i < arr.length; i++) {
    // NaN > 2 false
    if (i - window[0] >= k) {
      window.shift()
    }
    let j = window.length - 1
    while (j >= 0 && arr[window[j]] <= arr[i]) {
      j--
      window.pop()
    }
    window.push(i)
    if (i >= k - 1) {
      result.push(arr[window[0]])
    }
  }
  return result
}

console.log(fn(nums, k)) // [ 3, 3, 5, 5, 6, 7 ]
