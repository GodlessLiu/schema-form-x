import { computed, readonly, ref } from 'vue'
import { toast } from 'vue-sonner'

// Global loading state
const isLoading = ref(false)
const loadingText = ref('')
const loadingCount = ref(0)

export function useGlobalLoading() {
  // Computed property to check if any loading is active
  const isAnyLoading = computed(() => loadingCount.value > 0)

  const { t } = useI18n()

  // Start loading with optional text
  function startLoading(text?: string) {
    loadingCount.value++
    isLoading.value = true
    if (text) {
      loadingText.value = text
    }
  }

  // Stop loading
  function stopLoading() {
    loadingCount.value = Math.max(0, loadingCount.value - 1)
    if (loadingCount.value === 0) {
      isLoading.value = false
      loadingText.value = ''
    }
  }

  // Set loading text without changing loading state
  function setLoadingText(text: string) {
    loadingText.value = text
  }

  // Reset loading state completely
  function resetLoading() {
    loadingCount.value = 0
    isLoading.value = false
    loadingText.value = ''
  }

  // Async wrapper for automatic loading management
  async function withLoading<T>(
    asyncFn: () => Promise<T>,
    text?: string,
  ): Promise<T> {
    try {
      startLoading(text)
      return await asyncFn()
    }
    catch (error) {
      toast.error(t('app.global.loadSourceError'), {
        closeButton: true,
        style: {
          background: '#ff0000',
          color: '#fff',
        },
      })
      return new Promise<T>((_, reject) => reject(error))
    }
    finally {
      stopLoading()
    }
  }

  return {
    // Reactive state
    isLoading: readonly(isLoading),
    loadingText: readonly(loadingText),
    loadingCount: readonly(loadingCount),
    isAnyLoading,

    // Methods
    startLoading,
    stopLoading,
    setLoadingText,
    resetLoading,
    withLoading,
  }
}
