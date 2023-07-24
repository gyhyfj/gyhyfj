export {}
// 定义栈的数据结构, 请在该类型中实现一个能够得到栈中所含最小元素的min函数 时间复杂度应为O(1)

// 1.定义两个栈, 一个栈用于存储数据, 另一个栈用于存储每次数据进栈时栈的最小值
// 2.每次数据进栈时, 将此数据和最小值栈的栈顶元素比较, 将二者比较的较小值再次存入最小值栈
// 4.数据栈出栈, 最小值栈也出栈
// 3.这样最小值栈的栈顶永远是当前栈的最小值
// 时间复杂度O(1) 空间复杂度O(n)
// [3,4,2,7,9,0] -> [3,3,2,2,2,0]

class Stack {
  private list: number[] = []
  private minStack: number[] = []
  push(item: number) {
    this.list.push(item)
    this.minStack.push(
      this.minStack.length
        ? Math.min(item, this.minStack[this.minStack.length - 1])
        : item
    )
    return this
  }
  pop() {
    this.minStack.pop()
    return this.list.pop()
  }
  min() {
    return this.minStack[this.minStack.length - 1]
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

const stack = new Stack()
console.log(stack.min()) // undefined
stack.push(2)
stack.push(1)
stack.push(3)
console.log(stack.min()) // 1
stack.pop()
stack.pop()
console.log(stack.min()) // 2
