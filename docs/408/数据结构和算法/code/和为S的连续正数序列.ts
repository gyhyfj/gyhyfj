// 输入一个正数S, 打印出所有和为S的连续正数序列
// 输入15, 1+2+3+4+5 = 4+5+6 = 7+8 = 15 所以打印出3个连续序列1-5, 4-6和7-8
process.stdout.write('\x1bc')
export {}
// 创建一个容器child, 用于记录当前的子序列, 初始元素为1,2
// 记录子序列的开头元素small和末尾元素big
// big向右移动子序列末尾增加一个数 small向右移动子序列开头减少一个数
// 当子序列的和大于目标值, small向右移动, 子序列的和小于目标值, big向右移动

const S = 15

const fn = (S: number) => {
  const result = []
  const child = [1, 2]
  let small = 1
  let big = 2
  let currentSum = small + big
  // 子序列右移到尾之前
  while (big < S) {
    // 此处循环让currentSum >= S
    // big右移, 更新currentSum
    while (currentSum < S && big < S) {
      child.push(++big)
      currentSum += big
    }
    // 此处循环让currentSum <= S
    // small右移, 更新currentSum
    while (currentSum > S && small < big) {
      child.shift()
      currentSum -= small++
    }
    // 如果等于S
    // big右移, 更新currentSum
    if (currentSum === S && child.length > 1) {
      result.push([...child])
      child.push(++big)
      currentSum += big
    }
  }
  return result
}

console.log(fn(S))
