<script setup>
import { reactive, onMounted } from 'vue'
import { useVidArrStore } from '../store/vidArr.js'

const store = useVidArrStore()

const props = defineProps({
  bvidArr: Array, // ["BV1uS4y1Z7sX","BV1dS4y1y7vd&p=7"]
})

let list = reactive(store.getArrInfo(props.bvidArr))

onMounted(async () => {
  let arr = await store.updateMap(props.bvidArr)
  // 如果请求成功，更新数据
  if (arr !== 'err') {
    for (let i in list) {
      list[i] = arr[i]
    }
  }
})
</script>

<template>
  <div class="container">
    <a
      class="card"
      :href="'https://www.bilibili.com/video/' + item.bvid.replace('&', '?')"
      target="_blank"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="left">
        <img :src="item.pic.replace(/http/, 'https')" alt="" class="coverImg" />
      </div>
      <div class="right">
        <div class="title double-ellipsis">
          {{ item.title }}
        </div>
        <div class="playInfo">
          <svg
            t="1657089110868"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4009"
            width="200"
            height="200"
          >
            <path
              d="M85.333333 170.368A42.666667 42.666667 0 0 1 127.658667 128h768.682666C919.722667 128 938.666667 146.986667 938.666667 170.368v683.264A42.666667 42.666667 0 0 1 896.341333 896H127.658667A42.368 42.368 0 0 1 85.333333 853.632V170.368zM170.666667 213.333333v597.333334h682.666666V213.333333H170.666667z m282.538666 145.706667l208.170667 138.752a17.066667 17.066667 0 0 1 0 28.416l-208.213333 138.752A17.066667 17.066667 0 0 1 426.666667 650.794667V373.205333a17.066667 17.066667 0 0 1 26.538666-14.165333z"
              p-id="4010"
            ></path>
          </svg>
          {{
            item.view > 9999
              ? Math.round(item.view / 1000) / 10 + '万'
              : item.view
          }}
          &nbsp;&nbsp;&nbsp;
          <svg
            t="1657089165619"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4149"
            width="200"
            height="200"
          >
            <path
              d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z"
              p-id="4150"
            ></path>
            <path
              d="M240 384h64v64h-64zM368 384h384v64h-384zM432 576h352v64h-352zM304 576h64v64h-64z"
              p-id="4151"
            ></path>
          </svg>
          {{ item.danmaku }}
        </div>
        <div class="upper">
          <svg
            t="1657089601642"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2065"
            width="200"
            height="200"
          >
            <path
              d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z"
              p-id="2066"
            ></path>
            <path
              d="M419.2 544c0 51.2-3.2 108.8-83.2 108.8S252.8 595.2 252.8 544v-217.6H192v243.2c0 96 51.2 140.8 140.8 140.8 89.6 0 147.2-48 147.2-144v-240h-60.8V544zM710.4 326.4h-156.8V704h60.8v-147.2h96c102.4 0 121.6-67.2 121.6-115.2 0-44.8-19.2-115.2-121.6-115.2z m-3.2 179.2h-92.8V384h92.8c32 0 60.8 12.8 60.8 60.8 0 44.8-32 60.8-60.8 60.8z"
              p-id="2067"
            ></path>
          </svg>
          <span>&nbsp;{{ item.upper }}</span>
        </div>
      </div>
    </a>
  </div>
</template>

<style lang="less" scoped>
* {
  box-sizing: border-box !important;
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  padding: 20px 0;
  .card {
    display: flex;
    margin: 0 0 10px 0;
    width: 321px;
    height: 92px;
    border-radius: 4px;
    overflow: hidden;
    color: unset;
    border: 1px solid var(--vp-c-divider-light);
    // transition: border-color 0.25s;
    // &:hover {
    //   border: 1px solid var(--vp-c-brand);
    // }
    &:hover {
      background: linear-gradient(270deg, #efefef, #ffffff);
      box-shadow: 20px 20px 47px #ebebeb, -20px -20px 47px #ffffff;
    }
    .left {
      width: 150px;
      height: 92px;
      border-radius: 4px;
      overflow: hidden;
      .coverImg {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 50%;
      }
    }
    .right {
      flex: 1;
      padding: 8px 10px 0 10px;
      font-size: 12px;

      svg {
        display: inline-block;
        transform: translateY(-1px);
        height: 14px;
        width: 14px;
        margin: 0;
        path {
          fill: black;
        }
      }

      .title {
        width: 141px;
        height: 30px;
        line-height: 16px;
      }
      .playInfo {
        margin-top: 3px;
        opacity: 0.5;
        /* iconfont svg */
      }
      .upper {
        svg {
          height: 15px;
          width: 15px;
          path {
            fill: #fb7299;
          }
        }
        span {
          opacity: 0.8;
          color: #fb7299;
          // font-size: 10px;
        }
      }
    }
  }
}

// .clearfix::after {
//   content: '';
//   display: block;
//   clear: both;
// }
.double-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}

/* dark mode */
:root.dark .card {
  &:hover {
    background: linear-gradient(270deg, #2a2a2a, #242424);
    box-shadow: unset;
  }
  svg {
    path {
      fill: white;
    }
  }
}
</style>
