<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="mt-[8px] flex justify-between">
    <a href="/" class="flex items-center">
      <img src="/favicon-256x256.ico" alt="logo" title="SchemaFormX" class="h-10 rounded-xl mr-2">
      <span class="mr-2 font-bold text-2xl">
        {{ t('app.title') }}
        <small class="h-full text-xs">{{ t('app.description') }}</small>
      </span>
    </a>
    <div>
      <x-settings />
    </div>
  </div>
</template>
