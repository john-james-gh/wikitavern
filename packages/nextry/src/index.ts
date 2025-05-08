export interface NextFetchRequestConfig {
  /** revalidate in seconds, or `false` to disable */
  revalidate?: number | false
  /** your own tags for cache invalidation */
  tags?: string[]
}

export type RequestCacheOption =
  | "default"
  | "force-cache"
  | "no-cache"
  | "no-store"
  | "only-if-cached"
  | "reload"

export interface RetryOptions {
  /** how many total attempts (default 3) */
  retries?: number
  /** backoff fn: ms to wait before each retry (default: 2^attempt * 100ms) */
  retryDelay?: (attempt: number) => number
  /** which errors/statuses to retry (default: network errors + 502/503/504) */
  retryOn?: (error: unknown, res?: Response) => boolean
}

export type NextryInit = RequestInit &
  NextFetchRequestConfig & {
    cache?: RequestCacheOption
  } & RetryOptions

/**
 * Zero-config Next.js fetch + retry
 */
export default async function nextry(input: RequestInfo | URL, init: NextryInit = {}): Promise<Response> {
  const {
    retries = 3,
    retryDelay = (attempt) => 2 ** attempt * 100,
    retryOn = (err, res) => {
      if (err) return true
      if (res && [502, 503, 504].includes(res.status)) return true
      return false
    },
    ...fetchInit
  } = init

  let attempt = 0
  while (true) {
    try {
      const res = await fetch(input, fetchInit)
      if (!retryOn(null, res) || attempt >= retries - 1) {
        return res
      }
    } catch (err) {
      if (!retryOn(err) || attempt >= retries - 1) {
        throw err
      }
    }
    const delay = retryDelay(attempt)
    await new Promise((r) => setTimeout(r, delay))
    attempt++
  }
}
