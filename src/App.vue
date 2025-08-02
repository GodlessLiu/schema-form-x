<script setup lang="ts">
import { useSettings } from '~/composables/useSettings'
import 'vue-sonner/style.css'

useTitle('Hello world!!')
const { initTheme } = useSettings()

onMounted(() => {
  initTheme()
})
</script>

<template>
    <router-view />
</template>
