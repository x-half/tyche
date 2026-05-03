interface RateLimitEntry {
  count: number
  firstAttempt: number
}

const sendCodeLimiter = new Map<string, RateLimitEntry>()
const verifyAttemptLimiter = new Map<string, RateLimitEntry>()

const SEND_CODE_COOLDOWN_MS = 60 * 1000
const VERIFY_MAX_ATTEMPTS = 5
const VERIFY_WINDOW_MS = 10 * 60 * 1000

function cleanupExpiredEntries() {
  const now = Date.now()
  for (const [key, entry] of sendCodeLimiter) {
    if (now - entry.firstAttempt > SEND_CODE_COOLDOWN_MS) {
      sendCodeLimiter.delete(key)
    }
  }
  for (const [key, entry] of verifyAttemptLimiter) {
    if (now - entry.firstAttempt > VERIFY_WINDOW_MS) {
      verifyAttemptLimiter.delete(key)
    }
  }
}

setInterval(cleanupExpiredEntries, 5 * 60 * 1000).unref()

export function checkSendCodeRateLimit(email: string): {
  allowed: boolean
  retryAfter?: number
} {
  const entry = sendCodeLimiter.get(email)
  if (!entry) return { allowed: true }

  const elapsed = Date.now() - entry.firstAttempt
  if (elapsed >= SEND_CODE_COOLDOWN_MS) {
    sendCodeLimiter.delete(email)
    return { allowed: true }
  }

  return {
    allowed: false,
    retryAfter: Math.ceil((SEND_CODE_COOLDOWN_MS - elapsed) / 1000),
  }
}

export function recordSendCode(email: string) {
  sendCodeLimiter.set(email, { count: 1, firstAttempt: Date.now() })
}

export function checkVerifyRateLimit(email: string): {
  allowed: boolean
  retryAfter?: number
} {
  const entry = verifyAttemptLimiter.get(email)
  if (!entry) return { allowed: true }

  const elapsed = Date.now() - entry.firstAttempt
  if (elapsed > VERIFY_WINDOW_MS) {
    verifyAttemptLimiter.delete(email)
    return { allowed: true }
  }

  if (entry.count >= VERIFY_MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfter: Math.ceil((VERIFY_WINDOW_MS - elapsed) / 1000),
    }
  }

  return { allowed: true }
}

export function recordVerifyAttempt(email: string) {
  const entry = verifyAttemptLimiter.get(email)
  if (!entry) {
    verifyAttemptLimiter.set(email, { count: 1, firstAttempt: Date.now() })
  } else {
    entry.count++
  }
}
