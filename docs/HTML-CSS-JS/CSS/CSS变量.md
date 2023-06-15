# CSS 变量

## 定义 CSS 变量

变量需要用`--`开头，并且大小写敏感
值是字符串，通过 var()来获取值，进行字符串拼接。但建议定义完整的取值作为字符串，避免 lint 工具对它进行格式化导致失效

定义在`:root:root`下的变量比定义在`root`下的变量优先级更高

## 在 JS 中访问变量值

```ts
// 获取节点上定义的变量或继承的变量
getComputedStyle(boxRef.value).getPropertyValue('--red-rgb') // 255, 0, 0

// 获取定义在:root上的css3变量
document.documentElement.getPropertyValue('--propaganda-height')
```

通过 JS 修改变量值
style.setProperty(propertyName, value, priority)

```ts
boxRef.value.style.setProperty('--red-rgb', '255,255,0') // 会插入一条新规则，通常优先级更高，但也要考虑原值用了!important的情形

document.documentElement.style.setProperty('--propaganda-height', '40px') // 修改 :root 上的css3变量值
```

## 对比预处理语言的变量

CSS 变量是动态的、响应式的，SASS 变量是静态的
SASS 变量无法用于行内样式，因为预处理器不处理行内样式
