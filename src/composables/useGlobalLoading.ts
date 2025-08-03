import { computed, readonly, ref } from 'vue'
import { toast } from 'vue-sonner'

// Global loading state
const state = ref<LoadingState>({
  isLoading: false,
  loadingText: '',
  loadingCount: 0,
})

export function useGlobalLoading() {
  const { t } = useI18n()

  // Computed properties
  const isAnyLoading = computed(() => state.value.loadingCount > 0)
  const isLoading = computed(() => state.value.isLoading)
  const loadingText = computed(() => state.value.loadingText)
  const loadingCount = computed(() => state.value.loadingCount)

  // Start loading with optional text
  function startLoading(options?: LoadingOptions | string) {
    const opts = typeof options === 'string' ? { text: options } : options || {}

    state.value.loadingCount++
    state.value.isLoading = true

    if (opts.text) {
      state.value.loadingText = opts.text
    }
  }

  // Stop loading
  function stopLoading() {
    state.value.loadingCount = Math.max(0, state.value.loadingCount - 1)

    if (state.value.loadingCount === 0) {
      state.value.isLoading = false
      state.value.loadingText = ''
    }
  }

  // Set loading text without changing loading state
  function setLoadingText(text: string) {
    state.value.loadingText = text
  }

  // Reset loading state completely
  function resetLoading() {
    state.value = {
      isLoading: false,
      loadingText: '',
      loadingCount: 0,
    }
  }

  // Async wrapper for automatic loading management
  async function withLoading<T>(
    asyncFn: () => Promise<T>,
    options?: LoadingOptions | string,
  ): Promise<T> {
    const opts = typeof options === 'string' ? { text: options } : options || {}

    try {
      startLoading(opts)
      // Min loading duration
      await new Promise(resolve => setTimeout(resolve, 300))
      return await asyncFn()
    }
    catch (error) {
      if (!opts.silent) {
        toast.error(t('app.global.loadSourceError'), {
          closeButton: true,
          style: {
            background: '#ff0000',
            color: '#fff',
          },
        })
      }
      throw error // Re-throw the error instead of creating a new rejected promise
    }
    finally {
      stopLoading()
    }
  }

  return {
    // Reactive state (readonly)
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
