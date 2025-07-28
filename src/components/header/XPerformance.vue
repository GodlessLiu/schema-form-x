<!-- 网页表现相关设置 -->
<script setup lang="ts">
import { useSettings } from '~/composables/useSettings'
import { THEMES } from '~/constants/App'
import { availableLocales } from '~/modules/i18n'
import { availableThemes } from '~/modules/theme'

const { t } = useI18n()
const { settings, toggleTheme, toggleDark, toggleLanguage } = useSettings()
</script>

<template>
  <div>
    <div>
      <!-- 主题颜色 -->
      <h5 class="text-sm font-medium leading-none py-2">
        {{ t('app.settings.performance.color.title') }}
      </h5>
      <div>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="themeColor in availableThemes"
            :key="themeColor"
            class="py-1 rounded-sm border-1 flex items-center cursor-pointer text-sm"
            :class="{ 'border-[var(--color-foreground)]': themeColor === settings.theme.color }"
            @click="toggleTheme(themeColor)"
          >
            <span :style="{ backgroundColor: `var(--color-${themeColor})` }" class="inline-block w-4 h-4 mx-4 rounded-full" />
            {{ t(`app.settings.performance.color.${themeColor}`) }}
          </button>
        </div>
      </div>
      <!-- 主题模式 -->
      <h5 class="text-sm font-medium leading-none py-2">
        {{ t('app.settings.performance.theme.title') }}
      </h5>
      <div>
        <div class="grid grid-cols-4 gap-2">
          <button
            v-for="th in THEMES"
            :key="th"
            class="py-1 rounded-sm border-1 flex items-center cursor-pointer text-sm"
            :class="{ 'border-[var(--color-foreground)]': th === settings.theme.mode }"
            @click="toggleDark(th)"
          >
            <span v-show="th === 'dark'" class="icon-[solar--moon-line-duotone] mr-2 ml-1" />
            <span v-show="th === 'light'" class="icon-[solar--sun-line-duotone] mr-2 ml-1" />
            {{ t(`app.settings.performance.theme.${th}`) }}
          </button>
        </div>
      </div>
    </div>
    <div>
      <!-- 网站语言 -->
      <h5 class="text-sm font-medium leading-none py-2">
        {{ t('app.settings.performance.language.title') }}
      </h5>
      <div class="grid grid-cols-4 gap-2">
        <button
          v-for="lg in availableLocales"
          :key="lg"
          class="py-1 rounded-sm border-1 cursor-pointer text-sm text-center"
          :class="{ 'border-[var(--color-foreground)]': lg === settings.language }"
          @click="toggleLanguage(lg)"
        >
          {{ t(`app.settings.performance.language.${lg}`) }}
        </button>
      </div>
    </div>
  </div>
  <div />
</template>

<style scoped>

</style>
