import { LinkedList } from './linkList'

// 输入一个链表，按链表值从尾到头的顺序返回一个ArrayList

// 从头到尾遍历，通过unshift插入数组即可

const linkedList = new LinkedList<number>()
linkedList.append(1).append(2).append(3)

const fn = <U>(list: LinkedList<U>) => {
  const res: U[] = []
  let p = list.head
  while (p) {
    res.unshift(p.value)
    p = p.next
  }
  return res
}

console.log(fn(linkedList))
