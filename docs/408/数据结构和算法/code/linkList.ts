export class ListNode<T = unknown> {
  next: ListNode<T> | null = null
  constructor(public value: T) {}
}

export class LinkedList<T = unknown> {
  head: null | ListNode<T> = null
  length = 0
  append(val: T) {
    const newNode = new ListNode(val)
    if (!this.head) {
      this.head = newNode
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = newNode
    }
    this.length++
    return this
  }
  *[Symbol.iterator]() {
    let current = this.head
    while (current) {
      yield current.value
      current = current.next
    }
  }
}
