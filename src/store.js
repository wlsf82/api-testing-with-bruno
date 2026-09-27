import { seed, SEEDED_AT } from './data/seed.js'

// All state lives in memory, so restarting the process restores the seed.
export function createStore() {
  const emojis = new Map()
  let lastId = 0

  for (const item of seed) {
    lastId += 1
    emojis.set(lastId, { id: lastId, ...item, createdAt: SEEDED_AT, updatedAt: SEEDED_AT })
  }

  // A new updatedAt is always strictly later than the previous one, so a
  // create followed by an update in the same millisecond still moves it.
  function nextUpdatedAt(previous) {
    return new Date(Math.max(Date.now(), Date.parse(previous) + 1)).toISOString()
  }

  return {
    list({ category, search } = {}) {
      const needle = search?.toLowerCase()

      return [...emojis.values()]
        .filter((emoji) => !category || emoji.category === category)
        .filter((emoji) => !needle || emoji.name.toLowerCase().includes(needle))
        .sort((a, b) => a.id - b.id)
    },

    find(id) {
      return emojis.get(id)
    },

    // True when an emoji other than `exceptId` already uses this value.
    isTaken(value, exceptId) {
      for (const emoji of emojis.values()) {
        if (emoji.emoji === value && emoji.id !== exceptId) return true
      }
      return false
    },

    create({ emoji, name, category }) {
      // Ids continue from the highest ever issued and are never reused.
      lastId += 1
      const now = new Date().toISOString()
      const created = { id: lastId, emoji, name, category, createdAt: now, updatedAt: now }
      emojis.set(lastId, created)
      return created
    },

    update(id, fields) {
      const current = emojis.get(id)
      const updated = { ...current, ...fields, updatedAt: nextUpdatedAt(current.updatedAt) }
      emojis.set(id, updated)
      return updated
    },

    remove(id) {
      return emojis.delete(id)
    },
  }
}
