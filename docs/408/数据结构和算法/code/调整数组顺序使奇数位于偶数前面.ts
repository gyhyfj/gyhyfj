process.stdout.write('\x1bc')
export {}

// 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，
// 使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分

const arr = [1, 2, 3, 4, 5]
const isOdd = (n: number): boolean => Boolean(n % 2) // 是否为奇数

// // 遇到一个偶数 就移动到数组尾部 直到遍历一遍  n^2
// let current = 0
// for (let i = 0; i < arr.length; i++) {
//   if (isOdd(arr[current])) {
//     current++
//   } else {
//     arr.push(arr[current])
//     arr.splice(current, 1)
//   }
// }

// 两个指针，从头尾开始向中间靠近，如果左边遇到偶数，右边遇到奇数，就交换位置
// 如果尾指针走到了前面 就结束
let head = 0
let rear = arr.length - 1

while (head < rear) {
  while (isOdd(arr[head])) {
    head++
  }
  while (!isOdd(arr[rear])) {
    rear--
  }
  if (head < rear) {
    ;[arr[head], arr[rear]] = [arr[rear], arr[head]]
  }
  console.log(head, rear)
}

console.log(arr)

export {}
