const globalAny = globalThis as any

if (!globalAny.__MSW_STATE__) {
  globalAny.__MSW_STATE__ = {
    featuredOverride: null,
    recentOverride: null,
  }
}

export const globalMockState = globalAny.__MSW_STATE__
