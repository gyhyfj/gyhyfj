import { ListNode, LinkedList } from './linkList'

// 输入一个链表，输出该链表中倒数第k个结点

const list = new LinkedList<number>()
const arr = Array.from({ length: 10 }, (_, k) => k) // 0 - 9

arr.reduce((_, curr) => list.append(curr), list)

// 解法一：遍历
// 求链表长度为len
// 倒数第1个就是取head的next取len-1次
// 倒数第k个就是取head的next取len-k次
const fn = <U>(list: LinkedList<U>, k: number) => {
  let p: ListNode<U> | null = list.head!
  let len = 0
  while (p) {
    len++
    p = p.next
  }
  p = list.head!

  if (k > len && k <= 0) {
    return null
  }

  let i = len - k
  while (i--) {
    p = p!.next
  }
  return p
}

console.log(fn(list, 2)?.value) // 8

// 解法二：双指针
// 设定两个指针，第一个指针指向头节点，第二个指针和第一个指针间距k个节点，
// 让这两个指针同时向后移动
// 当后面的指针到达终点，取前面的指针指向的节点

const fn2 = <U>(list: LinkedList<U>, k: number) => {
  let p1 = list.head!
  let p2 = list.head!
  for (let i = 0; i < k - 1; i++) {
    p1 = p1.next!
  }
  while (p1.next) {
    p1 = p1.next
    p2 = p2.next!
  }
  return p2
}

console.log(fn2(list, 2).value) // 8
