export class Stack<U = unknown> {
  private list: U[] = []
  get length() {
    return this.list.length
  }
  pop() {
    return this.list.pop()
  }
  push(item: U) {
    this.list.push(item)
    return this
  }
  *[Symbol.iterator]() {
    for (let item of this.list) {
      yield item
    }
  }
}
