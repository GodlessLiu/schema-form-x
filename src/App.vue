<script setup lang="ts">
import { useSettings } from '~/composables/useSettings'

const { initTheme } = useSettings()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <router-view />
</template>
