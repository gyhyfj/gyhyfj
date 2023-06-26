import { ListNode, LinkedList } from './linkList'

// 给一个链表，若其中包含环，请找出该链表的环的入口结点，否则，输出null

const list = new LinkedList<number>()
const arr = Array.from({ length: 6 }, (_, k) => k + 1)
arr.reduce((_, curr) => list.append(curr), list)

let rear = list.head
let node3
while (rear?.next) {
  if (!node3 && rear.value === 3) {
    node3 = rear
  }
  rear = rear.next
}

rear!.next = node3! // 1 2 3 4 5 6 , 6->3, 环长是4

// console.log(...list) // 此时会无限循环, 因此链表不应当实现迭代协议, 除非保证没有环

// 判断链表是否有环： P1 P2 从头部出发，P1走两步，P2走一步，如果可以相遇，则环存在
// 从环内某个节点开始计数，再回到此节点时得到链表环的长度 length
// P1、P2 回到head节点，让 P1 先走 length 步，然后P1P2一起单步前进,当P2和P1相遇时即为链表环的起点
const fn = <U>(list: LinkedList<U>) => {
  if (!list.head || !list.head.next) {
    return null
  }

  // 判断是否有环, 如果最终没有则return
  let p1: ListNode | null = list.head
  let p2: ListNode | null = list.head
  do {
    if (!p1 || !p2 || !p2.next) {
      return null
    }
    p1 = p1.next
    p2 = p2.next.next
  } while (p1 !== p2)

  // 获取环的长度
  let temp = p1
  let length = 0
  do {
    temp = temp!.next
    length++
  } while (temp !== p1)

  // 找开始节点
  p1 = p2 = list.head
  while (length-- > 0) {
    p2 = p2.next!
  }
  while (p1 !== p2) {
    p1 = p1.next!
    p2 = p2.next!
  }
  return p1
}

console.log(fn(list)?.value) // 3
