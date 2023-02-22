<script setup lang="ts">
// @ts-nocheck
import { watchEffect, onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useRouter } from 'vitepress'

const { Layout } = DefaultTheme
const { route } = useRouter()
onMounted(() => {
  watchEffect(() => {
    if (/^\/%E6%95%A3%E8%AE%B0\//.test(route.path)) {
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
})
</script>

<template>
  <Layout>
    <template #home-hero-after>
      <Teleport to="body">
        <div class="hero-image-box">
          <svg
            width="675"
            height="675"
            viewBox="0 0 675 675"
            xmlns="http://www.w3.org/2000/svg"
            class="hero-svg"
          >
            <defs>
              <path
                d="M337.5,337.5 m-320,0 a320,320 0 1,1 640,0 a320,320 0 1,1 -640,0"
                id="circle1"
              ></path>
              <path
                d="M337.5,337.5 m-280,0 a280,280 0 1,1 560,0 a280,280 0 1,1 -560,0"
                id="circle2"
              ></path>
              <path
                d="M337.5,337.5 m-240,0 a240,240 0 1,1 480,0 a240,240 0 1,1 -480,0"
                id="circle3"
              ></path>
              <path
                d="M337.5,337.5 m-200,0 a200,200 0 1,1 400,0 a200,200 0 1,1 -400,0"
                id="circle4"
              ></path>
              <path
                d="M337.5,337.5 m-160,0 a160,160 0 1,1 320,0 a160,160 0 1,1 -320,0"
                id="circle5"
              ></path>
            </defs>
            <text class="mandala-accent-1" dy="70" textLength="2010">
              <textPath textLength="2010" href="#circle1">
                &nbsp;&nbsp;&nbsp;/
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                &nbsp;&nbsp;&nbsp;/
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                &nbsp;&nbsp;&nbsp;/
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                &nbsp;&nbsp;&nbsp;/
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                &nbsp;&nbsp;&nbsp;/
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                &nbsp;&nbsp;&nbsp;/
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                &nbsp;&nbsp;&nbsp;/
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
                /
                <tspan>/</tspan>
              </textPath>
            </text>
            <text class="mandala-accent-2" dy="70" textLength="1760">
              <textPath textLength="1760" href="#circle2">
                &nbsp;&nbsp;+
                <tspan>+</tspan>
                +
                <tspan>+</tspan>
                +
                <tspan>+</tspan>
                &nbsp;&nbsp;+
                <tspan>+</tspan>
                +
                <tspan>+</tspan>
                +
                <tspan>+</tspan>
                &nbsp;&nbsp;+
                <tspan>+</tspan>
                +
                <tspan>+</tspan>
                +
                <tspan>+</tspan>
                &nbsp;&nbsp;+
                <tspan>+</tspan>
                +
                <tspan>+</tspan>
                +
                <tspan>+</tspan>
                &nbsp;&nbsp;+
                <tspan>+</tspan>
                +
                <tspan>+</tspan>
                +
                <tspan>+</tspan>
                &nbsp;&nbsp;+
                <tspan>+</tspan>
                +
                <tspan>+</tspan>
                +
                <tspan>+</tspan>
                &nbsp;&nbsp;+
                <tspan>+</tspan>
                +
                <tspan>+</tspan>
                +
                <tspan>+</tspan>
              </textPath>
            </text>
            <text class="mandala-accent-3" dy="70" textLength="1507">
              <textPath textLength="1507" href="#circle3">
                <tspan>{</tspan>
                {
                <tspan>{</tspan>
                {&nbsp;
                <tspan>}</tspan>
                }
                <tspan>}</tspan>
                }&nbsp;&nbsp;
                <tspan>{</tspan>
                {
                <tspan>{</tspan>
                {&nbsp;
                <tspan>}</tspan>
                }
                <tspan>}</tspan>
                }&nbsp;&nbsp;
                <tspan>{</tspan>
                {
                <tspan>{</tspan>
                {&nbsp;
                <tspan>}</tspan>
                }
                <tspan>}</tspan>
                }&nbsp;&nbsp;
                <tspan>{</tspan>
                {
                <tspan>{</tspan>
                {&nbsp;
                <tspan>}</tspan>
                }
                <tspan>}</tspan>
                }&nbsp;&nbsp;
                <tspan>{</tspan>
                {
                <tspan>{</tspan>
                {&nbsp;
                <tspan>}</tspan>
                }
                <tspan>}</tspan>
                }&nbsp;&nbsp;
                <tspan>{</tspan>
                {
                <tspan>{</tspan>
                {&nbsp;
                <tspan>}</tspan>
                }
                <tspan>}</tspan>
                }&nbsp;&nbsp;
              </textPath>
            </text>
            <text class="mandala-accent-4" dy="70" textLength="1257">
              <textPath textLength="1257" href="#circle4">
                &nbsp;&nbsp;&nbsp;../../ &nbsp;&nbsp;&nbsp;../../
                &nbsp;&nbsp;&nbsp;../../ &nbsp;&nbsp;&nbsp;../../
                &nbsp;&nbsp;&nbsp;../../ &nbsp;&nbsp;&nbsp;../../
                &nbsp;&nbsp;&nbsp;../../
              </textPath>
            </text>
            <text class="mandala-accent-5" dy="70" textLength="1005">
              <textPath textLength="1005" href="#circle5">
                <tspan>&lt;&gt;</tspan>
                &lt;/&gt;
                <tspan>&lt;&gt;</tspan>
                &lt;/&gt;
                <tspan>&lt;&gt;</tspan>
                &lt;/&gt;
                <tspan>&lt;&gt;</tspan>
                &lt;/&gt;
                <tspan>&lt;&gt;</tspan>
                &lt;/&gt;
                <tspan>&lt;&gt;</tspan>
                &lt;/&gt;
                <tspan>&lt;&gt;</tspan>
                &lt;/&gt;
                <tspan>&lt;&gt;</tspan>
                &lt;/&gt;
                <tspan>&lt;&gt;</tspan>
                &lt;/&gt;
                <tspan>&lt;&gt;</tspan>
                &lt;/&gt;
                <tspan>&lt;&gt;</tspan>
                &lt;/&gt;
                <tspan>&lt;&gt;</tspan>
                &lt;/&gt;
                <tspan>&lt;&gt;</tspan>
                &lt;/&gt;
                <tspan>&lt;&gt;</tspan>
                &lt;/&gt;
                <tspan>&lt;&gt;</tspan>
                &lt;/&gt;
                <tspan>&lt;&gt;</tspan>
                &lt;/&gt;
              </textPath>
            </text>
          </svg>
        </div>
      </Teleport>
    </template>
  </Layout>
</template>

<style scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.hero-image-box {
  position: fixed;
  top: 3%;
  left: 20%;
}
.hero-svg {
  fill: #838383;
  user-select: none;
  animation: rotate 500s linear infinite;
}
</style>
