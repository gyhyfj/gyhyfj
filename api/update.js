const axios = require('axios')

module.exports = async (req, res) => {
  let idk = await axios.get(
    // 'https://yachen.cc:9001/getVidInfo?bvidArr=' + req.query.bvidArr
    'https://yachen.cc:9001/getVidInfo',
    {
      params: {
        bvidArr: req.query.bvidArr,
      },
    }
  )
  res.send(idk.data)
}
