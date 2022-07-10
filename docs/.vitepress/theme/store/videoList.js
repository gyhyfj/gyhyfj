import axios from 'axios'
import { defineStore } from 'pinia'
import wbcssg from './wbcssg'

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
    getListInfo: state => {
      return (seriesName, bvidList) => {
        let result = []
        bvidList.forEach((item, index) => {
          result.push(state[seriesName].data.get(item))
          result[index].upper = state[seriesName].upper
        })
        return result
      }
    },
  },

  actions: {
    async updateVideoListInfo(listName, bvidList) {
      let resultArr = []
      let resultMap = new Map()
      // axios 请求
      let { data } = await axios.get('/api/getVideoInfo?bvid=' + bvidList[0])
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
      this[listName].data = resultMap
      this[listName].isUpdated = true
    },
  },
})
