process.stdout.write('\x1bc')
export {}

// 在一个字符串(0<=字符串长度<=10000，全部由字母组成)中找到第一个只出现一次的字符,
// 并返回它的索引, 如果没有则返回-1（需要区分大小写）

// 因为要返回原字符串第一个符合条件的元素
// 所以不能对这个字符串排序
// 可以创建一个 <字符-是否重复> 的map, 遍历字符串, 用map统计所有字符的重复情况
// 然后再遍历map, 遇到第一个不重复的字符, 则返回
// 空间复杂度O(n), 时间复杂度O(n)

const str = 'this is the book'
const fn = (str: string) => {
  if (!str.length) {
    return -1
  }

  const countMap = new Map<string, boolean>()

  for (let i = 0; i < str.length; i++) {
    countMap.set(str[i], countMap.has(str[i]))
  }
  for (let i = 0; i < str.length; i++) {
    if (!countMap.get(str[i])) {
      return i
    }
  }
}

console.log(fn(str))
