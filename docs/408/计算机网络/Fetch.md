# Fetch

在进行跨域请求时，fetch API 提供了一种简单而强大的解决方案——使用 CORS（跨域资源共享）头部实现跨域请求，而 XHR 则使用了一个叫做 XMLHttpRequest Level 2 的规范，在代码编写上相对较为繁琐。

fetch 返回格式

text(): 将响应体解析为纯文本字符串并返回。
json(): 将响应体解析为 JSON 格式并返回一个 JavaScript 对象。
blob(): 将响应体解析为二进制数据并返回一个 Blob 对象。
arrayBuffer(): 将响应体解析为二进制数据并返回一个 ArrayBuffer 对象。
formData(): 将响应体解析为 FormData 对象。

计算进度

使用 data.clone()方法复制了响应对象 data，然后使用 data.body.getReader()方法获取数据流中的 reader 对象，接着通过读取数据流并计算已加载字节数 data.headers.get('Content-Length')
