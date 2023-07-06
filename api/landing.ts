// import {ofetch} from 'ofetch'

export default (req, res) => {
  let obj = {}
  for (const key of Reflect.ownKeys(req)) {
    if (typeof key === 'symbol' && key.description === 'kHeaders') {
      obj['kHeaders'] = req[key]
    }
  }
  obj['query'] = req.query
  // 发送服务器

  res.status(204)
}
