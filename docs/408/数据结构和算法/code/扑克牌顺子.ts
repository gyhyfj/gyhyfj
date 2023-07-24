process.stdout.write('\x1bc')
export {}
// 扑克牌中随机抽5张牌, 判断是不是一个顺子, 即这5张牌是不是连续的.
// 2-10为数字本身, A为1, J为11...大小王可以看成任何数字, 可以把它当作0处理.

// 这里的大小王是作为万能牌
// 先对给定数组进行排序,
// 遍历数组, 记录大小王的张数, 累积记录每张牌之间的间隔-1, 如果是正常连续的应该是0
// 遍历时顺带检测如果有重复, 直接返回false
// 最后检查 大小王张数能否填补累积的间隔
// 因为排序时大小王值为0已经排到了数组开头, 所以后面统计间隔时候不会遇到大小王
const arr = [0, 8, 9, 7, 5]
const fn = (arr: number[]) => {
  arr.sort((a, b) => a - b)
  let kingCount = 0
  let spaceCount = 0
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === 0) {
      kingCount++
      continue
    }
    const space = arr[i + 1] - arr[i]
    if (!space) {
      return false
    } else {
      spaceCount += space - 1
    }
  }
  return kingCount - spaceCount >= 0
}

console.log(fn(arr))
