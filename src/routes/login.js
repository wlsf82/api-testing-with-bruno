import { Router } from 'express'
import { USERNAME, PASSWORD } from '../lib/auth.js'
import { bodyAsObject } from '../lib/validation.js'

export function loginRouter({ auth }) {
  const router = Router()

  router.post('/login', (req, res) => {
    if (req.invalidJson) {
      return res.status(400).json({ error: 'request body must be valid JSON' })
    }

    // A body sent without Content-Type: application/json is not parsed and
    // arrives empty, so it lands here. The message does not name the header
    // on purpose: finding that out is part of the exercise.
    const { username, password } = bodyAsObject(req.body)
    if (!username || !password) {
      return res.status(400).json({ error: 'username and password are required' })
    }

    if (username !== USERNAME || password !== PASSWORD) {
      return res.status(401).json({ error: 'invalid username or password' })
    }

    res.json({ token: auth.issueToken() })
  })

  return router
}
