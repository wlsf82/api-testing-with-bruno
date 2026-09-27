// The 50 emojis the API starts with, 10 per category. Ids are assigned in
// this order (1 to 50). Every emoji here is a single code point with default
// emoji presentation, so none depends on a variation selector.
//
// The course creates 🦖 🦕 🧉 🪐 🦩 👩‍💻 👍🏽 🇧🇷 1️⃣, so none of those may be added here.
export const SEEDED_AT = '2026-01-01T00:00:00.000Z'

export const seed = [
  { emoji: '😀', name: 'grinning face', category: 'smileys' },
  { emoji: '😂', name: 'face with tears of joy', category: 'smileys' },
  { emoji: '🥰', name: 'smiling face with hearts', category: 'smileys' },
  { emoji: '😎', name: 'smiling face with sunglasses', category: 'smileys' },
  { emoji: '🤔', name: 'thinking face', category: 'smileys' },
  { emoji: '😴', name: 'sleeping face', category: 'smileys' },
  { emoji: '🤯', name: 'exploding head', category: 'smileys' },
  { emoji: '🥳', name: 'partying face', category: 'smileys' },
  { emoji: '😱', name: 'face screaming in fear', category: 'smileys' },
  { emoji: '🤓', name: 'nerd face', category: 'smileys' },

  { emoji: '🐶', name: 'dog face', category: 'animals' },
  { emoji: '🐱', name: 'cat face', category: 'animals' },
  { emoji: '🐢', name: 'turtle', category: 'animals' },
  { emoji: '🦊', name: 'fox', category: 'animals' },
  { emoji: '🐼', name: 'panda', category: 'animals' },
  { emoji: '🐙', name: 'octopus', category: 'animals' },
  { emoji: '🦉', name: 'owl', category: 'animals' },
  { emoji: '🐝', name: 'honeybee', category: 'animals' },
  { emoji: '🦋', name: 'butterfly', category: 'animals' },
  { emoji: '🐬', name: 'dolphin', category: 'animals' },

  { emoji: '🍕', name: 'pizza', category: 'food' },
  { emoji: '🍔', name: 'hamburger', category: 'food' },
  { emoji: '🌮', name: 'taco', category: 'food' },
  { emoji: '🍣', name: 'sushi', category: 'food' },
  { emoji: '🍩', name: 'doughnut', category: 'food' },
  { emoji: '🍎', name: 'red apple', category: 'food' },
  { emoji: '🥑', name: 'avocado', category: 'food' },
  { emoji: '🍓', name: 'strawberry', category: 'food' },
  { emoji: '☕', name: 'hot beverage', category: 'food' },
  { emoji: '🧀', name: 'cheese wedge', category: 'food' },

  { emoji: '🌵', name: 'cactus', category: 'nature' },
  { emoji: '🌻', name: 'sunflower', category: 'nature' },
  { emoji: '🌈', name: 'rainbow', category: 'nature' },
  { emoji: '🔥', name: 'fire', category: 'nature' },
  { emoji: '🌊', name: 'water wave', category: 'nature' },
  { emoji: '⛄', name: 'snowman', category: 'nature' },
  { emoji: '🌙', name: 'crescent moon', category: 'nature' },
  { emoji: '⭐', name: 'star', category: 'nature' },
  { emoji: '🍀', name: 'four leaf clover', category: 'nature' },
  { emoji: '🌋', name: 'volcano', category: 'nature' },

  { emoji: '💡', name: 'light bulb', category: 'objects' },
  { emoji: '📚', name: 'books', category: 'objects' },
  { emoji: '🎸', name: 'guitar', category: 'objects' },
  { emoji: '📷', name: 'camera', category: 'objects' },
  { emoji: '🔑', name: 'key', category: 'objects' },
  { emoji: '⏰', name: 'alarm clock', category: 'objects' },
  { emoji: '🎁', name: 'wrapped gift', category: 'objects' },
  { emoji: '💻', name: 'laptop', category: 'objects' },
  { emoji: '🧪', name: 'test tube', category: 'objects' },
  { emoji: '🔍', name: 'magnifying glass', category: 'objects' },
]
