import axios from 'axios'
import { defineStore } from 'pinia'
import localArr from './data/data.js'

type VidInfo = {
  bvid: string
  pic: string
  title: string
  upper: string
  view: number
  danmaku: number
}

type State = {
  isUpdated: boolean
  vidMap: Map<string, VidInfo>
}
let arr: any = localArr
export const useVidArrStore = defineStore('vidArr', {
  state: (): State => {
    return {
      isUpdated: false,
      vidMap: new Map(arr),
    }
  },
  getters: {
    getArrInfo: state => {
      return bvidArr => {
        let result: VidInfo[] = []
        bvidArr.forEach(item => {
          let temp: VidInfo | undefined = state.vidMap.get(item)
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
        return this.getArrInfo(bvidArr)
      }
      let data = null
      try {
        let { data: res } = await axios.get('/api/update', {
          params: {
            bvidArr: JSON.stringify(bvidArr),
          },
        })
        data = res
      } catch (err) {
        return 'err'
      }

      this.vidMap = new Map(data)
      this.isUpdated = true
      return this.getArrInfo(bvidArr)
    },
  },
})