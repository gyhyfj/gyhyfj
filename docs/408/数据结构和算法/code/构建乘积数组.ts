process.stdout.write('\x1bc')
export {}

// 给定一个数组A[0,1,...,n-1], 请构建一个数组B[0,1,...,n-1],
// 其中B中的元素B[i]=A[0]*A[1]*...*A[i-1]*A[i+1]*...*A[n-1]
// 不能使用除法

const nums = [-1, 0, 1, 2, -1, 1, -1, -1, 1, -1, 0, 1, -1]

// 分为上下两个三角
// 先计算下三角
// 再创建一个临时变量, 计算上三角的值, 计算出一个乘到对应的结果上
// 下三角没必要声明一个数组来存储
const fn = (nums: number[]) => {
  // 计算下三角
  const res = []
  res[0] = 1
  for (let i = 1; i < nums.length; i++) {
    res[i] = res[i - 1] * nums[i - 1]
  }

  // 计算还需要乘的部分
  let temp = 1
  for (let i = nums.length - 2; i >= 0; i--) {
    temp *= nums[i + 1]
    res[i] *= temp
  }

  return res
}

console.log(fn(nums))
