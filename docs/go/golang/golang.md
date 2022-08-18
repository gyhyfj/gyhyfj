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

## 运算符

除法运算，如果算子都是整数，那么除后去掉小数部分
取余运算 `余数=被除数-(被除数/除数)*除数`
自增、自减是单独语句，不是运算符，只能单独使用，不能用于赋值，只能后置不能前置
位运算 >> 是乘以 2 的 n 次方 << 是除以 2 的 n 次方

```go
-10%3  // -10-(-10/3)*3  得-1
```

## 流程控制

1.if else 语句 判断条件不需要括号，判断条件内可以定义判断体内的局部变量
if 的大括号不能省略，左大括号必须在 if 判断语句行内

```go
package main

import "fmt"

func main() {
	a := 3
	if a > 2 {
		fmt.Println(a)
	}

	if b := 1; b > 2 {
		fmt.Println(b)
	} // 这里的b作用域限制在if语句体内

	if c := 0; c > 2 {
		fmt.Println(a)
	} else if c < 1 {
		fmt.Println(c)
	}
}

```

2.for 循环

```go
for i := 0; i <= 10; i++ {
	fmt.Println(i)
}
```

3.for 无限循环 可以用 break 跳出循环

```go
i:=1
for {
  fmt.Println(i)
  if i>10 {
    break
  }
}
```

4.for range 循环
不需要的参数可以用匿名变量

```go
str := "你好，Fan"
for k, v := range str {
	fmt.Println("key=", k, "val=", v) // 打印成数值
}
for k, v := range str {
	fmt.Printf("key=%v val=%c\n", k, v) // 打印成字符
}
```

5.switch case
golang 中：
可以像 if 语句那样把定义的值放在判断语句里，后面加一个分号再接这个变量名
一个分支可以有多个值，多个值用逗号分割
break 可以省略不写，效果与写 break 相同
分支中可以写数量不限的表达式
fallthrough 可以穿透当前 case 分支，继续执行下一个分支（只会穿透一层）

```go
switch extname := ".css";extname{
  case ".css",".js":
    fmt.Println("ok")
    break
  default:
    fmt.Println("okk")
}
```

6.golang 没有 while 循环

7.break continue
break 可以跳出当前循环
break xx 可以跳转到 xx:这里的语句执行
continue 可以跳过当前这一轮的循环
continue xx 可以跳转到 xx:这里的语句执行

```go
func main() {
	for i := 0; i < 2; i++ {
	label: // 相当于还是跳到了continue原本要去的位置
		for j := 0; j < 5; j++ {
			if j == 3 {
				continue label
			}
			fmt.Printf("i=%v j=%v\n", i, j)
		}
	}
}
```

```go
func main() {
label: // 不会打印j=4，多跳出了一层循环继续循环
	for i := 0; i < 2; i++ {
		for j := 0; j < 5; j++ {
			if j == 3 {
				continue label
			}
			fmt.Printf("i=%v j=%v\n", i, j)
		}
	}
}
```

8.goto
用来简化一些代码的实现过程，对快速跳出循环和避免重复退出上有一定帮助

```go
func main() {
	a := 1
	goto label
	a += 100
label:
	fmt.Println(a)
}
```

## 数组

数组声明：

```go
// 数组的长度是类型的一部分
var arr1 [3]int
var arr2 [3]string

fmt.Printf("%T",arr1) // [3]int
fmt.Printf("%T",arr2) // [3]string
```

数组初始化：
默认初始化为零值

```go
var arr1 [3]bool
arr1[0] = true

var arr1 = [3]string{"a", "b", "c"}


arr1 := [3]string{"a", "b", "c"}

arr1 := [...]string{"a", "b", "c"} // 自动推断数组长度

arr1 := [...]int{1: 1, 3: 5} // [0 1 0 5]
```

数组遍历：

两种 for 循环，借助索引范围和借助 range

```go
arr := [...]int{1: 1, 3: 5, 10: 9}
for i := 0; i < len(arr); i++ {
	fmt.Println(arr[i])
}

arr := [...]int{1: 1, 3: 5, 10: 9}
for _, v := range arr {
	fmt.Println(v)
}
```

引用类型

```go
var arr1 = [...]int{1, 2, 3} // 值类型
arr2 := arr1
arr2[0] = 9
fmt.Println(arr1) // [1 2 3]

var arr1 = []int{1, 2, 3} // 不加...是引用类型
arr2 := arr1
arr2[0] = 9
fmt.Println(arr1) // [9 2 3]
```

多维数组

```go
var arr=[2][3]int{} // 二行三列
arr[0] // 第一行
```

## 切片

切片是一个拥有相同类型元素的可变长度序列，切片的本质是基于数组类型做的封装，支持自动扩容，
是引用类型，内部结构包含地址（切片第一个元素的地址）、长度 len 和容量 cap
切片的循环遍历与数组相同

1.声明切片

```go
/* 声明切片像是声明数组，但要把长度去掉 */
// 1.
var name []T // 默认值是nil，长度为0，且不能用索引方式扩容
// 2.
var arr=[]int{1,2,3,4}
// 3.
var arr=[]int{0:1,3:9}
// 4.
make函数

/* 通过数组生成切片 */
a:=[5]int{1,2,3,4,5}
b:=a[:] // 获取数组里的所有值，转为切片
c:=a[1:4] // 左包右不包 [1,2,3]
d:=a[2:] // [3,4,5]
e:=a[:3] // [0,1,2]

/* 切片再切片 */
f:=b[1:]
```

2.切片的长度和容量
长度就是包含元素个数，容量是从第一个元素开始到其**底层数组**元素末尾的个数
分别用 len()和 cap()获取

3.make 与 append

```go
/* make函数构造切片 */
var sliceA = make([]int, 4, 8) // 类型 长度 容量 且有初始值
fmt.Println(sliceA) // [0 0 0 0]

/* 修改切片数据 */
sliceA[0]=10

/* append方法扩容 */
var slice int[]
// golang扩容切片要用append方法，不能用索引
slice=append(slice,9,8)

/* append方法还可以合并切片 */
sliceA:=int[]{1,2}
sliceB:=int[]{3,4,5}
sliceA=append(sliceA,sliceB...) // 其实是展开了sliceB再合并到sliceA
```

4.切片的扩容策略
+1 2 倍 4 分之 1

5.copy 函数 复制切片

```go
sliceA:=int[]{1,2}
sliceB:=make([]int,2,2)
copy(sliceB,sliceA)
```

6.从切片中删除元素

```go
slice:=int[]{1,2,3,4,5,6} // 要删除第三个元素
a=append(a[:2],a[3:]...) // 合并前后两截切片，注意append第二个参数开始要用展开值...
```

7.字符串操作转为切片
byte rune

8.sort 包排序

```go
// 要引入sort包
// 默认从小到大排序
sort.Ints(intList)

// 降序
sort.Sort(sort.Reverse(sort.IntSlice(intList)))
```

## map 类型

无序基于 k v 的数据结构
是引用类型，必须初始化才能使用

```go
var userinfo=make(map[string]string)
userinfo["9527"]="zs"

// 也支持再声明时候填充元素
var userinfo=map[string]string{
  "9527":"zs",
  "9526":"ls",
}

userinfo:=map[string]string{
  "9527":"zs",
  "9526":"ls",
}
```

获取或修改数据，以及判断是否存在，通过 key

```go
v,ok:=userinfo["9527"] // ok为布尔值
v,ok:=userinfo["9528"] //  false
```

for range 循环遍历

```go
for k,v:=range userinfo{
  fmt.Println(k,v)
}
```

delete 函数删除键值对

```go
delete(userinfo,"9526")
```

创建元素为 map 类型的切片

```go
var userinfo = make([]map[string]string,3,3) // 不初始化默认值都是nil
```
