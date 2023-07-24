process.stdout.write('\x1bc')
export {}
// 给定一个包含 n 个整数的数组nums, 判断 nums 中是否存在三个元素a b c , 使得 a + b + c = 0
// 找出所有满足条件且不重复的三元组

const arr = [-1, 0, 1, 2, -1]

// 为了方便去重, 我们首先将数组排序
// 对数组进行遍历, 取当前遍历的数为一个基准数, 遍历数后面的数组为寻找数组
// 再寻找数组中设定两个起点, 最左侧的left(i+1)和最右侧的right(length-1)
// 判断三数之和是否等于0, 如果等于0, 加入结果, 并分别将left和right移动一位
// 如果结果大于0, 将right向左移动一位, 向结果逼近
// 如果结果小于0, 将left向右移动一位, 向结果逼近
// 逼近过程中也要去重

const fn = (nums: number[]) => {
  // 先排序
  nums.sort((a, b) => a - b)
  const result = []
  for (let i = 0; i < nums.length; i++) {
    // 跳过重复数字, 找到基准数字
    if (i && nums[i] === nums[i - 1]) {
      continue
    }
    // 在基准数字右侧区间开始双指针遍历
    let left = i + 1
    let right = nums.length - 1
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right]
      if (sum > 0) {
        right--
      } else if (sum < 0) {
        left++
      } else {
        result.push([nums[i], nums[left++], nums[right--]])
        // 跳过重复数字
        // 如果新的left和上一次的left一样
        while (nums[left] === nums[left - 1]) {
          left++
        }
        // 跳过重复数字
        // 如果新的right和上一次的right一样
        while (nums[right] === nums[right + 1]) {
          right--
        }
      }
    }
  }
  return result
}

console.log(fn(arr))
