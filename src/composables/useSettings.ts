import type { Theme } from '~/constants/App'
import { loadedLanguages, loadLanguageAsync } from '~/modules/i18n'
import { loadedThemes, loadThemeAsync } from '~/modules/theme'
import { useGlobalLoading } from './useGlobalLoading'

const DEFAULT_SETTINGS: Settings = {
  theme: {
    color: 'zinc',
    mode: 'dark',
  },
  language: 'zh-CN',
}

export function useSettings() {
  const settings = useLocalStorage<Settings>('settings', DEFAULT_SETTINGS)
  const { withLoading } = useGlobalLoading()

  // Change theme color
  async function toggleTheme(name: string) {
    await loadThemeAsync(name)
    document.documentElement.classList.replace(
      `theme-${settings.value.theme.color}`,
      `theme-${name}`,
    )
    settings.value.theme.color = name
  }

  // Change theme color with global loading
  async function toggleThemeWithLoading(name: string) {
    if (loadedThemes.includes(name)) {
      toggleTheme(name)
      return
    }
    withLoading(async () => {
      toggleTheme(name)
    })
  }

  // Change theme mode
  function toggleDark(mode: Theme) {
    settings.value.theme.mode = mode
    document.documentElement.classList.toggle('dark', mode === 'dark')
  }

  // Initialize theme
  async function initSettings() {
    try {
      // Initialize theme color
      document.documentElement.classList.add(`theme-${settings.value.theme.color}`)

      // Load CSS resources
      await loadThemeAsync(settings.value.theme.color)

      // Initialize theme mode
      document.documentElement.classList.toggle('dark', settings.value.theme.mode === 'dark')

      // Initialize language
      await loadLanguageAsync(settings.value.language)
    }
    catch (error) {
      console.error('Failed to initialize settings:', error)
      // Fallback to default settings
      settings.value = { ...DEFAULT_SETTINGS }
    }
  }

  // Set language
  async function toggleLanguage(lang: string) {
    await loadLanguageAsync(lang)
    settings.value.language = lang
  }

  // Set language with global loading
  async function toggleLanguageWithLoading(lang: string) {
    if (loadedLanguages.includes(lang)) {
      toggleLanguage(lang)
      return
    }
    withLoading(async () => {
      toggleLanguage(lang)
    })
  }

  // Reset to default settings
  function resetSettings() {
    settings.value = { ...DEFAULT_SETTINGS }
    initSettings()
  }

  return {
    settings,
    toggleTheme: toggleThemeWithLoading,
    initTheme: initSettings,
    toggleDark,
    toggleLanguage: toggleLanguageWithLoading,
    resetSettings,
  }
}
