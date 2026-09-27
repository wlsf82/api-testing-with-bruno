// \p{RGI_Emoji} is Unicode's list of emojis recommended for general
// interchange, multi-code-point ones included (👩‍💻, 👍🏽, 🇧🇷, 1️⃣). Unlike
// \p{Emoji}, it does not match a bare digit such as 1, which Unicode marks as
// an emoji character only because it is the base of a keycap.
const SINGLE_EMOJI = /^\p{RGI_Emoji}$/v

export function isEmoji(value) {
  return typeof value === 'string' && SINGLE_EMOJI.test(value)
}
