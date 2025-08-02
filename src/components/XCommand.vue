<script setup lang="ts">
import { useSettings } from '~/composables/useSettings'
import { THEME_MODES } from '~/constants/App'
import { availableLocales } from '~/modules/i18n'
import { availableThemes } from '~/modules/theme'

// Control dialog open/close state
const open = ref(false)

// Initialize i18n and settings composables
const { t } = useI18n()
const { toggleTheme, toggleDark, toggleLanguage } = useSettings()

// Listen for Cmd+J (Mac) or Ctrl+J (Windows/Linux) keyboard shortcuts
const { Meta_J, Ctrl_J } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'j' && (e.metaKey || e.ctrlKey))
      e.preventDefault()
  },
})

// Toggle dialog when keyboard shortcut is pressed
watch([Meta_J, Ctrl_J], (v) => {
  if (v[0] || v[1])
    handleOpenChange()
})

// Toggle dialog open/close state
function handleOpenChange() {
  open.value = !open.value
}

// Handle theme selection and close dialog
function handleThemeSelect(theme: string) {
  toggleTheme(theme)
  open.value = false
}

// Handle theme mode selection and close dialog
function handleThemeModeSelect(mode: 'light' | 'dark') {
  toggleDark(mode)
  open.value = false
}

// Handle language selection and close dialog
function handleLanguageSelect(language: string) {
  toggleLanguage(language)
  open.value = false
}
</script>

<template>
  <div>
    <CommandDialog v-model:open="open">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>{{ t('app.settings.performance.empty') }}</CommandEmpty>
        <CommandGroup :heading="t('app.settings.performance.color.title')">
          <CommandItem
            v-for="theme in availableThemes"
            :key="theme"
            :value="theme"
            @select="handleThemeSelect(theme)"
          >
            <span :style="{ backgroundColor: `var(--color-${theme})` }" class="inline-block w-4 h-4 mx-4 rounded-full" />
            {{ t(`app.settings.performance.color.${theme}`) }}
          </CommandItem>
        </CommandGroup>
        <CommandGroup :heading="t('app.settings.performance.theme.title')">
          <CommandItem
            v-for="mode in THEME_MODES"
            :key="mode"
            :value="mode"
            class=" indent-4"
            @select="handleThemeModeSelect(mode)"
          >
            {{ t(`app.settings.performance.theme.${mode}`) }}
          </CommandItem>
        </CommandGroup>
        <CommandGroup :heading="t('app.settings.performance.language.title')">
          <CommandItem
            v-for="lg in availableLocales"
            :key="lg"
            :value="lg"
            class="indent-4"
            @select="handleLanguageSelect(lg)"
          >
            {{ t(`app.settings.performance.language.${lg}`) }}
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  </div>
</template>
