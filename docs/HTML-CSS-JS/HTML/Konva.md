# Konvas

```ts
let pentagon = new Konva.RegularPolygon({
  id: 'wtf',
  name: 'dog',
  x: stage.width() / 2,
  y: stage.height() / 2,
  sides: 5,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4,
  shadowOffsetX: 0, // shadowOffsetX shadowOffsetY 只要有一个不为0 阴影就开始生效  和box-shadow不同，这里的阴影是永远在的，图形是透明就会显示后面的阴影
  shadowOffsetY: 0,
  shadowOpacity: 0.1, // 单独用这个来控制阴影的透明度
  shadowBlur: 0,
  opacity: 0.5, // 会同时作用到图形和阴影上
  draggable: true, // 等同于在外面写 pentagon.draggable(true)
})
```

画图片

```ts
let imageObj = new Image()
imageObj.onload = () => {
  let xxxx = new Konva.Image({
    x: 50,
    y: 50,
    image: imageObj,
    width: 200,
    height: 200,
  })
  layer.add(xxxx)
  layer.batchDraw()
}
imageObj.src =
  'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'

Konva.Image.fromURL(
  '/assets/darth-vader.jpg', // 不能跨域
  (res: any) => {
    res.setAttrs({
      x: 200,
      y: 50,
      scaleX: 0.5,
      scaleY: 0.5,
    })
    layer.add(res)
    layer.batchDraw()
  }
)
```

缩放
stage.width() 不随 stage 缩放而变化 取的是静态的属性

经验：

```ts
/* 版本号 */
// version: '@@version' 打包时候替换该字符串

/* 代码是否被压缩 */
const isCompressed = !/param/.test(((param: any) => undefined).toString())

/* 是否是浏览器环境 */
const isBrowser =
  typeof window !== 'undefined' &&
  // browser case
  ({}.toString.call(window) === '[object Window]' ||
    // electron case
    {}.toString.call(window) === '[object global]')

/* 分辨率 */
const pixelRatio =
  (typeof window !== 'undefined' && window.devicePixelRatio) || 1
```
