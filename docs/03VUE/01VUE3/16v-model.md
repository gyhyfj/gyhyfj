# v-model

v-model 在 vue3 中发生了破坏性更新

## 一般使用

实现父组件的某个变量和子组件双向绑定

父组件在子组件上用`v-model="val"`传参，
子组件用 props 接收，默认接收参数名为`modelValue`

然后子组件派发`'update:modelValue'`默认事件，改变被父组件传递的这个参数
`const emit = defineEmits(['update:modelValue'])`
`emit('update:modelValue', props.modelValue - 1)`
props.modelValue 是只读的，所以不能在子组件直接对其进行修改

父组件:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import A from './components/A.vue'
const val = ref<number>(9)
</script>

<template>
  {{ val }}
  <button @click="val++">val++</button>
  <hr />
  <A v-model="val" />
</template>
```

子组件:

```vue
<script setup lang="ts">
type Props = {
  modelValue: number
}
const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])
const handleSub = () => {
  emit('update:modelValue', props.modelValue - 1)
}
</script>

<template>{{ modelValue }} <button @click="handleSub">val--</button></template>
```

## 自定义名称的 v-model

父组件自定义 v-model 的参数名，替代 modelValue：`v-model:自定义名称=变量`
子组件的派发事件名称要做相应更改：替代 update:modelValue：`'update:name'`

父组件：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import A from './components/A.vue'
const val = ref<number>(9)
const name = ref<string>('我是一只狗')
</script>

<template>
  {{ val }}
  <button @click="val++">val++</button>
  <hr />
  <A v-model="val" v-model:name="name" />
</template>
```

子组件：

```vue
<script setup lang="ts">
type Props = {
  modelValue: number
  name: string
}
const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue', 'update:name'])
const handleSub = () => {
  emit('update:modelValue', props.modelValue - 1)
  emit('update:name', props.name + '!')
}
</script>

<template>
  {{ modelValue }} <button @click="handleSub">val--</button>
  {{ name }}
</template>
```

## 自定义修饰符

修饰符有的话就是 true，没有就是 false，可以根据有无修饰符做一些事情
父组件 `v-model.hello="val" v-model:name.hi="name"`
子组件 对应的是在 props 中与`modelValue`和`name`同级定义的`modelModifiers?: {hello: boolean},nameModifiers?: {hi: boolean}`

父组件：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import A from './components/A.vue'
const val = ref<number>(9)
const name = ref<string>('我是一只狗')
</script>

<template>
  {{ val }}
  <button @click="val++">val++</button>
  <hr />
  <A v-model.hello="val" v-model:name.hi="name" />
</template>
```

子组件：

```vue
<script setup lang="ts">
type Props = {
  modelValue: number
  name: string
  modelModifiers?: {
    hello: boolean
  }
  nameModifiers?: {
    hi: boolean
  }
}
const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue', 'update:name'])
const handleSub = () => {
  console.log(props.modelModifiers) // {hello:true}
  console.log(props.nameModifiers) // {hi:true}
  emit('update:modelValue', props.modelValue - 1)
  emit('update:name', props.name + '!')
}
</script>

<template>
  {{ modelValue }} <button @click="handleSub">val--</button>
  {{ name }}
</template>
```
