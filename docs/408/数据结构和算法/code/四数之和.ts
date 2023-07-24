process.stdout.write('\x1bc')
export {}

// 给定一个包含 n 个整数的数组nums, 判断 nums 中是否存在四个元素a, b, c, d , 使得 a + b + c + d = 0
// 找出所有满足条件且不重复的四元组

const nums = [-1, 0, 1, 2, -1, 1, -1, -1, 1, -1, 0, 1, -1]

// 类似三数之和, 以及五数之和, 六数之和...
// 做法都是先排序, 然后通过首尾双指针来逼近结果, 从而达到降低一层时间复杂度的效果
const fn = (nums: number[], target: number) => {
  if (nums.length < 4) {
    return []
  }

  nums.sort((a, b) => a - b)
  const result = []
  for (let i = 0; i < nums.length - 3; i++) {
    if (i && nums[i] === nums[i - 1]) {
      continue
    }
    if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
      break
    }
    for (let j = i + 1; j < nums.length - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) {
        continue
      }
      let left = j + 1,
        right = nums.length - 1
      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right]
        if (sum === target) {
          result.push([nums[i], nums[j], nums[left], nums[right]])
        }
        if (sum <= target) {
          while (nums[left] === nums[++left]);
        } else {
          while (nums[right] === nums[--right]);
        }
      }
    }
  }

  return result
}

console.log(fn(nums, 0))
