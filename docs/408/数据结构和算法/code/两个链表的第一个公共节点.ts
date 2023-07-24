import { ListNode, LinkedList } from './linkList'
// 输入两个链表, 找出它们的第一个公共结点

const list1 = new LinkedList<number>()
const list2 = new LinkedList<number>()
const arr1 = Array.from({ length: 10 }, (_, k) => k) // 0 - 9
const arr2 = Array.from({ length: 5 }, (_, k) => k) // 0 - 4
arr1.reduce((_, curr) => list1.append(curr), list1)
arr2.reduce((_, curr) => list2.append(curr), list2)
let rear = list2.head!
while (rear.next) {
  rear = rear.next
}
rear.next = list1.head!.next!.next!.next // 值为3的节点
// 0 1 2 3 4 5 6 7 8 9 长度是10
// 0 1 2 3 4 -> 3 4 5 6 7 8 9 长度是12

// 解法1: WeakSet
// 先遍历第一个链表, 把节点全部加入WeakSet
// 然后遍历第二个链表, 逐个查询WeakSet中有无该节点, 有则返回
// 时间复杂度O(n), 空间复杂度O(n)
const fn = <U>(list1: LinkedList<U>, list2: LinkedList<U>) => {
  const set = new WeakSet<ListNode<U>>()
  let p = list1.head
  while (p) {
    set.add(p)
    p = p.next
  }
  p = list2.head
  while (p) {
    if (set.has(p)) {
      return p
    }
    p = p.next
  }
  return null
}

console.log(fn(list1, list2))

// 解法2: 双指针
// 先找到两个链表的长度length1、length2
// 让长一点的链表先走length2-length1步, 让长链表和短链表起点相同
// 两个链表一起前进, 比较获得第一个相等的节点
// 时间复杂度O(n) 空间复杂度O(1)
const fn2 = <U>(list1: LinkedList<U>, list2: LinkedList<U>) => {
  let len1 = 0,
    len2 = 0
  let p1: ListNode<U> | null = list1.head
  while (p1) {
    p1 = p1.next
    len1++
  }
  let p2: ListNode<U> | null = list2.head
  while (p2) {
    p2 = p2.next
    len2++
  }
  p1 = list1.head
  p2 = list2.head

  if (len1 > len2) {
    let i = len1 - len2
    while (i--) {
      p1 = p1!.next
    }
  }
  if (len1 < len2) {
    let i = len2 - len1
    while (i--) {
      p2 = p2!.next
    }
  }

  let i = Math.min(len1, len2)
  while (i--) {
    if (p1 === p2) {
      return p1
    }
    p1 = p1!.next
    p2 = p2!.next
  }
  return null
}

console.log(fn2(list1, list2))
