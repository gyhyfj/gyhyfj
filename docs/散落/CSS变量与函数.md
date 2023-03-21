声明自定义变量需要用`--`开头，并且大小写敏感

值是字符串，
通过 var()来获取值，进行字符串拼接。
但建议定义完整的取值作为字符串，避免 lint 工具对它进行格式化导致失效

和其他 css 规则一样，可以后缀`!important`

```css
:root {
  --red-rgb: 255, 0, 0;
}
.box {
  /* stylelint-disable-next-line */
  background-color: rgb(var(--red-rgb), 0.3);
}
```

var()函数可以定义多个 fallback value，以嵌套形式作为第二个参数
不应传入多个参数，
如果传入多个参数，那么后面的内容包括逗号会作为一整个字符串参数

在 JS 中获取变量值

```ts
// 获取节点上定义的变量或继承的变量
getComputedStyle(boxRef.value).getPropertyValue('--red-rgb') // 255, 0, 0
```

通过 JS 修改变量值

```ts
boxRef.value.style.setProperty('--red-rgb', '255,255,0') // 会插入一条新规则，通常优先级更高，但也要考虑原值用了!important的情形
```
