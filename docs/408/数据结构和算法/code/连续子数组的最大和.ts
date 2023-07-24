process.stdout.write('\x1bc')
export {}
// 输入一个整型数组, 数组里有正数也有负数. 数组中的一个或连续多个整数组成一个子数组
// 求所有子数组的和的最大值, 要求时间复杂度为O(n)
// 例如:{6,-3,-2,7,-15,1,2,2},连续子向量的最大和为8(从第0个开始,到第3个为止).

// 动态规划
// 遍历数组时,对每个元素,判断是否将其加入到档期子序列中,或者重新开启一个新的子序列
// 同时更新当前连续子序列的最大和
const arr = [6, -3, -2, 7, -15, 1, 2, 2]
const fn = (arr: number[]) => {
  let maxSum = arr[0]
  let currentSum = arr[0]

  for (let i = 1; i < arr.length; i++) {
    // 如果这里添加了新元素到子序列反而总和变小了,
    // 那就表示之前的子序列是负值,对后面的累加不再有贡献,应当丢弃并重开一个新的子序列
    currentSum = Math.max(arr[i], currentSum + arr[i])
    maxSum = Math.max(maxSum, currentSum)
  }
  return maxSum
}

console.log(fn(arr))
