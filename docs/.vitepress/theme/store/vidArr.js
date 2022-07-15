import axios from 'axios'
import { defineStore } from 'pinia'
import localArr from './data/data.js'

export const useVidArrStore = defineStore('vidArr', {
  state: () => {
    return {
      isUpdated: false,
      vidMap: new Map(localArr),
    }
  },
  getters: {
    getArrInfo: state => {
      return bvidArr => {
        let result = []
        bvidArr.forEach(item => {
          let temp = state.vidMap.get(item)
          if (temp) {
            result.push(temp)
          } else {
            state.isUpdated = false
            result.push({
              bvid: 'BV1sa411k7Zy',
              pic: 'http://i2.hdslb.com/bfs/archive/532dcaa6cb0dd7088687cce05a622809753017fd.jpg',
              title: 'E01.最详细的黄巾军起兵地图推演：黄巾大起义',
              upper: '文不醜',
              view: 120750,
              danmaku: 509,
            })
          }
        })
        return result
      }
    },
  },
  actions: {
    async updateMap(bvidArr) {
      if (this.isUpdated) {
        return
      }
      let { data } = await axios.get('/api/update', {
        params: {
          bvidArr: JSON.stringify(bvidArr),
        },
      })
      this.vidMap = new Map(data)
      this.isUpdated = true
    },
  },
})
