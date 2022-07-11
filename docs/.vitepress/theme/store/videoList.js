import axios from 'axios'
import { defineStore } from 'pinia'
import wbcssg from './videoList/wbcssg'

export const useVideoListStore = defineStore('videoList', {
  state: () => {
    return {
      wbcssg: {
        isUpdated: false,
        upper: '文不醜',
        data: new Map(wbcssg),
      },
    }
  },

  getters: {
    /* 根据传入的系列名称和bvid数组，返回播放信息数组 */
    getListInfo: state => {
      return (seriesName, bvidArr) => {
        let result = []
        bvidArr.forEach((item, index) => {
          result.push(state[seriesName].data.get(item))
          result[index].upper = state[seriesName].upper
        })
        return result
      }
    },
  },

  actions: {
    /* 根据系列名称和bvid数组，请求更新stata中对应系列视频列表信息Map */
    async updateVideoListInfo(seriesName, bvidArr) {
      let resultArr = []
      let resultMap = new Map()
      // axios 请求
      let { data } = await axios.get('/api/getVideoListInfo?bvid=' + bvidArr[0])
      // 采集返回数据到数组
      data.forEach(item => {
        resultArr.push(...item.episodes)
      })
      // 生成映射
      resultArr.forEach(item => {
        resultMap.set(item.bvid, {
          title: item.title,
          bvid: item.bvid,
          pic: item.arc.pic,
          view: item.arc.stat.view,
          danmaku: item.arc.stat.danmaku,
        })
      })
      this[seriesName].data = resultMap
      this[seriesName].isUpdated = true
    },
  },
})
