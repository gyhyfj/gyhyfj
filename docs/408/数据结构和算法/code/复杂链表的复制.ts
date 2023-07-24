export {}
// 输入一个复杂链表 (每个节点中有节点值, 以及两个指针, 一个指向下一个节点, 另一个特殊指针指向任意一个节点) ,
// 返回结果为复制后复杂链表的head.

class SpecialListNode<T = unknown> {
  next: SpecialListNode<T> | null = null
  constructor(public value: T, public random: SpecialListNode<T> | null) {}
}

class SpecialLinkedList<T = unknown> {
  head: null | SpecialListNode<T>
  constructor() {
    this.head = null
  }
  *[Symbol.iterator]() {
    let current = this.head
    while (current) {
      yield [current.value, current.random?.value]
      current = current.next
    }
  }
}

const list = new SpecialLinkedList<number>()
const node1 = new SpecialListNode(1, null)
const node2 = new SpecialListNode(2, null)
const node3 = new SpecialListNode(3, null)
node1.random = node3
node2.random = node1
node3.random = node2
list.head = node1
node1.next = node2
node2.next = node3

// 创建一个空的结果链表, 和一个WeakMap
// 先从头到尾遍历原链表, 逐个把节点插入新链表, 其中random字段暂时设置为null, 同时在WeakMap中保持新旧节点的对应关系
// 然后再从头到尾遍历原链表, 逐个为新链表的random字段填充值, 值为每个旧节点根据WeakMap查找出的新节点
// 时间复杂度O(n), 空间复杂度O(n)

const fn = <U>(list: SpecialLinkedList<U>) => {
  const map = new WeakMap<SpecialListNode<U>, SpecialListNode<U>>()
  const res = new SpecialLinkedList<U>()
  let current = list.head
  let resCurrent = res.head
  while (current) {
    const newNode = new SpecialListNode(current.value, null)
    if (!resCurrent) {
      res.head = newNode
      resCurrent = newNode
    } else {
      resCurrent.next = newNode
      resCurrent = resCurrent.next
    }

    map.set(current, newNode)

    current = current.next
  }

  current = list.head
  resCurrent = res.head
  while (current) {
    resCurrent!.random = map.get(current.random!) ?? null

    current = current.next
    resCurrent = resCurrent!.next
  }

  return res
}

console.log('list-----------', ...fn(list)) // [ 1, 3 ] [ 2, 1 ] [ 3, 2 ]

// 也可以不借助WeakMap
// 先为原链表的每个节点后插入一个克隆节点
// 然后给复制的节点的random字段赋值
// 然后拆分链表
// 时间复杂度O(n), 空间复杂度O(n)
// 利用了新节点在旧节点之后, 来隐式地记录了新旧节点的对应关系

const fn2 = <U>(list: SpecialLinkedList<U>) => {
  const cloneNodes = (pHead: SpecialListNode<U>) => {
    let current: SpecialListNode<U> | null = pHead
    while (current) {
      const cloneNode: SpecialListNode<U> = new SpecialListNode(
        current.value,
        null
      )
      cloneNode.next = current.next
      current.next = cloneNode
      current = cloneNode.next
    }
  }

  const cloneRandom = (pHead: SpecialListNode<U>) => {
    let current: SpecialListNode<U> | null = pHead
    while (current) {
      const cloneNode: SpecialListNode<U> = current.next!
      if (current.random) {
        cloneNode.random = current.random.next
      }
      current = cloneNode.next
    }
  }

  const reconnectNodes = (pHead: SpecialListNode<U>) => {
    const cloneHead = pHead.next
    let cloneNode = pHead.next
    let current: SpecialListNode<U> | null = pHead
    while (current) {
      current.next = cloneNode!.next
      current = cloneNode!.next
      if (current) {
        cloneNode!.next = current.next
        cloneNode = current.next
      } else {
        cloneNode!.next = null
      }
    }
    return cloneHead
  }

  const pHead = list.head!
  cloneNodes(pHead)
  cloneRandom(pHead)
  return reconnectNodes(pHead)
}

console.log(fn2(list))
