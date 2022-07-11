const axios = require('axios')
module.exports = async (req, res) => {
  let bvidArr = JSON.parse(req.query.bvidArr)
  let axiosArr = []
  bvidArr.forEach(item => {
    let temp = axios.get(
      'http://api.bilibili.com/x/web-interface/view?bvid=' + item
    )
    axiosArr.push(temp)
  })

  function reduce(item) {
    return {
      bvid: item.bvid,
      pic: item.pic,
      title: item.title,
      upper: item.owner.name,
      view: item.stat.view,
      danmaku: item.stat.danmaku,
    }
  }

  let idk = await Promise.all(axiosArr)
  let re_val = idk.map(item => reduce(item.data.data))
  res.send(re_val)
}
