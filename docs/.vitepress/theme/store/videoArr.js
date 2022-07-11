import axios from 'axios'
import { defineStore } from 'pinia'
import videoSolo from './videoSolo/videoSolo'
import qs from 'qs'

export const useVideoArrStore = defineStore('videoArr', {
  state: () => {
    return {
      vidInfoMap: new Map(videoSolo),
    }
  },
  getters: {
    /* 根据传入的bvid数组返回对应的视频信息数组 */
    getArrInfo: state => {
      return bvidArr => {
        let result = []
        bvidArr.forEach(item => result.push(state.vidInfoMap.get(item)))
        return result
      }
    },
  },
  actions: {
    /* 根据传入的bvid数组，请求更新state中对应的视频信息 */
    async updateVideoInfo(bvidArr) {
      // ['BV1QA4y1d7xf', 'BV1dU4y1m7rH'] 第一个是有合集的 第二个是单独的
      // 一次性把数组发给服务器，返回一个结果数组，再去更新state中的Map
      let { data } = await axios.get('/api/getVideoArrInfo', {
        params: {
          bvidArr: JSON.stringify(bvidArr),
        },
      })
      data.forEach(item => {
        this.vidInfoMap.set(item.bvid, item)
      })
      // [
      //   {
      //     bvid: 'BV1QA4y1d7xf',
      //     pic: 'http://i1.hdslb.com/bfs/archive/d29e2fcaff99e8192932136c74fc7396ca0fea83.jpg',
      //     title: '【已完结】2022年最新版Vue3全套教程（超细致月嫂级教程，包教包会）',
      //     upper: '写网页的叮叮',
      //     view: 94876,
      //     danmaku: 1131
      //   },
      //   {
      //     bvid: 'BV1dU4y1m7rH',
      //     pic: 'http://i2.hdslb.com/bfs/archive/5f0699e40b7da11a88c48294b0f3a6ac9218db5b.jpg',
      //     title: '老师：这怎么喊破喉咙也教不会呢【rolypoly】',
      //     upper: '小知世大人',
      //     view: 77319,
      //     danmaku: 30
      //   }
      // ]
    },
  },
})
