<script setup lang="ts">
import { useSettings } from '~/composables/useSettings'
import { THEME_MODES } from '~/constants/App'
import { availableLocales } from '~/modules/i18n'
import { availableThemes } from '~/modules/theme'

// Control dialog open/close state
const open = ref(false)

// Initialize i18n and settings composables
const { t } = useI18n()
const { toggleTheme, toggleDark, toggleLanguage, settings } = useSettings()

// Keyboard shortcuts configuration
const { Meta_J, Ctrl_J } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
    }
  },
})

// Watch for keyboard shortcuts
watch([Meta_J, Ctrl_J], ([metaJ, ctrlJ]) => {
  if (metaJ || ctrlJ) {
    handleOpenChange()
  }
})

// Toggle dialog open/close state
function handleOpenChange() {
  open.value = !open.value
}

// Helper function to create command items
function createCommandItem(
  value: string,
  label: string,
  action: () => Promise<void> | void,
  isSelected: boolean,
  icon?: string,
): CommandItem {
  return {
    value,
    label,
    icon: isSelected ? (icon || 'icon-[dashicons--yes]') : undefined,
    action,
    disabled: isSelected,
  }
}

// Helper function to create command groups
function createCommandGroup(
  title: string,
  items: Array<{
    value: string
    label: string
    action: () => Promise<void> | void
    isSelected: boolean
  }>,
): CommandGroup {
  return {
    title,
    items: items.map(item => createCommandItem(item.value, item.label, item.action, item.isSelected)),
  }
}

// Command groups configuration
const commandGroups = computed<CommandGroup[]>(() => [
  // Theme colors group
  createCommandGroup(
    t('app.settings.performance.color.title'),
    availableThemes.map(theme => ({
      value: `theme-${theme}`,
      label: t(`app.settings.performance.color.${theme}`),
      action: () => handleThemeSelect(theme),
      isSelected: theme === settings.value.theme.color,
    })),
  ),

  // Theme modes group
  createCommandGroup(
    t('app.settings.performance.theme.title'),
    THEME_MODES.map(mode => ({
      value: `mode-${mode}`,
      label: t(`app.settings.performance.theme.${mode}`),
      action: () => handleThemeModeSelect(mode),
      isSelected: mode === settings.value.theme.mode,
    })),
  ),

  // Languages group
  createCommandGroup(
    t('app.settings.performance.language.title'),
    availableLocales.map(lang => ({
      value: `lang-${lang}`,
      label: t(`app.settings.performance.language.${lang}`),
      action: () => handleLanguageSelect(lang),
      isSelected: lang === settings.value.language,
    })),
  ),
])

// Flatten all command items for search functionality
const commandItems = computed<CommandItem[]>(() =>
  commandGroups.value.flatMap(group => group.items),
)

// Handle theme selection and close dialog
async function handleThemeSelect(theme: string) {
  try {
    await toggleTheme(theme)
    open.value = false
  }
  catch (error) {
    console.error('Failed to change theme:', error)
  }
}

// Handle theme mode selection and close dialog
function handleThemeModeSelect(mode: 'light' | 'dark') {
  try {
    toggleDark(mode)
    open.value = false
  }
  catch (error) {
    console.error('Failed to change theme mode:', error)
  }
}

// Handle language selection and close dialog
async function handleLanguageSelect(language: string) {
  try {
    await toggleLanguage(language)
    open.value = false
  }
  catch (error) {
    console.error('Failed to change language:', error)
  }
}

// Handle command item selection
async function handleCommandSelect(value: string) {
  const item = commandItems.value.find(item => item.value === value)
  if (item && !item.disabled) {
    await item.action()
  }
}
</script>

<template>
  <div>
    <CommandDialog v-model:open="open">
      <CommandInput :placeholder="t('app.settings.performance.search')" />
      <CommandList>
        <CommandEmpty>{{ t('app.settings.performance.empty') }}</CommandEmpty>

        <!-- Command Groups -->
        <template v-for="group in commandGroups" :key="group.title">
          <CommandGroup :heading="group.title">
            <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 p-1">
              <CommandItem
                v-for="item in group.items"
                :key="item.value"
                :value="item.value"
                :disabled="item.disabled"
                class="w-full"
                @select="handleCommandSelect(item.value)"
              >
                <span
                  v-if="item.value.startsWith('theme-')"
                  :style="{ color: `var(--color-${item.value.replace('theme-', '')})` }"
                  class="flex items-center justify-center gap-2 text-center"
                >
                  <span v-if="item.icon" :class="item.icon" />
                  {{ item.label }}
                </span>
                <span v-else class="flex items-center justify-center gap-2 text-center">
                  <span v-if="item.icon" :class="item.icon" />
                  {{ item.label }}
                </span>
              </CommandItem>
            </div>
          </CommandGroup>
        </template>
      </CommandList>
    </CommandDialog>
  </div>
</template>
