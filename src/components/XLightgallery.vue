<script setup lang="ts">
import Lightgallery from 'lightgallery/vue'

const { className } = defineProps<{ className?: string }>()
</script>

<template>
  <Lightgallery :class="className">
    <slot />
  </Lightgallery>
</template>

<style scoped lang="css">
@import url('https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lightgallery.css');
</style>
