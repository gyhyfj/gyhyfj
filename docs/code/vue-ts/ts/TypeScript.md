# TypeScript

## 概念

1. TypeScript 是添加了类型系统的 JavaScript, 是 JavaScript 的超集. TypeScript 的类型系统，在很大程度上弥补了 JavaScript 的缺点
2. TypeScript 是静态类型
   > 类型系统按照「类型检查的时机」来分类
   > 动态类型是指在运行时才会进行类型检查, 所以这种语言的类型错误往往会导致运行时出错 (比如没有编译阶段的 JavaScript, 比如 Python)
   > 静态类型是指编译阶段就能确定每个变量的类型, TypeScript 会先编译为 JavaScript 再运行, 在编译阶段就运行类型检查
3. TypeScript 是弱类型
   > 按是否允许隐式类型转换, 来区分强类型和弱类型
   > 因为 TypeScript 是完全兼容 JavaScript 的, 不会修改 JavaScript 运行的特性, 所以它们都是弱类型

## 安装和编译

1. 需要 Nodejs 环境
2. 安装 TypeScript: `npm i typescript -g` // 检查 ts 版本号 `tsc -v`
3. 编译 ts 文件: `tsc index.ts`
4. 运行编译后的文件: node index.js
5. 简化的编译运行: 安装 ts-node 包 `npm i ts-node -g`, 编译运行 `ts-node index.ts`

## 类型系统

约定了什么类型, 就只能给变量赋值该类型的值
TS 类型分为两类

1. JS 已有类型
   原始类型: number/string/boolean/null/undefined/symbol
   对象类型: object ( 包括，数组、对象、函数等对象 )
2. TS 新增类型
   联合类型、自定义类型（类型别名）、接口、元组、字面量类型、枚举、void、any 等

<<< @\code\vue-ts\ts\ts-type.ts
