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

  const { withLoading } = useGlobalLoading()

  // Change theme color
  async function toggleTheme(name: string) {
    withLoading(async () => {
      await loadThemeAsync(name)
      document.documentElement.classList.replace(`theme-${settings.value.theme.color}`, `theme-${name}`)
      settings.value.theme.color = name
    })
  }

  // Change theme mode
  function toggleDark(mode: Theme) {
    settings.value.theme.mode = mode
    document.documentElement.classList.toggle('dark', mode === 'dark')
  }

  // Initialize theme
  function initSettings() {
    // Initialize theme color
    document.documentElement.classList.add(`theme-${settings.value.theme.color}`)
    // Load CSS resources
    loadThemeAsync(settings.value.theme.color)
    // Initialize theme mode
    document.documentElement.classList.toggle('dark', settings.value.theme.mode === 'dark')
    // Initialize language
    loadLanguageAsync(settings.value.language)
  }

  // Set language
  async function toggleLanguage(lang: string) {
    withLoading(async () => {
      await loadLanguageAsync(lang)
      settings.value.language = lang
    })
  }

  return { settings, toggleTheme, initTheme: initSettings, toggleDark, toggleLanguage }
}
