# Record & Readonly

## Readonly

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

将该属性变为只读
