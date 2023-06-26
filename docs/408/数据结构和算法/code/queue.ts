export class Queue<U = unknown> {
  private list: U[] = []

  push(item: U) {
    this.list.push(item)
    return this
  }
  pop() {
    return this.list.shift()
  }
  get length() {
    return this.list.length
  }
  *[Symbol.iterator]() {
    for (let item of this.list) {
      yield item
    }
  }
}
