import { ListNode, LinkedList } from './linkList'

// 输入一个链表, 反转链表后, 输出新链表的表头

const list = new LinkedList<number>()
list.append(1).append(2).append(3).append(4)

// 将链表的头节点作为基准节点,
// 将基准节点的下一个节点逐个插入到链表头部, 直到后面没有节点

const fn = <U>(list: LinkedList<U>) => {
  if (!list.head) {
    return
  }

  let head = list.head
  let currentHead = head
  while (head.next) {
    const temp = head.next
    head.next = temp.next
    temp.next = currentHead
    currentHead = temp
    list.head = currentHead
  }

  return currentHead
}

// 也可以先找到尾节点,
// 然后从头节点开始逐个移除并插入到尾节点后面

// const fn = <U>(list: LinkedList<U>) => {
//   if (!list.head) {
//     return
//   }
//   let rear = list.head
//   while (rear.next) {
//     rear = rear.next
//   }

//   let head = list.head

//   while (head !== rear) {
//     const temp = head
//     head = head.next!
//     list.head = head
//     temp.next = rear.next
//     rear.next = temp
//   }

//   return head
// }

fn(list)
console.log('list-----------', ...list) // 4 3 2 1
