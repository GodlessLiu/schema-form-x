<script setup lang="ts">
import { useSettings } from '~/composables/useSettings'
import 'vue-sonner/style.css'

const { initTheme } = useSettings()
const { t } = useI18n()

useHead(() => ({
  title: t('app.title'),
}))

onMounted(() => {
  initTheme()
})
</script>

<template>
  <router-view />
</template>
