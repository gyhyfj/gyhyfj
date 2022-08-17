## fmt

Print：不能进行格式化，不自带换行
Println：不能进行格式化，自带换行
Printf：只能打印格式化内容，不自带换行（一次打印多个字符串中间加空格）

```
%v 输出结构体（好像啥都能输出）
%+v 输出结构体显示字段名 {one:10 tow:30}
%#v 输出结构体源代码片段 main.Point{one:10, tow:30}
%T 输出值的类型
%t 输出格式化布尔值
%d`输出标准的十进制格式化 100
%b`输出标准的二进制格式化 99 对应 1100011
%c`输出定整数的对应字符  99 对应 c
%x`输出十六进制编码  99 对应 63
%f`输出十进制格式化  99 对应 63
%e`输出科学技科学记数法表示形式  123400000.0 对应 1.234000e+08
%E`输出科学技科学记数法表示形式  123400000.0 对应 1.234000e+08
%s 进行基本的字符串输出   "\"string\""  对应 "string"
%q 源代码中那样带有双引号的输出   "\"string\""  对应 "\"string\""
%p 输出一个指针的值   &jgt 对应 0xc00004a090
% 后面使用数字来控制输出宽度 默认结果使用右对齐并且通过空格来填充空白部分
%2.2f  指定浮点型的输出宽度 1.2 对应  1.20
%*2.2f  指定浮点型的输出宽度对齐，使用 `-` 标志 1.2 对应  *1.20
```

## 变量声明

变量名是由数字、字母、下划线组成，区分大小写，不能数字开头，不能用保留字

1. 变量声明后未赋值会自动格式化为空值
2. 变量声明用`var name string`，也可以不写类型，在声明变量时赋值进行类型推导`var name = "zs"`
3. 同一作用域的变量不能重复声明
4. 一次可以声明多个变量
5. 在函数内部可以使用短变量声明法

```go
/* 1 */
var a, b int

/* 2 */
var(
  a int
  b int
)

/* 3 */
var(
  a int
  b string
  c bool
)

/* 4 声明同时赋值 */
var(
  name string = "zs"
  age int = 14
)

/* 5 */
// 只能在函数内使用这种写法
username:="zs"
a, b, c := 1, 2, 3

```

6. 匿名变量`_` 不分配内存，不占用命名空间，也不存在重复声明

```go
// func getInfo()(string, int){
//  return "zs", 10
// }

var username, _ = getInfo()
```

7. 声明常量。声明的同时就要赋值（各种语言都一样）

```go
const a int = 10

const(
  a=1
  b
  c // const同时声明多个常量时候，如果省略了值则表示和上一行值相同
)

const (
  n1 = iota // 0
  n2 // 1
  n3 // 2
)

const (
  n1 = iota // 0
  n2 =100
  n3 =iota // 2
  n4 // 3
)

const (
  n1, n2= iota + 1, iota + 2 // 1 2
  n3, n4 // 3 4
  n5, n6 // 5 6
)
```

## 整型

特殊整型 uintptr 无符号整型，用于存放指针
有符号整型：第一位表示符号 int8 int16 int32 int64 范围是-2^(n-1)到 2^(n-1)-1 占 n/8 字节，可以用`unsafe.Sizeof(a)`查看占用多少个字节
无符号整型：全部都是数值 uint8 uint16 uint32 uint64 范围是 0 到 2^n-1，赋值负数会报错

int 和 uint `a:=30` 默认 int32 或 int64，取决于操作系统位数
为保证文件的结构不受不同编译目标平台字节长度影响，不要使用 int 和 unint

int 类型转换
注意高位向地位转换会出问题

```go
var a int32 = 1
fmt.Println(int64(a))
```

格式化时候 %v 原样输出 %d 十进制 %b 二进制 %o 八进制 %x 十六进制

## 浮点型

两种 float32 和 float64 分别占用 4 个字节和 8 个字节
最大范围是 math.MaxFloat32 和 math.MaxFloat64
默认取决于操作系统位数

科学计数法赋值 `var f float64 = 3.14e-2`

精度丢失问题 （如 8.2-3.8）
使用第三方包解决精度丢失问题 decimal

int 类型和 float 类型的转换

```go
var a1 float32 = 23.4
a2 := float64(a1)
a3 := int64(a2)
```

格式化输出 %f %.2f（两位小数）

## 布尔型

未初始化默认 false `var flag bool`
GO 不允许整型强制转换为布尔类型（**if 语句的行为会受影响**）
布尔型无法参与数值运算，也无法与其他类型进行转换

## 字符串

单行字符串用双引号 多行字符串用反引号
输出用 s%
unsafe.Sizeof()没法看 string 类型数据所占的存储空间，原因在于字符串格式的底层结构
想看字符串的字节数
字符串常用操作

```go
// 求字符串所占字节数（汉字三个）
const a = "我"
len(a) //3

// 拼接字符串
const a = "hello"
const b="!"
c:=a+b // 加号可以换行写，但只能写在每行的末尾
c:=fmt.Sprintf("%v%v",a,b)

// 分割字符串，需要引入strings包
const a="00:00:01"
arr:=strings.Split(a,"-") // 第二个参数是字符串，用双引

// 拼接字符串数组
strings.join(arr,":") // 第二个参数是字符串，用双引

// 判断是否包含子串
str1:="this is a car"
str2:="this"
flag:=strings.Contains(str1,str2)

// 判断是否具有前缀后缀
flag:=strings.HasPrefix(str1,str2) // 前缀
flag:=strings.HasSuffix(str1,str2) // 后缀

// 获取字串出现的位置
str1:="this is a car"
str2:="is"
index：strings.Index(str1,str2) // 从前往后找，找不到返回-1
index：strings.LastIndex(str1,str2) // 从后往前找，找不到返回-1
```

## byte 和 rune 类型

字符串与字符：
字符用单引号`var a='a'`
%v 原样输出默认是 ASCII 数值或十进制 utf-8 编码值，显示字符要用%c
一个汉字占用 3 个字节（utf-8），一个字母占用 1 个字节（ascii）
如果通过索引循环打印字符串中的字符，要用 range 循环才能正确处理 utf-8 字符

```go
s:="你好 golang"
for _, v:=range s{
  fmt.Printf("%v(%c)",s[i],s[i])
}
```

修改字符串里的字符，转为`[]byte` 或 `[]rune`类型才行

```go
// 无utf-8
s1:="big"
byteStr:=[]byte(s1)
byteStr[0]='p'

// 有utf-8
s1:="big"
byteStr:=[]rune(s1)
byteStr[0]='p'
```

## golang 基本数据类型的转换

不同的类型不能运算，比如 int8 与 int16 的加减
建议从高位转为低位，避免溢出

```go
var a int32 = 5
var b int64 = 3
b + int32(a)

var c float64 = 0.5
c+float64(a)

```
