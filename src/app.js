import { readFileSync } from 'node:fs'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { createStore } from './store.js'
import { createAuth } from './lib/auth.js'
import { healthRouter } from './routes/health.js'
import { loginRouter } from './routes/login.js'
import { emojisRouter } from './routes/emojis.js'

const openapi = JSON.parse(readFileSync(new URL('../openapi.json', import.meta.url), 'utf8'))

// A body that is not valid JSON must not answer before authentication does,
// so a parse failure is only recorded here, and each route reports it once
// the checks that come first (the token, the id) have passed.
function parseJsonBody() {
  const parse = express.json()

  return (req, res, next) => {
    parse(req, res, (err) => {
      if (err?.type === 'entity.parse.failed') {
        req.invalidJson = true
        return next()
      }
      next(err)
    })
  }
}

// Builds a fresh app with its own in-memory data, so every restart starts
// from the seed.
export function createApp() {
  const app = express()
  const store = createStore()
  const auth = createAuth()

  app.disable('x-powered-by')
  app.use(parseJsonBody())

  app.use(healthRouter())
  app.use(loginRouter({ auth }))
  app.use(emojisRouter({ store, auth }))

  app.get('/openapi.json', (req, res) => {
    res.json(openapi)
  })
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi))

  app.use((req, res) => {
    res.status(404).json({ error: 'not found' })
  })

  // Errors are always JSON, including the ones Express raises itself.
  app.use((err, req, res, _next) => {
    const status = err.status ?? err.statusCode ?? 500
    const error = status >= 500 ? 'internal server error' : err.message
    res.status(status).json({ error })
  })

  return app
}
