process.stdout.write('\x1bc')
export {}
// 输入一个矩阵, 按照从外向里以顺时针的顺序依次打印出每一个数字.

// 例如, 如果输入如下4 X 4矩阵:

// 1  2   3   4
// 5  6   7   8
// 9  10  11  12
// 13 14  15  16

// 则依次打印出数字1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10.

const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
]

// 将复杂的矩阵拆解成若干个圈, 循环打印矩阵, 每次打印其中一个圈
// 循环的结束条件是下一轮的打印的起点索引超过了矩阵宽高的一半
// 最后一轮打印需要分情况: 只向右, 向右一格后向下, 向右后向下又向左, 向右后向下向左再向上
const fn = (matrix: number[][]) => {
  let start = 0
  let rows = matrix.length
  let columns = matrix[0]?.length
  let result: number[] = []
  if (!rows || !columns) {
    return false
  }
  while (columns > start * 2 && rows > start * 2) {
    printCircle(matrix, start, columns, rows, result)
    start++
  }
  return result
}

// 打印一圈的函数
const printCircle = (
  matrix: number[][],
  start: number, // 起点的索引(i j 是一样的)
  columns: number,
  rows: number,
  result: number[]
) => {
  // 本轮打印 右下角的索引
  // 4x4 矩阵 第一轮打印的右下角索引是 3 3
  let entX = columns - start - 1
  let endY = rows - start - 1
  // 先打印上边
  for (let i = start; i <= entX; i++) {
    result.push(matrix[start][i])
  }
  // 如果需要继续向下打印
  if (endY > start) {
    // 打印这一列
    for (let i = start + 1; i <= endY; i++) {
      result.push(matrix[i][entX])
    }
    // 如果需要继续向左打印
    if (entX > start) {
      for (let i = entX - 1; i >= start; i--) {
        result.push(matrix[endY][i])
      }
      // 如果需要继续向上打印
      if (endY > start + 1) {
        for (let i = endY - 1; i > start; i--) {
          result.push(matrix[i][start])
        }
      }
    }
  }
}

console.log(fn(matrix))
