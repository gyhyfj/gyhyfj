<template>
  <div class="box" v-for="(item, index) in list" :key="index">
    <div class="left">
      <a :href="item.link" target="_blank" class="coverLink">
        <img :src="item.pic" alt="" />
      </a>
    </div>
    <div class="right">
      <div class="title">
        {{ item.title }}
      </div>
      <div class="info">
        <div>
          UP主：<a :href="item.link" target="_blank" class="authorLink">{{
            item.upper
          }}</a>
        </div>
        <div>{{ item.count }}个内容</div>
      </div>
      <a :href="item.link" class="favPlayLink" target="_blank">
        <!-- <span class="iconfont icon-24gf-play"></span> -->
        <svg
          t="1656840613666"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4068"
          width="200"
          height="200"
        >
          <path
            d="M870.2 466.333333l-618.666667-373.28a53.333333 53.333333 0 0 0-80.866666 45.666667v746.56a53.206667 53.206667 0 0 0 80.886666 45.666667l618.666667-373.28a53.333333 53.333333 0 0 0 0-91.333334z"
            fill="#5C5C66"
            p-id="4069"
          ></path>
        </svg>
        播放全部视频
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  list: Object,
})
</script>

<style lang="less" scoped>
.box {
  display: flex;
  width: 100%;
  height: 159px;
  padding: 20px 0;
  &:hover {
    background: linear-gradient(270deg, #e6e6e6, #ffffff);
    box-shadow: 20px 20px 47px #ebebeb, -20px -20px 47px #ffffff;
  }

  /* 左侧封面区 */
  .left {
    margin-right: 18px;
    .coverLink {
      // background-color: pink;
      display: block;
      img {
        width: 190px;
        height: 119px;
        object-fit: cover;
        object-position: 50%;
        border-radius: 4px;
      }
      overflow: hidden;
    }
  }
  /* 右侧详情区 */
  .right {
    flex: 1;
    /* 文字 */
    .title {
      font-weight: 600;
      font-size: 14px;
      line-height: 14px;
    }
    .info {
      margin: 12px 0;
      font-size: 12px;
      .authorLink {
        color: unset;
      }
    }
    /* 按钮 */
    .favPlayLink {
      display: block;
      padding-right: 5px;
      width: 120px;
      height: 32px;
      background: #00a1d6;
      border-radius: 2px;
      font-size: 14px;
      color: #fff;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
      transition: color 0.2s ease, background-color 0.2s ease;
      &:hover {
        background-color: rgb(0, 181, 229);
      }
    }
    /* iconfont svg */
    svg {
      display: inline-block;
      transform: translateY(-1px);
      height: 14px;
      width: 14px;
      margin: 0;
      path {
        fill: white;
      }
    }
  }
}

/* dark mode */
:root.dark .box {
  &:hover {
    background: linear-gradient(270deg, #2a2a2a, #242424);
    box-shadow: unset;
  }
}
/* bilibili iframe */
iframe .bilibili-player-video-suspension-bar-btn-group {
  display: none !important;
  color: red;
}
</style>
