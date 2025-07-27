<!-- 网页表现相关设置 -->
<script setup lang="ts">
import { useSettings } from '~/composables/useSettings'
import { LANGUAGES, THEME_COLORS, THEMES } from '~/constants/App'

const { t } = useI18n()
const { theme, toggleTheme, toggleDark, language, toggleLanguage } = useSettings()
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
            v-for="themeColor in THEME_COLORS"
            :key="themeColor.name"
            class="py-1 rounded-sm border-1 flex items-center cursor-pointer text-sm"
            :class="{ 'border-[var(--color-foreground)]': themeColor.name === theme.color }"
            @click="toggleTheme(themeColor.name)"
          >
            <span :style="{ backgroundColor: themeColor.color }" class="inline-block w-4 h-4 mx-4 rounded-full" />
            {{ t(`app.settings.performance.color.${themeColor.name}`) }}
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
            :class="{ 'border-[var(--color-foreground)]': th === theme.mode }"
            @click="toggleDark(th)"
          >
            <span :class="`icon-[solar--${th === 'dark' ? 'moon' : 'sun'}-line-duotone]`" class="mr-2 ml-1" />
            {{ t(`app.settings.performance.theme.${th}`) }}
          </button>
        </div>
      </div>
    </div>
    <div>
      <!-- 网站语言 -->
      <h5 class="text-sm font-medium leading-none py-2">
        {{ t('app.settings.performance.language') }}
      </h5>
      <div class="grid grid-cols-4 gap-2">
        <button
          v-for="lg in LANGUAGES"
          :key="lg.id"
          class="py-1 rounded-sm border-1 cursor-pointer text-sm text-center"
          :class="{ 'border-[var(--color-foreground)]': lg.id === language }"
          @click="toggleLanguage(lg.id)"
        >
          {{ lg.name }}
        </button>
      </div>
    </div>
  </div>
  <div />
</template>

<style scoped>

</style>
