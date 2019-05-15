const express = require('express')
const session = require('express-session')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const app = express()

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Body parser，用来封装 req.body
  app.use(bodyParser.json())

  // Sessions 来创建 req.session
  app.use(session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }))

  // 发起 POST /api/login 请求完成用户登录，并添加该用户到 req.session.authUser
  app.post('/api/login', function (req, res) {
    if (req.body.username === 'demo' && req.body.password === 'demo') {
      req.session.authUser = { username: 'demo' }
      return res.json({ username: 'demo' })
    }
    res.status(401).json({ error: 'Bad credentials' })
  })

  // 发起 POST /api/logout 请求注销当前用户，并从 req.session 中移除
  app.post('/api/logout', function (req, res) {
    delete req.session.authUser
    res.json({ ok: true })
  })

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)
  
  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
