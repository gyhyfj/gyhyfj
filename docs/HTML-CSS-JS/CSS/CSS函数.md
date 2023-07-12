# CSS 函数

## calc()

可以混合各种单位进行计算
注意：括号里面可以使用`+ - * /`来进行计算。注：`+ - * /`前后要各加上一个空格。
场景：使用计算属性来适应容器大小

## attr()

获取选中元素的属性值
除了 content 外，其余都还是试验性的

```vue
<template>
  <div id="box" customArr="hello"></div>
</template>

<style lang="scss" scoped>
#box::after {
  content: attr(customArr);
}
</style>
```

## env()、constant()

env()将用户代理定义的环境变量值插入你的 CSS 中
必须要配合 viewport-fit=cover 使用，当 viewport-fit=contain 时 env() 不生效

```html
<meta name="viewport" content="... viewport-fit=cover" />
```

接收两个参数：

第一个参数有四个可选值，
safe-area-inset-top, safe-area-inset-right, safe-area-inset-bottom, safe-area-inset-left, 表示安全区域到四个边界的距离
safe-area-inset-bottom 这个变量对应的就是小黑条的高度
`safe-area-inset-*`由四个定义了视口边缘内矩形的 top, right, bottom 和 left 的环境变量组成，这样可以安全地放入内容，而不会有被非矩形的显示切断的风险。对于矩形视口，例如普通的笔记本电脑显示器，其值等于零。对于非矩形显示器（如圆形表盘，iPhoneX 屏幕），在用户代理设置的四个值形成的矩形内，所有内容均可见

第二个参数是 env 不生效时的备用值

```css
padding: env(safe-area-inset-bottom, 50px);
padding: env(safe-area-inset-bottom, 50px);
padding: env(
  x,
  50px,
  20px
); /* ignored because '50px, 20px' is not a valid padding value and x is not a valid environment variable */
```

对于不支持 env() 的浏览器，浏览器将会忽略它，向后兼容做法是：
注意：env() 跟 constant() 需要同时存在，而且顺序不能换

```css
body {
  padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS &lt; 11.2 */
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS &gt;= 11.2 */
}
```

部分安卓机也会按照 iOS 的标准来实现安全区域，因此上面的属性在大部分 Android 手机上也能正常使用，但也可能有例外

1. 使用 PX 代替 px 防止被插件转义为 vw 或 rem 等
2. 使用 js，首先我们向页面中插入一个看不见的 div，将 div 的高度设置为安全距离的高度，然后再通过 js 获取其高度，若高度为 0，则说明没有生效。

在已经设置了安全区域属性的地方，根据这个函数判断设备是否支持安全区属性，如果不生效，就插入一个形如`padding-top: 25PX;`的兜底逻辑

```ts
let testStatus = 0 // 0:还没数据，-1:不支持，1:支持

/**
 * 判断当前设置是否支持constant(safe-area-inset-top)或env(safe-area-inset-top)；
 * 部分Android设备，可以认识safa-area-inset-top，但会将其识别为0
 * @returns {boolean} 当前设备是否支持安全距离
 */
const supportSafeArea = (): boolean => {
  if (testStatus !== 0) {
    // 缓存数据，只向 body 插入一次 dom 即可
    return testStatus === 1
  }
  const div = document.createElement('div')
  const id = 'test-check-safe-area'
  const styles = [
    'position: fixed',
    'z-index: -1',
    'height: constant(safe-area-inset-top)',
    'height: env(safe-area-inset-top)',
  ]
  div.style.cssText = styles.join(';')
  div.id = id
  document.body.appendChild(div)
  const areaDiv = document.getElementById(id) as HTMLElement

  testStatus = areaDiv.offsetHeight > 0 ? 1 : -1 // 该 div 的高度是否为 0
  areaDiv.parentNode?.removeChild(areaDiv)

  return testStatus === 1
}
```

## var()

取 css 变量值的函数
var()函数可以定义多个 fallback value，以嵌套形式作为第二个参数
var()函数可以接收`0px`作为运算的参数，但不能接收`0`作为参数

## min max

用法是

```css
.box {
  width: max(100%, var(--x), 10rem);
}
```
