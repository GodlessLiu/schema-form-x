import type { Theme } from '~/constants/App'
import { loadLanguageAsync } from '~/modules/i18n'
import { loadThemeAsync } from '~/modules/theme'
import { useGlobalLoading } from './useGlobalLoading'

export function useSettings() {
  const settings = useLocalStorage('settings', {
    theme: {
      color: 'zinc',
      mode: 'dark',
    },
    language: 'zh-CN',
  })

  const { startLoading, stopLoading } = useGlobalLoading()

  // 修改主题色
  async function toggleTheme(name: string) {
    startLoading()
    await loadThemeAsync(name)
    document.documentElement.classList.replace(`theme-${settings.value.theme.color}`, `theme-${name}`)
    settings.value.theme.color = name
    stopLoading()
  }

  // 修改主题模式
  function toggleDark(mode: Theme) {
    settings.value.theme.mode = mode
    document.documentElement.classList.toggle('dark', mode === 'dark')
  }

  // 初始化主题
  function initSettings() {
    // 初始化主题色
    document.documentElement.classList.add(`theme-${settings.value.theme.color}`)
    // 加载css资源
    loadThemeAsync(settings.value.theme.color)
    // 初始化主题模式
    document.documentElement.classList.toggle('dark', settings.value.theme.mode === 'dark')
    // 初始化语言
    loadLanguageAsync(settings.value.language)
  }

  // 设置语言
  async function toggleLanguage(lang: string) {
    startLoading()
    settings.value.language = lang
    await loadLanguageAsync(lang)
    stopLoading()
  }

  return { settings, toggleTheme, initTheme: initSettings, toggleDark, toggleLanguage }
}
