export const config = {
  runtime: 'edge',
}

export default async function handler(request: Request) {
  const cookies = request.headers.get('cookie')
  const ip = request.headers.get('x-real-ip')
  let body: any
  try {
    body = await request.json()
  } catch (e) {
    body = null
  }
  const clientInfo = {
    cookies,
    ip,
    ...body,
  }

  let ttt = ''
  try {
  
    // await ofetch('https://47.106.137.81:9001/api/test').then(res => {
    //   console.log(1111, res)
    //   ttt = res
    // })
    // await ofetch('https://47.106.137.81:9001/api/test').then(res => 
    //   res.json()
    // ).then((res)=>{
    //   console.log('test---',res)
    // })
    // await ofetch('http://web-backend-prod.zmo.ai/api/v1.0/microTask/makeUp/demo/text').then(res => {
    //   console.log(1111, res)
    //   ttt = res
    // })
    // await ofetch('http://47.106.137.81:8001/api/landing', {
    //   method: 'POST',
    //   body: clientInfo,
    // }).then(res => {
    //   console.log(1111, res)
    //   ttt = res
    // })
    // console.log('clientInfo-------', JSON.stringify(clientInfo))
    await fetch('https://47.106.137.81:9001/api/test').then(async res => {
      console.log('done-------', res) // Response { }
      console.log('.......', await res.text()) // error code: 1003
    })
  } catch (err) {
    console.log('Send report error', err)
    ttt=err
  }

  return new Response(JSON.stringify({ ...clientInfo, ttt }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  })
}
