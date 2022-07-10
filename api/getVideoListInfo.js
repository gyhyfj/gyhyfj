const axios = require('axios')
module.exports = async (req, res) => {
  const { data } = await axios.get(
    'http://api.bilibili.com/x/web-interface/view?bvid=' + req.query.bvid
  )
  let re_val = data.data.ugc_season.sections

  res.send(re_val)
}
