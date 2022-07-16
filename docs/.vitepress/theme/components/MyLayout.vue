<script setup>
import { watchEffect } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useRouter } from 'vitepress'
const { Layout } = DefaultTheme
const { route } = useRouter()

watchEffect(() => {
  if (!/^\/code\//.test(route.path)) {
    let style = document.querySelector('#switch')
    style.href = '/css/article.css'
  } else {
    let style = document.querySelector('#switch')
    style.href = '/css/code-article.css'
  }
})
</script>

<template>
  <Layout>
    <template> </template>
  </Layout>
</template>
