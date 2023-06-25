// 输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得他们的和正好是S，
// 如果有多对数字的和等于S，输出两个数的乘积最小的

const arr = Array.from({ length: 100 }, (_, k) => k * k)

console.log('\x1bc')
console.log(arr)

const S = 200

// 想要乘积最小，就需要两数在范围的两端
// 两个指针从首尾向中间靠近
const findNumbersWithSum = (array: number[], sum: number) => {
  if (array && array.length > 0) {
    let left = 0
    let right = array.length - 1
    while (left < right) {
      const s = array[left] + array[right]
      if (s > sum) {
        right--
      } else if (s < sum) {
        left++
      } else {
        return [array[left], array[right]]
      }
    }
  }
  return []
}

console.log(findNumbersWithSum(arr, S))

export {}
