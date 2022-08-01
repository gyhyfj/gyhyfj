# uni-app

使用 vue 语法+小程序的标签和 api

不要用 h1 等标签

不要使用一些 vue 特性在小程序上
https://uniapp.dcloud.io/tutorial/vue3-api.html
directive h nextTick activated deactivated v-html v-is is component transition transition-group keep-alive teleport

不要使用 dom api 因为宿主环境是微信

不要用 create 生命钩子 而用 onLoad(option){}
因为小程序没有 vue router，无法通过 route.id 获取参数
