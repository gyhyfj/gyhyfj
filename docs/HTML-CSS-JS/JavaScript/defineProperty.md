# defineProperty

defineProperty(obj, prop, descriptor)

描述符的字段有
value
configurable
enumerable
writable
get
set

configurable 默认是 false, 表示该属性不会被删除或修改（包括描述符的其他字段）
描述符不能同时具有 [value 或 writable] 和 [get 或 set] 键

如果从 Reflect 去用会返回布尔值
如果从 Object 去用会返回传入的对象

defineProperty 与 proxy 的区别是 defineProperty 会污染原对象
