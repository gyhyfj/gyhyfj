import { ListNode, LinkedList } from './linkList'

// 给定单链表的头指针和要删除的指针节点，在O(1)时间内删除该节点。

const list = new LinkedList<number>()
list.append(1).append(2).append(3).append(4)

const head: ListNode<number> = list.head!
const node = list.head!.next!.next! // { next: ListNode { next: null, value: 4 }, value: 3 }

// 三种情况:
// 1.删除的节点不是尾部节点 - 将当前节点改为下一个节点
// 2.删除的节点是尾部节点且等于头节点，即链表中只有一个节点 - 将头节点置为null
// 3.删除的节点是尾节点且不是头节点 - 遍历到末尾的前一个节点删除，因为这种情况概率是1/n, 因此平均时间复杂度也是O(1)

const fn = <U>(head: ListNode<U>, node: ListNode<U>) => {
  list.length--
  // node后有其他节点
  if (node.next) {
    node.value = node.next.value
    node.next = node.next.next
  }
  // node后没有其他节点且是头节点
  else if (node === head) {
    head = null as any
    node = null as any
  }
  // node后没有其他节点且不是头节点
  else {
    let p = head
    while (p.next !== node) {
      // 或者 while(p.next.next){  因为这种情形node是尾节点
      p = p.next!
    }
    p.next = null
    node = null as any
  }
}

fn(head, node)
