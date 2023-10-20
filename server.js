const Koa = require('koa')
const zlib = require('zlib')

const app = new Koa()

app.use((ctx) => {
  const body = { content: 'Hello world!'.repeat(80000) }

  // 无压缩
  // ctx.set('Content-Type', 'application/json')
  // ctx.body = body

  // 启动压缩
  const zipBody = zlib.gzipSync(Buffer.from(JSON.stringify(body)))
  ctx.set('Content-Type', 'application/json')
  ctx.set('Content-Encoding', 'gzip')
  ctx.body = zipBody
})

app.listen(3000, () => {
  console.log('Koa server is running on http://localhost:3000')
})
