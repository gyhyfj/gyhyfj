# JS 总结

## JavaScript 脚本延迟加载的方式有哪些？

defer 属性
async 属性  
动态创建 DOM 方式（DOM 的 script 节点）
使用 setTimeout 延迟方法
让 JS 脚本放在文档的底部

## 数组的原生方法

toString()、toLocalString()、join()
pop() 和 push()，push 方法可以传入多个参数
shift() 和 unshift() unshift 方法可以传递多个参数，表示在数组开头增加
reverse() 和 sort()，sort() 方法可以传入一个函数来进行比较，传入前后两个值，如果返回值为正数，则交换两个参数的位置
concat() ，返回的是拼接好的数组，不影响原数组
slice(begin [ end ])，用于截取数组中的一部分返回，不影响原数组。
array.splice(start[, deleteCount[, item1[, item2[, ...]]]])，改变原数组
reduce() 和 reduceRight() 方法 （数组归并）

## use strict

是 ES5 添加的严格模式
禁止使用 with 语句 禁止 this 指向全局对象 对象不能有重名的属性
目的：
提高编译器效率，增加运行速度
消除 Javascript 语法的不合理、不严谨之处，减少怪异行为
消除代码运行的不安全之处，保证代码运行的安全
为未来新版本的 Javascript 做好铺垫

## for in 和 for of 的区别

for… in 会遍历对象的整个原型链，性能非常差不推荐使用，而 for … of 只遍历当前对象不会遍历原型链
对于数组的遍历，for…in 会返回数组中所有可枚举的属性(包括原型链上可枚举的属性)，for…of 只返回数组的下标对应的属性值

## 数组的遍历方法：

for...of 不改变原数组
forEach() 视情况是否改变原数组
filter() 不改变原数组，有返回值，返回一个符合筛选规则的新数组
every() 和 some() 不改变原数组，some()只要有一个是 true，便返回 true；而 every()只要有一个是 false，便返回 false.
map() 不改变原数组 数组方法，不改变原数组，有返回值，生成一个一一对应的新数组
find() 和 findIndex() 不改变原数组，find()返回的是第一个符合条件的值；findIndex()返回的是第一个返回条件的值的索引值
reduce() 和 reduceRight() 不改变原数组，reduce()对数组正序操作；reduceRight()对数组逆序操作

## forEach 和 map 方法有什么区别

forEach()方法会针对每一个元素执行提供的函数，对数据的操作会改变原数组，该方法没有返回值
map()方法不会改变原数组的值，有返回值，返回一个新数组，新数组中的值为原数组调用函数处理之后的值

## 实现深拷贝的方法

JSON.stringify()
函数库 lodash 的`_.cloneDeep` 方法
手写实现深拷贝函数

```js
function deepCopy(obj) {
  if (!obj || typeof obj !== 'object') return
  let newObj = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }
  return newObj
}
```

## 原型
