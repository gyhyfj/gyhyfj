export const config = {
  runtime: 'edge',
}

export default async function handler(request: Request) {
  const ip = request.headers.get('x-real-ip')
  return new Response(ip)
}
