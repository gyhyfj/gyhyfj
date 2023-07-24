export {}

// 输入两个整数序列, 第一个序列表示栈的压入顺序, 请判断第二个序列是否可能为该栈的弹出顺序
// 假设压入栈的所有数字均不相等
// 例如序列1,2,3,4,5是某栈的压入顺序, 序列4,5,3,2,1是该压栈序列对应的一个弹出序列, 但4,3,5,1,2就不可能是该压栈序列的弹出序列
// 注意: 这两个序列的长度是相等的

const arr1 = [1, 2, 3, 4, 5]
const arr2 = [4, 5, 3, 2, 1]
const arr3 = [4, 3, 5, 1, 2]

// 创建一个栈来模拟这个过程
// 每次进队一个元素后, 就尽可能试图出队
// 如果一切正常, 最终栈应为空

const fn = (arr1: number[], arr2: number[]) => {
  const stack: number[] = []
  const copiedArr2 = [...arr2]

  for (let item of arr1) {
    stack.push(item)
    // 尽可能出队
    while (stack.length > 0 && copiedArr2[0] === stack[stack.length - 1]) {
      stack.pop()
      copiedArr2.shift()
    }
  }

  return stack.length === 0
}

console.log(fn(arr1, arr2)) // true
console.log(fn(arr1, arr3)) // false

// 和上面思路相同, 只是通过一个索引变量, 记录出栈序列栈顶的位置, 而不是克隆一份出栈序列
// 可以减少空间复杂度和时间复杂度
const fn2 = (arr1: number[], arr2: number[]) => {
  const stack: number[] = []
  let i = 0

  for (let item of arr1) {
    stack.push(item)
    // 尽可能出队
    while (stack.length > 0 && arr2[i] === stack[stack.length - 1]) {
      stack.pop()
      i++
    }
  }

  return stack.length === 0
}

console.log(fn2(arr1, arr2)) // true
console.log(fn2(arr1, arr3)) // false
