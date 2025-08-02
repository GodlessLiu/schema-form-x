export const THEME_MODES = [
  'light',
  'dark',
] as const

export type Theme = typeof THEME_MODES[number]
