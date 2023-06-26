import { ListNode, LinkedList } from './linkList'

// 0,1,...,n-1这n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字。求出这个圆圈里剩下的最后一个数字

const list = new LinkedList<number>()
const arr = Array.from({ length: 10 }, (_, k) => k) // 0 - 9
arr.reduce((_, curr) => list.append(curr), list)

let rear = list.head!
while (rear.next) {
  rear = rear.next
}
rear.next = list.head

// 用环形链表模拟这个过程
// 每次遍历到要删除节点的前一个点
// 直到最后只剩一个节点

const fn = <U>(list: LinkedList<U>, m: number) => {
  let p = list.head!
  while (p.next !== p) {
    console.log(p.value)
    for (let i = 0; i < m - 2; i++) {
      p = p.next!
    }
    p.next = p.next!.next
    p = p.next!
  }
  return p
}

console.log(fn(list, 3).value) // 3
