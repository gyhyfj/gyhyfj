import { Stack } from './stack'

// 用两个栈来实现一个队列, 完成队列的Push和Pop操作.  队列中的元素为int类型

// 入队时候把数值入栈stack1
// 出队时候如果stack2为空, 就把stack1中的元素逐个出栈再入栈stack2
const fn = () => {
  const stack1 = new Stack<number>()
  const stack2 = new Stack<number>()

  return {
    push(n: number) {
      stack1.push(n)
    },
    pop() {
      if (stack2.length === 0) {
        while (stack1.length) {
          stack2.push(stack1.pop()!)
        }
      }
      return stack2.pop()
    },
  }
}

const queue = fn()
queue.push(1)
queue.push(2)
queue.push(3)
console.log(queue.pop()) // 1
queue.push(4)
console.log(queue.pop()) // 2
