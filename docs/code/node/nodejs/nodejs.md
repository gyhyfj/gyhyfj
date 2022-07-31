# nodejs

## JSON

JSON 是一种基于文本的轻量级的数据交换格式。
在前端通过将一个符合 JSON 格式的数据结构序列化为 JSON 字符串，然后将它传递到后端，后端通过 JSON 格式的字符串解析后生成对应的数据结构，以此来实现前后端数据的一个传递。

JSON 和 js 中的对象不是一回事，JSON 中对象格式更加严格，比如说在 JSON 中属性值不能为函数，不能出现 NaN 这样的属性值等

JSON.stringify
JSON.parse
两个函数来实现 js 数据结构和 JSON 格式的转换处理
