process.stdout.write('\x1bc')
export {}
// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标

const arr = [1, 2, 3, 4, 5]
const S = 7

// 创建一个map (value - index)
// 遍历数组，根据减法去找map中有无匹配的成员，
// 如果有则返回，如果没有则把自己存入map

const fn = (nums: number[], target: number) => {
  const map = new Map() // value - index
  for (let i = 0; i < nums.length; i++) {
    let value = nums[i]
    if (map.has(target - value)) {
      return [map.get(target - value), i]
    } else {
      map.set(value, i)
    }
  }

  return []
}

console.log(fn(arr, S))
