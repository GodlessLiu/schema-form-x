export const LANGUAGES = [
  {
    id: 'zh-CN',
    name: '中文',
  },
  {
    id: 'en',
    name: 'English',
  },
] as const

export type LanguageId = typeof LANGUAGES[number]['id']

export const THEME_COLORS = [{
  name: 'blue',
  color: 'hsl(221.2 83.2% 53.3%)',
}, {
  name: 'green',
  color: 'hsl(142.1 76.2% 36.3%)',
}, {
  name: 'orange',
  color: 'hsl(24.6 95% 53.1%)',
}, {
  name: 'rose',
  color: 'hsl(346.8 77.2% 49.8%)',
}, {
  name: 'violet',
  color: 'hsl(262.1 83.3% 57.8%)',
}, {
  name: 'yellow',
  color: 'hsl(47.9 95.8% 53.1%)',
}, {
  name: 'zinc',
  color: 'hsl(240 5.9% 10%)',
}] as const

export type ThemeName = typeof THEME_COLORS[number]['name']

export const THEMES = [
  'light',
  'dark',
] as const

export type Theme = typeof THEMES[number]
