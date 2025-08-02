<script setup lang="ts">
import { useGlobalLoading } from '~/composables/useGlobalLoading'

const { isLoading, loadingText } = useGlobalLoading()
const { t } = useI18n()
</script>

<template>
  <Transition
    name="loading-fade"
    appear
  >
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center space-y-4 min-w-[200px]">
        <!-- Loading spinner -->
        <div class="relative">
          <div class="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
        </div>

        <!-- Loading text -->
        <p
          v-if="loadingText"
          class="text-sm text-gray-600 dark:text-gray-300 text-center"
        >
          {{ loadingText }}
        </p>
        <p
          v-else
          class="text-sm text-gray-600 dark:text-gray-300 text-center"
        >
          {{ t('app.global.loadingText') }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loading-fade-enter-active,
.loading-fade-leave-active {
  transition: opacity 0.2s ease;
}

.loading-fade-enter-from,
.loading-fade-leave-to {
  opacity: 0;
}
</style>
