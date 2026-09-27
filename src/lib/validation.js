import { isEmoji } from './is-emoji.js'

export const CATEGORIES = ['smileys', 'animals', 'food', 'nature', 'objects']
export const DEFAULT_LIMIT = 10
export const MAX_LIMIT = 50
export const MAX_NAME_LENGTH = 50

const CATEGORY_ERROR = `category must be one of: ${CATEGORIES.join(', ')}`

function toPositiveInteger(value) {
  if (typeof value !== 'string' || !/^\d+$/.test(value)) return undefined
  const number = Number(value)
  return Number.isSafeInteger(number) && number >= 1 ? number : undefined
}

export function parseId(value) {
  const id = toPositiveInteger(value)
  return id === undefined ? { error: 'id must be a positive integer' } : { id }
}

// Checks page, then limit, then category, and answers with the first failure.
export function parseListQuery(query) {
  let page = 1
  if (query.page !== undefined) {
    page = toPositiveInteger(query.page)
    if (page === undefined) return { error: 'page must be a positive integer' }
  }

  let limit = DEFAULT_LIMIT
  if (query.limit !== undefined) {
    limit = toPositiveInteger(query.limit)
    if (limit === undefined || limit > MAX_LIMIT) {
      return { error: `limit must be an integer between 1 and ${MAX_LIMIT}` }
    }
  }

  const { category } = query
  if (category !== undefined && !CATEGORIES.includes(category)) {
    return { error: CATEGORY_ERROR }
  }

  // search is never invalid; a repeated parameter uses its first value.
  const search = Array.isArray(query.search) ? String(query.search[0]) : query.search

  return { value: { page, limit, category, search } }
}

// A missing body, or one that is not a plain object, counts as {}.
export function bodyAsObject(body) {
  return body !== null && typeof body === 'object' && !Array.isArray(body) ? body : {}
}

function isBlank(value) {
  return typeof value === 'string' && value.trim() === ''
}

// Validates emoji, then name, then category, and answers with the first
// failure. `partial` is PATCH: only the fields present are checked, and at
// least one must be present. Fields other than these three are ignored.
export function validateEmojiBody(body, { partial = false } = {}) {
  const { emoji, name, category } = bodyAsObject(body)

  if (partial && emoji === undefined && name === undefined && category === undefined) {
    return { error: 'at least one of emoji, name, or category is required' }
  }

  const value = {}

  if (emoji === undefined) {
    if (!partial) return { error: 'emoji is required' }
  } else if (!isEmoji(emoji)) {
    return { error: 'emoji must be a single emoji' }
  } else {
    value.emoji = emoji
  }

  if (name === undefined || (!partial && isBlank(name))) {
    if (!partial) return { error: 'name is required' }
  } else if (typeof name !== 'string' || isBlank(name)) {
    return { error: 'name must be a non-empty string' }
  } else if (name.trim().length > MAX_NAME_LENGTH) {
    return { error: `name must be at most ${MAX_NAME_LENGTH} characters` }
  } else {
    value.name = name.trim()
  }

  if (category === undefined) {
    if (!partial) return { error: 'category is required' }
  } else if (!CATEGORIES.includes(category)) {
    return { error: CATEGORY_ERROR }
  } else {
    value.category = category
  }

  return { value }
}
