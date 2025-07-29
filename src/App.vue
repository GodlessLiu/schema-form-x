<script setup lang="ts">
import { useSettings } from '~/composables/useSettings'
import 'vue-sonner/style.css'

const { initTheme } = useSettings()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <div>
    <Sonner />
    <router-view />
  </div>
</template>
