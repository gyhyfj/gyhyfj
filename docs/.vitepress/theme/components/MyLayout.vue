<script setup lang="ts">
import { watchEffect } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useRouter } from 'vitepress'
const { Layout } = DefaultTheme
const { route } = useRouter()

watchEffect(() => {
  if (!/^\/code\//.test(route.path)) {
    let current = document.styleSheets[0].cssRules[0].selectorText
    if (current !== '.vp-doc p') {
      document.styleSheets[0].insertRule('.vp-doc p{text-indent: 2em;}', 0)
    }
  } else {
    let current = document.styleSheets[0].cssRules[0].selectorText
    if (current === '.vp-doc p') {
      document.styleSheets[0].deleteRule(0)
    }
  }
})
</script>

<template>
  <Layout>
    <template #home-features-before> </template>
  </Layout>
</template>
