import { Router } from 'express'
import { parseId, parseListQuery, validateEmojiBody } from '../lib/validation.js'

export function emojisRouter({ store, auth }) {
  const router = Router()
  const { requireAuth } = auth

  function badRequest(res, error) {
    return res.status(400).json({ error })
  }

  // Resolves :id to an existing emoji, or answers 400 / 404 itself.
  function findById(req, res) {
    const { id, error } = parseId(req.params.id)
    if (error) {
      badRequest(res, error)
      return undefined
    }

    const emoji = store.find(id)
    if (!emoji) {
      res.status(404).json({ error: 'emoji not found' })
      return undefined
    }

    return emoji
  }

  // Validates the body of a write. Answers 400 / 409 itself when it fails.
  function readBody(req, res, { partial = false, exceptId } = {}) {
    if (req.invalidJson) {
      badRequest(res, 'request body must be valid JSON')
      return undefined
    }

    const { value, error } = validateEmojiBody(req.body, { partial })
    if (error) {
      badRequest(res, error)
      return undefined
    }

    if (value.emoji !== undefined && store.isTaken(value.emoji, exceptId)) {
      res.status(409).json({ error: 'emoji already exists' })
      return undefined
    }

    return value
  }

  router.get('/emojis', (req, res) => {
    const { value, error } = parseListQuery(req.query)
    if (error) return badRequest(res, error)

    const { page, limit, category, search } = value
    const matches = store.list({ category, search })
    const start = (page - 1) * limit

    res.json({
      emojis: matches.slice(start, start + limit),
      pageInfo: {
        currentPage: page,
        limit,
        totalPages: Math.ceil(matches.length / limit),
        totalEmojis: matches.length,
      },
    })
  })

  router.get('/emojis/:id', (req, res) => {
    const emoji = findById(req, res)
    if (emoji) res.json(emoji)
  })

  // Every write checks authentication first, then the id, then the body.
  router.post('/emojis', requireAuth, (req, res) => {
    const value = readBody(req, res)
    if (!value) return

    const created = store.create(value)
    res.status(201).location(`/emojis/${created.id}`).json(created)
  })

  router.put('/emojis/:id', requireAuth, (req, res) => {
    const emoji = findById(req, res)
    if (!emoji) return

    const value = readBody(req, res, { exceptId: emoji.id })
    if (!value) return

    res.json(store.update(emoji.id, value))
  })

  router.patch('/emojis/:id', requireAuth, (req, res) => {
    const emoji = findById(req, res)
    if (!emoji) return

    const value = readBody(req, res, { partial: true, exceptId: emoji.id })
    if (!value) return

    res.json(store.update(emoji.id, value))
  })

  router.delete('/emojis/:id', requireAuth, (req, res) => {
    const emoji = findById(req, res)
    if (!emoji) return

    store.remove(emoji.id)
    res.status(204).end()
  })

  return router
}
