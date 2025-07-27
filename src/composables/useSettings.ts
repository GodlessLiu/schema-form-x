import type { Theme, ThemeName } from '~/constants/App'
import { loadLanguageAsync } from '~/modules/i18n'

export function useSettings() {
  const theme = useLocalStorage('theme', {
    color: 'zinc',
    mode: 'dark',
  })
  const language = useLocalStorage('language', 'zh-CN')
  // 修改主题色
  function toggleTheme(name: ThemeName) {
    document.documentElement.classList.replace(`theme-${theme.value.color}`, `theme-${name}`)
    theme.value.color = name
  }

  // 修改主题模式
  function toggleDark(mode: Theme) {
    theme.value.mode = mode
    document.documentElement.classList.toggle('dark', mode === 'dark')
  }

  // 初始化主题
  function initSettings() {
    // 初始化主题色
    document.documentElement.classList.add(`theme-${theme.value.color}`)
    // 初始化主题模式
    document.documentElement.classList.toggle('dark', theme.value.mode === 'dark')
    // 初始化语言
    loadLanguageAsync(language.value)
  }

  // 设置语言
  function toggleLanguage(lang: string) {
    language.value = lang
    loadLanguageAsync(lang)
  }

  return { theme, toggleTheme, initTheme: initSettings, toggleDark, language, toggleLanguage }
}
