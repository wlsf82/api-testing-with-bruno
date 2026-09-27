import { randomBytes } from 'node:crypto'

// Made-up credentials, printed in the README on purpose.
export const USERNAME = 'tester'
export const PASSWORD = 'bruno-rocks'

// Tokens live in memory and stay valid until the process restarts. Every
// login issues a new one; older ones keep working. There is no expiry on
// purpose, so a long exercise never fails halfway for an unrelated reason.
export function createAuth() {
  const tokens = new Set()

  function issueToken() {
    const token = randomBytes(16).toString('hex')
    tokens.add(token)
    return token
  }

  function requireAuth(req, res, next) {
    const match = /^Bearer\s+(\S+)$/i.exec(req.get('authorization') ?? '')

    if (!match || !tokens.has(match[1])) {
      res.set('WWW-Authenticate', 'Bearer')
      return res.status(401).json({ error: 'authentication required' })
    }

    next()
  }

  return { issueToken, requireAuth }
}
